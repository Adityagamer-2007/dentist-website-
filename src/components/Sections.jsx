import { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Star, Clock, MapPin, Phone, Navigation, ChevronLeft, ChevronRight, X, ShieldCheck, MessageCircle, Quote, Gem, Layers, Activity, Sparkles, SmilePlus, Crown, Smile } from 'lucide-react'
import { clinic } from '../config/clinicData'
import { Reveal, Tilt, WaButton, Counter, Heading } from './ui'
import { waLink } from '../utils/whatsapp'

const Icons = { Gem, Layers, Activity, Sparkles, SmilePlus, Crown, Smile }

export function TrustHighlights() {
  return (
    <section className="trust wrap" aria-label="Clinic highlights">
      <Reveal className="trust-grid">
        <div className="glass stat"><Star aria-hidden="true" /><strong><Counter to={clinic.rating} decimals={1} /></strong><span>Google rating</span></div>
        <div className="glass stat"><MessageCircle aria-hidden="true" /><strong><Counter to={clinic.reviewCount} /></strong><span>Google reviews</span></div>
        <div className="glass stat"><ShieldCheck aria-hidden="true" /><strong>Clean</strong><span>Sterilised equipment, as patients say</span></div>
        <div className="glass stat"><Clock aria-hidden="true" /><strong>WhatsApp</strong><span>Message us to confirm timings and slots</span></div>
      </Reveal>
    </section>
  )
}

export function AboutClinic() {
  return (
    <section id="about" className="section wrap about">
      <Reveal className="about-imgs">
        <Tilt><img src={clinic.images.about} alt="Entrance of Devaansh Dental Clinic in Vishnu Garden" loading="lazy" className="img-a" /></Tilt>
        <img src={clinic.images.aboutSecondary} alt="Treatment room at Devaansh Dental Clinic" loading="lazy" className="img-b" />
      </Reveal>
      <div>
        <Heading title="A neighbourhood clinic that treats you with care" />
        <Reveal delay={0.1}>
          <p className="body">Devaansh Dental Clinic is an orthodontic and implant centre in Vishnu Garden, New Delhi, led by Dr. Ankush Aggarwal.</p>
          <p className="body">Patients who reviewed us on Google mention friendly staff, painless treatment and a clean clinic with properly sterilised equipment. That is the standard we work to every day.</p>
          <div className="glass note"><ShieldCheck aria-hidden="true" /> Appointment requests are sent on WhatsApp and are confirmed by the clinic.</div>
        </Reveal>
      </div>
    </section>
  )
}

