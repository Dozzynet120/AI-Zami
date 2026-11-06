import { useState } from 'react'
import { MapPin, Phone, MessageCircle, Clock, Send, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { whatsappUrl } from '../components/WhatsAppLink'
import WhatsAppLink from '../components/WhatsAppLink'

export default function Contact() {
  const [form,setForm] = useState({name:'',phone:'',email:'',interest:'Vehicle sourcing',origin:'No preference',vehicle:'',budget:'',message:''})
  const [attempted,setAttempted] = useState(false)
  const update = e => setForm({...form,[e.target.name]:e.target.value})
  const submit = e => {
    e.preventDefault(); setAttempted(true)
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) return
    const message = `Hello AI Zami Ventures & Autos. I would like to make an enquiry.\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email || 'Not provided'}\nEnquiry type: ${form.interest}\nPreferred market: ${form.origin}\nVehicle of interest: ${form.vehicle || 'Not specified'}\nBudget: ${form.budget || 'Not specified'}\nMessage: ${form.message}`
    window.open(whatsappUrl(message),'_blank','noopener,noreferrer')
  }
  return <>
    <section className="page-hero page-hero-contact"><div className="container page-hero-content"><span className="eyebrow">CONTACT OUR TEAM</span><h1>Your enquiry is<br/><em>where it begins.</em></h1><p>Tell us what you are looking for. Whether you have a specific car in mind or need help understanding the import process, we are ready to hear from you.</p></div></section>
    <section className="section section-pad"><div className="container contact-layout">
      <div className="contact-main"><SectionHeading eyebrow="SEND AN ENQUIRY" title="Let's talk about your next vehicle." text="Complete the details below and submit your enquiry. Your message will open in WhatsApp so you can review and send it directly to our team."/>
        <form className="contact-form" onSubmit={submit} noValidate>
          <div className="form-row"><label>Full name *<input name="name" value={form.name} onChange={update} placeholder="Your full name"/>{attempted&&!form.name.trim()&&<small className="field-error">Please enter your name.</small>}</label><label>Phone number *<input name="phone" value={form.phone} onChange={update} placeholder="+234..." />{attempted&&!form.phone.trim()&&<small className="field-error">Please enter your phone number.</small>}</label></div>
          <div className="form-row"><label>Email address (optional)<input type="email" name="email" value={form.email} onChange={update} placeholder="you@example.com"/></label><label>What can we help with?<select name="interest" value={form.interest} onChange={update}><option>Vehicle sourcing</option><option>Car import and shipping</option><option>Vehicle availability</option><option>General enquiry</option></select></label></div>
          <div className="form-row"><label>Preferred source market<select name="origin" value={form.origin} onChange={update}><option>No preference</option><option>USA</option><option>Dubai / UAE</option><option>Germany</option><option>Other market</option></select></label><label>Estimated budget<input name="budget" value={form.budget} onChange={update} placeholder="e.g. ₦15m – ₦20m"/></label></div>
          <label>Vehicle of interest<input name="vehicle" value={form.vehicle} onChange={update} placeholder="e.g. 2021 Toyota Camry, Lexus RX 350..."/></label>
          <label>Your message *<textarea name="message" value={form.message} onChange={update} rows="5" placeholder="Tell us about the vehicle, features, year, budget or questions you have..."/>{attempted&&!form.message.trim()&&<small className="field-error">Please add a short message.</small>}</label>
          <button className="btn btn-primary form-submit" type="submit">Continue to WhatsApp <Send size={17}/></button>
          <p className="form-disclaimer">Your details are placed into a WhatsApp message for you to review and send. This form does not store your information on a website database.</p>
        </form>
      </div>
      <aside className="contact-sidebar"><div className="contact-card"><span className="eyebrow">DIRECT CONTACT</span><h3>We’re one message away.</h3><p>For current vehicle availability, quotations and sourcing enquiries, WhatsApp is the quickest way to start a conversation.</p><a className="contact-method" href="https://wa.me/2348100062440" target="_blank" rel="noreferrer"><span><MessageCircle/></span><div><small>WHATSAPP / PHONE</small><strong>+234 810 006 2440</strong></div><ArrowUpRight/></a><div className="contact-method"><span><MapPin/></span><div><small>LOCATION</small><strong>Akwa Ibom State, Nigeria</strong><small>Serving customers across Nigeria</small></div></div><div className="contact-method"><span><Clock/></span><div><small>ENQUIRY SUPPORT</small><strong>Message us anytime</strong><small>Response time may vary.</small></div></div><WhatsAppLink className="btn btn-dark contact-card-button" message="Hello AI Zami Ventures & Autos. I would like to speak with your team." >Start a WhatsApp chat</WhatsAppLink></div>
        <div className="contact-note"><CheckCircle2/><div><strong>Help us help you faster</strong><p>Include the vehicle make, model, year, preferred country and budget in your first message. If you have a reference listing, share its link in WhatsApp.</p></div></div>
      </aside>
    </div></section>
  </>
}