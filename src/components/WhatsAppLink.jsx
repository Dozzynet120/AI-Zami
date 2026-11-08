import { MessageCircle } from 'lucide-react'

export const WHATSAPP_NUMBER = '2349115608176'

export function whatsappUrl(message = 'Hello AI Zami Ventures & Autos. I would like to make an enquiry.') {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export default function WhatsAppLink({ children = 'Chat with us', message, className = 'btn btn-primary', icon = true }) {
  return (
    <a className={className} href={whatsappUrl(message)} target="_blank" rel="noreferrer">
      {icon && <MessageCircle size={18} />} {children}
    </a>
  )
}
