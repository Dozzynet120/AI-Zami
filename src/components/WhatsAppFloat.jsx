import { MessageCircle } from 'lucide-react'
import { whatsappUrl } from './WhatsAppLink'

export default function WhatsAppFloat() {
  return <a className="whatsapp-float" href={whatsappUrl('Hello AI Zami Ventures & Autos. I would like to make an enquiry.')} target="_blank" rel="noreferrer" aria-label="Chat with AI Zami Ventures & Autos on WhatsApp"><MessageCircle size={25} /><span>Chat with us</span></a>
}