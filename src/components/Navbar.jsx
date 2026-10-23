import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { clinic } from '../config/clinicData'
import { WaButton } from './ui'

const links = [['home', 'Home'], ['about', 'About'], ['services', 'Services'], ['dentist', 'Dentist'], ['reviews', 'Reviews'], ['contact', 'Contact']]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    links.forEach(([id]) => { const el = document.getElementById(id); el && io.observe(el) })
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect() }
  }, [])

  useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' }, [open])

  return (
    <header className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-in">
        <a href="#home" className="brand" aria-label={`${clinic.name} home`}><img src={clinic.logo} alt="" width="48" height="48" /><span>{clinic.name}</span></a>
        <nav className="nav-links" aria-label="Main">
          {links.map(([id, l]) => <a key={id} href={`#${id}`} className={active === id ? 'on' : ''} aria-current={active === id ? 'true' : undefined}>{l}</a>)}
        </nav>
        <WaButton label="Book Appointment" small className="nav-cta" />
        <button className="burger" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div className="drawer" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
            {links.map(([id, l], i) => (
              <motion.a key={id} href={`#${id}`} onClick={() => setOpen(false)} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>{l}</motion.a>
            ))}
            <WaButton label="Book Appointment on WhatsApp" />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
