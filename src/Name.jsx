import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// The name is drawn once to a 2D canvas, uploaded as a texture, and re-sampled in a
// fragment shader. Pointer movement drops decaying ripples that bend the sampling
// coordinates, so the type behaves like liquid. No libraries beyond three.
const N = 24

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const fragment = /* glsl */ `
  varying vec2 vUv;
  uniform sampler2D uTex;
  uniform vec2 uRes;
  uniform vec3 uInk;
  uniform vec4 uP[${N}];
  void main() {
    float asp = uRes.x / uRes.y;
    vec2 disp = vec2(0.0);
    for (int i = 0; i < ${N}; i++) {
      vec4 p = uP[i];
      if (p.w > 0.0) {
        vec2 d = (vUv - p.xy) * vec2(asp, 1.0);
        float r = length(d);
        vec2 dir = d / (r + 1e-4);
        float env = exp(-r * 3.0) * exp(-p.z * 1.5) * p.w;
        float wave = sin(r * 30.0 - p.z * 9.0) * env;
        disp += dir * wave * vec2(1.0 / asp, 1.0) * 0.06;
      }
    }
    float a = texture2D(uTex, vUv + disp).a;
    gl_FragColor = vec4(uInk * a, a);
  }
`

const hexToVec = (hex) => {
  const n = parseInt(hex.slice(1), 16)
  return new THREE.Vector3(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255)
}

export default function Name({ lines, ink, onStatus, onLayout }) {
  const host = useRef(null)
  const api = useRef(null)
  const layoutCb = useRef(onLayout)
  useEffect(() => {
    layoutCb.current = onLayout
  })

  useEffect(() => {
    const el = host.current
    let disposed = false
    let raf = 0
    let last = 0
    let head = 0
    let lastPt = null
    let renderer = null
    let tex = null
    let mat = null
    let ro = null
    const pts = Array.from({ length: N }, () => new THREE.Vector4(0, 0, 0, 0))
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const drawText = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const W = Math.max(2, Math.round(el.clientWidth * dpr))
      const c = document.createElement('canvas')
      const g = c.getContext('2d')
      g.font = '500 100px "Cormorant Garamond"'
      g.letterSpacing = '-1px'
      const widest = Math.max(...lines.map((l) => g.measureText(l).width))
      // fit the width, but never let the name take more than ~a third of the screen height
      const fs = Math.min(((W * 0.97) / widest) * 100, window.innerHeight * (window.innerHeight < 760 ? 0.29 : 0.34) * dpr)
      const lh = fs * 0.94
      const H = Math.round(lh * lines.length + fs * 0.32)
      c.width = W
      c.height = H
      g.font = `500 ${fs}px "Cormorant Garamond"`
      g.letterSpacing = `${-0.01 * fs}px`
      g.fillStyle = '#fff'
      lines.forEach((l, i) => g.fillText(l, fs * 0.012, lh * (i + 1) - fs * 0.02))
      return { c, W, H, dpr, textW: (widest * fs) / 100 / dpr }
    }

    const render = () => {
      if (!renderer) return
      mat.uniformsNeedUpdate = true
      renderer.render(scene, camera)
    }

    const tick = (t) => {
      const dt = Math.min(0.05, (t - last) / 1000)
      last = t
      let alive = false
      for (const p of pts) {
        if (p.w > 0) {
          p.z += dt
          if (p.z > 3.2) p.w = 0
          else alive = true
        }
      }
      render()
      raf = alive ? requestAnimationFrame(tick) : 0
    }
    const kick = () => {
      if (!raf && !reduce) {
        last = performance.now()
        raf = requestAnimationFrame(tick)
      }
    }
    const drop = (x, y, amp) => {
      pts[head].set(x, y, 0, amp)
      head = (head + 1) % N
      kick()
    }

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      const y = 1 - (e.clientY - r.top) / r.height
      if (lastPt) {
        const dx = (x - lastPt.x) * (r.width / r.height)
        const dy = y - lastPt.y
        const dist = Math.hypot(dx, dy)
        if (dist < 0.045) return
        drop(x, y, Math.min(1, 0.45 + dist * 6))
      } else {
        drop(x, y, 0.5)
      }
      lastPt = { x, y }
    }
    const onLeave = () => {
      lastPt = null
    }
    const onDown = (e) => {
      const r = el.getBoundingClientRect()
      drop((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height, 1)
    }

    let scene = null
    let camera = null

    const build = () => {
      const { c, W, H, dpr, textW } = drawText()
      el.style.height = `${H / dpr}px`
      if (!renderer) {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, premultipliedAlpha: true })
        renderer.setClearColor(0x000000, 0)
        renderer.domElement.style.cssText = 'display:block;width:100%;height:100%'
        el.appendChild(renderer.domElement)
        scene = new THREE.Scene()
        camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
        mat = new THREE.ShaderMaterial({
          vertexShader: vertex,
          fragmentShader: fragment,
          transparent: true,
          premultipliedAlpha: true,
          depthTest: false,
          uniforms: {
            uTex: { value: null },
            uRes: { value: new THREE.Vector2(W, H) },
            uInk: { value: hexToVec(ink) },
            uP: { value: pts },
          },
        })
        scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat))
      }
      renderer.setPixelRatio(1)
      renderer.setSize(W, H, false)
      if (tex) tex.dispose()
      tex = new THREE.CanvasTexture(c)
      tex.minFilter = THREE.LinearFilter
      tex.generateMipmaps = false
      mat.uniforms.uTex.value = tex
      mat.uniforms.uRes.value.set(W, H)
      render()
      layoutCb.current?.({ w: W / dpr, h: H / dpr, textW })
    }

    api.current = {
      setInk: (hex) => {
        if (!mat) return
        mat.uniforms.uInk.value.copy(hexToVec(hex))
        render()
      },
    }

    ;(async () => {
      try {
        await document.fonts.load('500 100px "Cormorant Garamond"')
      } catch {
        /* falls back to the system face */
      }
      if (disposed) return
      try {
        build()
      } catch {
        onStatus('fail')
        return
      }
      onStatus('ready')
      el.addEventListener('pointermove', onMove)
      el.addEventListener('pointerleave', onLeave)
      el.addEventListener('pointerdown', onDown)
      let w = el.clientWidth
      ro = new ResizeObserver(() => {
        if (Math.abs(el.clientWidth - w) < 2) return
        w = el.clientWidth
        build()
      })
      ro.observe(el)
      if (!reduce) window.setTimeout(() => !disposed && drop(0.5, 0.5, 1), 350)
    })()

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      ro?.disconnect()
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      el.removeEventListener('pointerdown', onDown)
      tex?.dispose()
      mat?.dispose()
      renderer?.dispose()
      renderer?.domElement.remove()
      api.current = null
    }
    // the shader is built once; ink changes go through api.setInk
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    api.current?.setInk(ink)
  }, [ink])

  return <div ref={host} className="name-canvas" aria-hidden="true" />
}