export function ServicesSection() {
  return (
    <section id="services" className="section wrap">
      <Heading title="Dental treatments" text="Choose a treatment to send a pre-filled WhatsApp enquiry." />
      <div className="svc-grid">
        {clinic.services.map((s, i) => {
          const Icon = Icons[s.icon] || Icons.Smile
          return (
            <Reveal key={s.name} delay={(i % 3) * 0.08}>
              <Tilt className="svc glass">
                <span className="svc-icon"><Icon aria-hidden="true" /></span>
                <h3>{s.name}</h3>
                <p>{s.text}</p>
                <WaButton service={s.name} label="Book via WhatsApp" variant="outline" small />
              </Tilt>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

export function DentistProfile() {
  const d = clinic.dentist
  return (
    <section id="dentist" className="section wrap dentist">
      <Reveal>
        <Tilt max={7} className="frame">
          {d.photo ? <img src={d.photo} alt={d.name} loading="lazy" /> : (
            <div className="frame-ph"><img src={clinic.logo} alt="" /><span>{d.name}</span></div>
          )}
        </Tilt>
      </Reveal>
      <div>
        <Heading title={`Meet ${d.name}`} />
        <Reveal delay={0.1}>
          <p className="body">{d.intro}</p>
          {d.qualifications && <p className="body"><b>Qualifications:</b> {d.qualifications}</p>}
          <blockquote className="glass pull"><Quote aria-hidden="true" /> “Thank you Dr Ankush Aggarwal for painless treatment.” <cite>Shahid Ali, Google review</cite></blockquote>
          <WaButton label="Book with Dr. Ankush on WhatsApp" />
        </Reveal>
      </div>
    </section>
  )
}

export function GallerySection() {
  const [open, setOpen] = useState(null)
  return (
    <section id="gallery" className="section wrap">
      <Heading title="Inside the clinic" text="Tap a photo to see it larger." />
      <div className="gal">
        {clinic.gallery.map((g, i) => (
          <Reveal key={g.src} delay={i * 0.08} className={`gal-i gal-${i}`}>
            <button onClick={() => setOpen(g)} aria-label={`Open photo: ${g.caption}`}>
              <img src={g.src} alt={g.alt} loading="lazy" /><span>{g.caption}</span>
            </button>
          </Reveal>
        ))}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label={open.caption} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <motion.img src={open.src} alt={open.alt} initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }} onClick={(e) => e.stopPropagation()} />
            <button className="lb-x" onClick={() => setOpen(null)} aria-label="Close photo"><X /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export function ReviewsSection() {
  const ref = useRef(null)
  const go = (d) => ref.current.scrollBy({ left: d * Math.min(420, ref.current.clientWidth * 0.85), behavior: 'smooth' })
  return (
    <section id="reviews" className="section wrap">
      <Heading title="What patients say" text={`${clinic.rating.toFixed(1)} stars from ${clinic.reviewCount} Google reviews. Three are shown here.`} />
      <div className="rev-bar">
        <a className="btn btn-outline btn-sm" href={clinic.mapsReviewUrl} target="_blank" rel="noopener noreferrer"><Star size={16} aria-hidden="true" /> See all reviews on Google Maps</a>
        <div><button className="round" onClick={() => go(-1)} aria-label="Previous reviews"><ChevronLeft /></button><button className="round" onClick={() => go(1)} aria-label="Next reviews"><ChevronRight /></button></div>
      </div>
      <div className="rev-track" ref={ref} tabIndex={0} aria-label="Patient reviews">
        {clinic.reviews.map((r) => (
          <figure key={r.name} className="rev glass">
            <Quote aria-hidden="true" />
            <blockquote>{r.text}</blockquote>
            <figcaption>{r.name}<small>Google review</small></figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

export function ContactSection() {
  return (
    <section id="contact" className="section wrap">
      <Heading title="Visit or message us" />
      <div className="contact">
        <Reveal className="glass cbox">
          <p><MapPin aria-hidden="true" /><span>{clinic.address}<small>Plus code: {clinic.plusCode}</small></span></p>
          <p><Phone aria-hidden="true" /><a href={`tel:${clinic.phoneTel}`}>{clinic.phoneDisplay}</a></p>
          <div className="hrs"><Clock aria-hidden="true" />
            {clinic.hours.length ? <ul>{clinic.hours.map((h) => <li key={h.day}><b>{h.day}</b> {h.time}</li>)}</ul>
              : <span>Opening hours are confirmed by the clinic. Message us on WhatsApp to check availability.</span>}
          </div>
          <div className="cta-row"><WaButton /><a className="btn btn-outline" href={clinic.mapsUrl} target="_blank" rel="noopener noreferrer"><Navigation size={18} aria-hidden="true" /> Get Directions</a></div>
          <small className="fine">Appointments are requests only. The clinic confirms the date and time on WhatsApp.</small>
        </Reveal>
        <Reveal delay={0.1} className="map glass">
          {clinic.mapsEmbed ? <iframe title={`Map of ${clinic.name}`} src={clinic.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            : <div className="map-ph"><MapPin size={40} aria-hidden="true" /><p>Maddi Wali Gali, Vishnu Garden</p><a className="btn btn-solid btn-sm" href={clinic.mapsUrl} target="_blank" rel="noopener noreferrer">Open in Google Maps</a></div>}
        </Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap foot-grid">
        <div><img src={clinic.logo} alt={clinic.name} width="90" height="90" /><p>Comfortable, professional dental care in Vishnu Garden, New Delhi.</p></div>
        <nav aria-label="Footer"><h4>Explore</h4>{['about', 'services', 'dentist', 'gallery', 'reviews', 'contact'].map((id) => <a key={id} href={`#${id}`}>{id[0].toUpperCase() + id.slice(1)}</a>)}</nav>
        <div><h4>Contact</h4><p>{clinic.address}</p><a href={`tel:${clinic.phoneTel}`}>{clinic.phoneDisplay}</a>
          <a href={waLink()} target="_blank" rel="noopener noreferrer">WhatsApp appointment enquiry</a>
          <a href={clinic.mapsUrl} target="_blank" rel="noopener noreferrer">Google Maps directions</a></div>
      </div>
      <p className="copy">© {new Date().getFullYear()} {clinic.name}. All rights reserved.</p>
    </footer>
  )
}
