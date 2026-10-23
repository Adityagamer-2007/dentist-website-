import { clinic } from '../config/clinicData'

export function buildMessage(service = '') {
  return `Hello ${clinic.name}, I would like to enquire about a dental appointment.

Name:
Preferred Treatment: ${service}
Preferred Date:
Preferred Time:

Please let me know your available appointment slots. Thank you.`
}

export function waLink(service = '') {
  return `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(buildMessage(service))}`
}

export function openWhatsApp(service = '') {
  window.open(waLink(service), '_blank', 'noopener,noreferrer')
}
