import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

// An armillary sphere: meridians, equator, latitudes and a tilted ecliptic drawn as hairline
// tori, with one red bead orbiting. Pure line work, no textures, no lighting.
const R = 1.5
const TILT = 0.41

function Ring({ radius = R, rotation = [0, 0, 0], position = [0, 0, 0], color, opacity = 0.9, thickness = 0.0065 }) {
  return (
    <mesh rotation={rotation} position={position}>
      <torusGeometry args={[radius, thickness, 6, 220]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  )
}

function Instrument({ reduce, ink, accent }) {
  const rig = useRef()
  const spin = useRef()
  const bead = useRef()

  const lat = useMemo(() => {
    const y = R * 0.62
    return { y, r: Math.sqrt(R * R - y * y) }
  }, [])

  useFrame((state, dt) => {
    if (reduce) return
    spin.current.rotation.y += dt * 0.16
    rig.current.rotation.y += (state.pointer.x * 0.45 - rig.current.rotation.y) * 0.04
    rig.current.rotation.x += (-state.pointer.y * 0.3 - rig.current.rotation.x) * 0.04
    const a = state.clock.elapsedTime * 0.55
    bead.current.position.set(Math.cos(a) * R, Math.sin(a) * R, 0)
  })

  return (
    <group ref={rig} rotation={[0.2, 0, 0.12]}>
      <group ref={spin}>
        {/* three meridians, 60 degrees apart */}
        <Ring color={ink} rotation={[0, 0, 0]} />
        <Ring color={ink} rotation={[0, Math.PI / 3, 0]} opacity={0.7} />
        <Ring color={ink} rotation={[0, (2 * Math.PI) / 3, 0]} opacity={0.7} />
        {/* equator and two latitudes */}
        <Ring color={ink} rotation={[Math.PI / 2, 0, 0]} />
        <Ring color={ink} radius={lat.r} position={[0, lat.y, 0]} rotation={[Math.PI / 2, 0, 0]} opacity={0.5} thickness={0.005} />
        <Ring color={ink} radius={lat.r} position={[0, -lat.y, 0]} rotation={[Math.PI / 2, 0, 0]} opacity={0.5} thickness={0.005} />
        {/* the ecliptic, tilted, carries the bead */}
        <group rotation={[Math.PI / 2 - TILT, 0, 0]}>
          <Ring color={accent} radius={R * 1.12} thickness={0.0085} opacity={1} />
          <mesh ref={bead} position={[R * 1.12, 0, 0]} scale={1.12}>
            <sphereGeometry args={[0.075, 24, 24]} />
            <meshBasicMaterial color={accent} />
          </mesh>
        </group>
        {/* the earth at the centre */}
        <mesh>
          <sphereGeometry args={[0.09, 24, 24]} />
          <meshBasicMaterial color={ink} />
        </mesh>
      </group>
    </group>
  )
}

export default function Orb({ reduce, visible, theme }) {
  const ink = theme === 'dark' ? '#f1f1ee' : '#0a0a0a'
  const accent = theme === 'dark' ? '#ff4655' : '#e0283a'
  return (
    <Canvas
      dpr={[1, 2]}
      frameloop={visible ? 'always' : 'never'}
      camera={{ position: [0, 0, 6.2], fov: 34 }}
      gl={{ antialias: true, alpha: true }}
      aria-hidden="true"
    >
      <Instrument reduce={reduce} ink={ink} accent={accent} />
    </Canvas>
  )
}
