import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { clinic } from './config/clinicData'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WhatsAppFab from './components/WhatsAppFab'
import { TrustHighlights, AboutClinic, ServicesSection, DentistProfile, GallerySection, ReviewsSection, ContactSection, Footer } from './components/Sections'

function Loader() {
  return (
    <motion.div className="loader" exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: 0.6 }}>
      <motion.img src={clinic.logo} alt={clinic.name} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} />
      <span className="bar"><motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.3 }} /></span>
    </motion.div>
  )
}

export default function App() {
  const [ready, setReady] = useState(false)
  useEffect(() => { const t = setTimeout(() => setReady(true), 1500); return () => clearTimeout(t) }, [])
  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{!ready && <Loader key="l" />}</AnimatePresence>
      <Navbar />
      <main>
        <Hero ready={ready} />
        <TrustHighlights />
        <AboutClinic />
        <ServicesSection />
        <DentistProfile />
        <GallerySection />
        <ReviewsSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFab />
    </MotionConfig>
  )
}
