import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// One inverting disc. It follows the pointer on a spring and grows into a larger lens over
// things you can act on. Position lives in motion values, so moving never re-renders React.
const LINK = 'a, button, [role="button"], .skill, summary'

function describe(t) {
  if (!(t instanceof Element)) return 'idle'
  if (t.closest('.name-canvas')) return 'name'
  if (t.closest('.cell')) return 'tiny'
  if (t.closest(LINK) || t.closest('.row-head')) return 'link'
  return 'idle'
}

export default function Cursor() {
  const [on, setOn] = useState(false)
  const [mode, setMode] = useState('idle')
  const [down, setDown] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 520, damping: 38, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 520, damping: 38, mass: 0.5 })

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!fine.matches) return undefined
    const root = document.documentElement
    root.classList.add('has-cursor')

    const apply = (t) => setMode(describe(t))
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setOn(true)
    }
    const over = (e) => apply(e.target)
    const dn = () => setDown(true)
    const up = () => setDown(false)
    const leave = () => setOn(false)

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    window.addEventListener('pointerdown', dn, { passive: true })
    window.addEventListener('pointerup', up, { passive: true })
    root.addEventListener('pointerleave', leave)
    return () => {
      root.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      window.removeEventListener('pointerdown', dn)
      window.removeEventListener('pointerup', up)
      root.removeEventListener('pointerleave', leave)
    }
  }, [x, y])

  return (
    <motion.div className="cur" data-on={on} data-mode={mode} data-down={down} style={{ x: sx, y: sy }} aria-hidden="true" />
  )
}
