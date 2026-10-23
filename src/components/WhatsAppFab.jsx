import { MessageCircle } from 'lucide-react'
import { waLink } from '../utils/whatsapp'
export default function WhatsAppFab() {
  return <a className="fab" href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="Book an appointment on WhatsApp"><MessageCircle size={28} aria-hidden="true" /></a>
}
