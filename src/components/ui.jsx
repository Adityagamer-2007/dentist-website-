import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, animate, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { waLink } from '../utils/whatsapp'

export function Reveal({ children, delay = 0, y = 24, className = '', as = 'div' }) {
  const M = motion[as]
  return (
    <M className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </M>
  )
}

export function Tilt({ children, className = '', max = 9 }) {
  const rm = useReducedMotion()
  const x = useMotionValue(0.5), y = useMotionValue(0.5)
  const cfg = { stiffness: 180, damping: 18 }
  const rx = useSpring(useTransform(y, [0, 1], [max, -max]), cfg)
  const ry = useSpring(useTransform(x, [0, 1], [-max, max]), cfg)
  const mx = useTransform(x, (v) => `${v * 100}%`)
  const my = useTransform(y, (v) => `${v * 100}%`)
  const move = (e) => {
    if (rm || e.pointerType === 'touch') return
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width)
    y.set((e.clientY - r.top) / r.height)
  }
  const leave = () => { x.set(0.5); y.set(0.5) }
  return (
    <motion.div className={`tilt ${className}`} onPointerMove={move} onPointerLeave={leave}
      style={{ rotateX: rm ? 0 : rx, rotateY: rm ? 0 : ry, transformPerspective: 900, '--mx': mx, '--my': my }}>
      {children}
    </motion.div>
  )
}

export function WaButton({ service = '', label = 'Book Appointment on WhatsApp', variant = 'solid', className = '', small = false }) {
  const rm = useReducedMotion()
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16 }), sy = useSpring(y, { stiffness: 220, damping: 16 })
  const move = (e) => {
    if (rm || e.pointerType === 'touch') return
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.18)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25)
  }
  return (
    <motion.a href={waLink(service)} target="_blank" rel="noopener noreferrer"
      className={`btn btn-${variant} ${small ? 'btn-sm' : ''} ${className}`} style={{ x: sx, y: sy }}
      onPointerMove={move} onPointerLeave={() => { x.set(0); y.set(0) }} whileTap={{ scale: 0.97 }}>
      <MessageCircle size={small ? 16 : 18} aria-hidden="true" /> {label}
    </motion.a>
  )
}

export function Counter({ to, decimals = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.4, ease: 'easeOut', onUpdate: setV })
    return () => c.stop()
  }, [inView, to])
  return <span ref={ref}>{v.toFixed(decimals)}</span>
}

export function Heading({ title, text }) {
  return (
    <Reveal className="heading">
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </Reveal>
  )
}
