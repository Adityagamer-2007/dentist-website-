import { lazy, Suspense, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Star, MapPin } from 'lucide-react'
import { clinic } from '../config/clinicData'
import { WaButton } from './ui'

const Tooth3D = lazy(() => import('./Tooth3D'))
const words = ['Your', 'Smile', 'Deserves', 'Exceptional', 'Care.']

export default function Hero({ ready }) {
  const rm = useReducedMotion()
  const [show3d, setShow3d] = useState(false)
  useEffect(() => { const t = setTimeout(() => setShow3d(true), 300); return () => clearTimeout(t) }, [])
  return (
    <section id="home" className="hero">
      <div className="hero-bg" aria-hidden="true"><i /><i /></div>
      <div className="wrap hero-grid">
        <div>
          <motion.p className="hero-place" initial={{ opacity: 0 }} animate={ready && { opacity: 1 }}><MapPin size={16} aria-hidden="true" /> Vishnu Garden, New Delhi</motion.p>
          <h1>
            {words.map((w, i) => (
              <motion.span key={w} className="word" initial={{ opacity: 0, y: 36 }} animate={ready && { opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>{w}&nbsp;</motion.span>
            ))}
          </h1>
          <motion.p className="lead" initial={{ opacity: 0, y: 16 }} animate={ready && { opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            Comfortable, professional dental care with Dr. Ankush Aggarwal. Tell us what you need on WhatsApp and the clinic will reply with available slots.
          </motion.p>
          <motion.div className="cta-row" initial={{ opacity: 0, y: 16 }} animate={ready && { opacity: 1, y: 0 }} transition={{ delay: 0.75 }}>
            <WaButton />
            <a className="btn btn-ghost" href="#services">Explore Our Services</a>
          </motion.div>
          <motion.div className="chip glass" initial={{ opacity: 0 }} animate={ready && { opacity: 1 }} transition={{ delay: 1 }}>
            <Star size={16} fill="currentColor" aria-hidden="true" /> <b>{clinic.rating.toFixed(1)}</b> on Google · {clinic.reviewCount} reviews
          </motion.div>
        </div>
        <motion.div className="hero-visual glass" initial={{ opacity: 0, scale: 0.92, rotateY: -12 }} animate={ready && { opacity: 1, scale: 1, rotateY: 0 }} transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
          {rm || !show3d ? <img src={clinic.logo} alt={`${clinic.name} logo`} className="hero-logo" /> : (
            <Suspense fallback={<img src={clinic.logo} alt="" className="hero-logo" />}><Tooth3D /></Suspense>
          )}
          <span className="hero-tag glass">{clinic.hindiName}</span>
        </motion.div>
      </div>
    </section>
  )
}
