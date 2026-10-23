// ONE place to edit clinic details. Items marked VERIFY must be confirmed with the clinic before going live.
import logo from '../assets/images/logo.png'
import treatmentRoom from '../assets/images/treatment-room.png'
import consultation from '../assets/images/consultation-corner.png'
import entrance from '../assets/images/clinic-entrance.png'

export const clinic = {
  name: 'Devaansh Dental Clinic',
  hindiName: 'देवांश डेंटल क्लिनिक',
  logo,
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || '919999003555', // international format, no + or spaces
  phoneDisplay: '+91 99990 03555',
  phoneTel: '+919999003555',
  address: 'WZ-283/38, Maddi Wali Gali, Block B, Khyala, Vishnu Garden, New Delhi, Delhi – 110018, India',
  plusCode: 'M422+R6, New Delhi, Delhi',
  // VERIFY: replace with the clinic's own Google Maps listing link when available.
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Devaansh+Dental+Clinic+Maddi+Wali+Gali+Vishnu+Garden+New+Delhi',
  mapsReviewUrl: 'https://www.google.com/maps/search/?api=1&query=Devaansh+Dental+Clinic+Maddi+Wali+Gali+Vishnu+Garden+New+Delhi',
  mapsEmbed: import.meta.env.VITE_MAPS_EMBED_URL || '', // paste a Google Maps "Embed a map" src URL to show a live map
  rating: 4.0,
  reviewCount: 9,
  // VERIFY: full weekly schedule not supplied. Leave empty until confirmed, e.g. [{ day: 'Mon – Sat', time: '10:00 AM – 8:00 PM' }]
  hours: [],
  dentist: {
    name: 'Dr. Ankush Aggarwal', // VERIFY spelling (reviews also say "Agarwal")
    intro: 'Dr. Ankush Aggarwal leads the clinic. Patients describe his treatment as painless and his approach as skilled and caring.',
    qualifications: '', // VERIFY before adding
    photo: '', // add a file in src/assets/images and import it above
  },
  // Services shown on the clinic's own entrance signboard. VERIFY before going live.
  services: [
    { name: 'Dental Implants', icon: 'Gem', text: 'Fixed replacement for missing teeth, planned around your bite and comfort.' },
    { name: 'Braces', icon: 'Layers', text: 'Orthodontic treatment to align teeth and improve your bite.' },
    { name: 'Root Canal Treatment', icon: 'Activity', text: 'Treatment to relieve pain and save a badly infected or damaged tooth.' },
    { name: 'Smile Design', icon: 'Sparkles', text: 'Cosmetic planning to shape a smile that suits your face.' },
    { name: 'Dentures', icon: 'SmilePlus', text: 'Removable replacements for missing teeth so you can eat and speak with confidence.' },
    { name: 'Crown & Bridge', icon: 'Crown', text: 'Caps and fixed bridges to restore broken, weak or missing teeth.' },
  ],
  // Genuine Google reviews supplied by the clinic. 3 of 9 shown.
  reviews: [
    { name: 'Shahid Ali', text: 'I had an amazing experience at Devansh Dental clinic. The staff was friendly and professional, and the dentist was knowledgeable and master of his work. Thank you Dr Ankush Aggarwal for painless treatment.' },
    { name: 'Prateek Jain', text: 'Dr Ankush Agarwal is an exceptional dentist— skilled, compassionate, and truly committed to patient care. Highly recommended!' },
    { name: 'Kamal Kishor', text: 'Best dental treatment and services well furnished clinic.. properly sterilised equipment with clean and hygienic .. nyc' },
  ],
  gallery: [
    { src: treatmentRoom, alt: 'Treatment room with dental chair, overhead light and X-ray unit at Devaansh Dental Clinic', caption: 'Treatment room' },
    { src: consultation, alt: 'Consultation desk and dental chair at Devaansh Dental Clinic', caption: 'Consultation corner' },
    { src: entrance, alt: 'Entrance of the clinic in Maddi Wali Gali, Vishnu Garden', caption: 'Clinic entrance' },
  ],
  images: { about: entrance, aboutSecondary: treatmentRoom },
}
