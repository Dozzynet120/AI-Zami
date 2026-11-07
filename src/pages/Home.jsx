import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, ShieldCheck, Globe2, ClipboardCheck, Headphones, CheckCircle2, CarFront, Ship, Search, BadgeCheck } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import VehicleCard from '../components/VehicleCard'
import WhatsAppLink from '../components/WhatsAppLink'
import { vehicles } from '../data/vehicles'

const markets = [
  { name: 'United States', tag: 'USA', text: 'Explore a wide international vehicle market and request the make, model, year and specification that fit your needs.', image: '/images/WhatsApp Image 2026-11-07 at 5.55.49 AM (2).jpeg' },
  { name: 'Dubai, UAE', tag: 'DUBAI', text: 'Tell us the vehicle you have in mind and let us help you understand sourcing options and the import journey.', image: '/images/WhatsApp Image 2026-11-07 at 5.55.50 AM.jpeg' },
  { name: 'Germany', tag: 'GERMANY', text: 'Request European vehicle options with the features, condition expectations and budget you specify.', image: '/images/WhatsApp Image 2026-11-07 at 5.55.50 AM (3).jpeg' },
]
const heroSlides = [
  { image: '/images/WhatsApp Image 2026-11-07 at 5.55.52 AM (2).jpeg', alt: 'Zami Automobile car stand' },
  { image: '/images/WhatsApp Image 2026-11-07 at 5.55.47 AM.jpeg', alt: 'Black Toyota Corolla at Zami' },
  { image: '/images/WhatsApp Image 2026-11-07 at 5.55.47 AM (1).jpeg', alt: 'Silver Toyota sedan' },
  { image: '/images/WhatsApp Image 2026-11-07 at 5.55.50 AM (3).jpeg', alt: 'White Lexus SUV' },
]
const suppliedPhotos = [
  'WhatsApp Image 2026-11-07 at 5.55.47 AM (1).jpeg', 'WhatsApp Image 2026-11-07 at 5.55.47 AM (2).jpeg', 'WhatsApp Image 2026-11-07 at 5.55.47 AM.jpeg',
  'WhatsApp Image 2026-11-07 at 5.55.48 AM (1).jpeg', 'WhatsApp Image 2026-11-07 at 5.55.48 AM (2).jpeg', 'WhatsApp Image 2026-11-07 at 5.55.48 AM (3).jpeg', 'WhatsApp Image 2026-11-07 at 5.55.48 AM.jpeg',
  'WhatsApp Image 2026-11-07 at 5.55.49 AM (1).jpeg', 'WhatsApp Image 2026-11-07 at 5.55.49 AM (2).jpeg', 'WhatsApp Image 2026-11-07 at 5.55.49 AM (3).jpeg', 'WhatsApp Image 2026-11-07 at 5.55.49 AM.jpeg',
  'WhatsApp Image 2026-11-07 at 5.55.50 AM (1).jpeg', 'WhatsApp Image 2026-11-07 at 5.55.50 AM (2).jpeg', 'WhatsApp Image 2026-11-07 at 5.55.50 AM (3).jpeg', 'WhatsApp Image 2026-11-07 at 5.55.50 AM.jpeg',
  'WhatsApp Image 2026-11-07 at 5.55.51 AM (1).jpeg', 'WhatsApp Image 2026-11-07 at 5.55.51 AM (2).jpeg', 'WhatsApp Image 2026-11-07 at 5.55.51 AM.jpeg',
  'WhatsApp Image 2026-11-07 at 5.55.52 AM (1).jpeg', 'WhatsApp Image 2026-11-07 at 5.55.52 AM (2).jpeg', 'WhatsApp Image 2026-11-07 at 5.55.52 AM.jpeg',
  'WhatsApp Image 2026-11-07 at 5.55.53 AM (1).jpeg', 'WhatsApp Image 2026-11-07 at 5.55.53 AM.jpeg', 'WhatsApp Image 2026-11-07 at 5.55.54 AM.jpeg', 'WhatsApp Image 2026-11-07 at 5.55.56 AM.jpeg',
]
const benefits = [
  { icon: Search, title: 'Sourcing around your brief', text: 'Share your preferred brand, model, year, budget and must-have features. We use your brief to guide the search.' },
  { icon: ClipboardCheck, title: 'Clearer buying steps', text: 'Understand the stages, the information required and the decisions to make before committing to a purchase.' },
  { icon: ShieldCheck, title: 'Information-led decisions', text: 'Ask for vehicle details, available documentation and condition information before deciding how to proceed.' },
  { icon: Headphones, title: 'Direct communication', text: 'Speak with our team about your request and get updates through a direct WhatsApp conversation.' },
]
const steps = [
  ['01', 'Tell us what you need', 'Share your desired vehicle, budget range, preferred source country and any important specifications.'],
  ['02', 'Discuss suitable options', 'We discuss sourcing possibilities and the details you should review before selecting a vehicle.'],
  ['03', 'Review the quotation', 'Understand the vehicle cost, estimated logistics and other applicable charges before authorising the next step.'],
  ['04', 'Follow the import journey', 'Stay in communication as the agreed sourcing, shipping and delivery arrangements progress.'],
]

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0)
  useEffect(() => {
    const timer = window.setInterval(() => setActiveSlide(index => (index + 1) % heroSlides.length), 5000)
    return () => window.clearInterval(timer)
  }, [])
  return <>
    <section className="hero">
      {heroSlides.map((slide, index) => <div key={slide.image} className={`hero-image ${index === activeSlide ? 'hero-image-active' : ''}`} style={{ backgroundImage: `url("${slide.image}")` }} role="img" aria-label={slide.alt} />)}
      <div className="hero-shade" />
      <div className="container hero-content">
        <span className="hero-kicker"><span /> INTERNATIONAL VEHICLE SOURCING & IMPORT</span>
        <h1>Your next car.<br/><em>Your terms.</em><br/>Our commitment.</h1>
        <p>Discover a more informed way to source and import vehicles from the USA, Dubai, Germany and other international markets—with a team ready to guide your enquiry from Akwa Ibom.</p>
        <div className="hero-actions">
          <Link to="/cars" className="btn btn-primary">Explore vehicle options <ArrowRight size={18}/></Link>
          <WhatsAppLink className="btn btn-light-outline" message="Hello AI Zami Ventures & Autos. I would like help sourcing a vehicle." icon={false}>Talk to our team <ArrowUpRight size={18}/></WhatsAppLink>
        </div>
        <div className="hero-proof"><span><CheckCircle2 size={16}/> Personalised vehicle requests</span><span><CheckCircle2 size={16}/> Multiple sourcing markets</span><span><CheckCircle2 size={16}/> Direct enquiry support</span></div>
      </div>
      <div className="hero-side-label">AI ZAMI VENTURES & AUTOS — AKWA IBOM, NIGERIA</div>
      <div className="hero-dots" aria-label="Choose hero slide">{heroSlides.map((slide, index) => <button key={slide.image} aria-label={`Show slide ${index + 1}: ${slide.alt}`} aria-current={index === activeSlide} onClick={() => setActiveSlide(index)} />)}</div>
    </section>

    <section className="trust-strip">
      <div className="container trust-grid">
        <div><Globe2/><strong>Global sourcing</strong><span>USA • Dubai • Germany</span></div>
        <div><CarFront/><strong>Made-to-fit requests</strong><span>Tell us your exact preference</span></div>
        <div><ClipboardCheck/><strong>Guided process</strong><span>Know the steps before you proceed</span></div>
        <div><Headphones/><strong>Direct support</strong><span>Speak with our team</span></div>
      </div>
    </section>

    <section className="section section-pad">
      <div className="container split-intro">
        <div><span className="eyebrow">WELCOME TO AI ZAMI</span><h2>More than finding a car.<br/><span>Making the journey clearer.</span></h2></div>
        <div><p>Buying a vehicle from another country can involve many moving parts: choosing the right specification, checking condition information, understanding costs, arranging shipping and planning delivery. AI Zami Ventures & Autos is here to help you approach those decisions with better information and a clear point of contact.</p><Link to="/about" className="text-link">Get to know us <ArrowUpRight size={17}/></Link></div>
      </div>
    </section>

    <section className="section section-soft section-pad">
      <div className="container"><SectionHeading eyebrow="AT ZAMI AUTOMOBILE" title="A closer look at our cars and stand" text="Browse the latest photos from Zami Automobile."/><div className="photo-gallery">{suppliedPhotos.map((photo, index) => <img key={photo} src={`/images/${photo}`} alt={`Zami Automobile vehicle and stand photo ${index + 1}`} loading="lazy" />)}</div></div>
    </section>

    <section className="section section-soft section-pad">
      <div className="container">
        <SectionHeading eyebrow="SOURCE WITH PURPOSE" title="Three key markets. One conversation to get started." text="Have a vehicle in mind? Tell us the market you prefer—or let us discuss the options that may suit your requirements."/>
        <div className="market-grid">{markets.map(m => <article className="market-card" key={m.tag}><img src={m.image} alt={`${m.name} vehicle sourcing`} loading="lazy"/><div className="market-overlay"/><div className="market-content"><span>{m.tag}</span><h3>{m.name}</h3><p>{m.text}</p><Link to="/import">Explore sourcing <ArrowUpRight size={16}/></Link></div></article>)}</div>
      </div>
    </section>

    <section className="section section-pad">
      <div className="container">
        <div className="section-topline"><SectionHeading eyebrow="VEHICLE INSPIRATION" title="What are you looking to drive?" text="Browse examples of vehicle categories and models customers commonly ask about. Listings shown here are illustrative sourcing examples, not confirmed live stock."/><Link to="/cars" className="btn btn-outline">View all vehicle options <ArrowRight size={17}/></Link></div>
        <div className="vehicle-grid">{vehicles.slice(0,3).map(v => <VehicleCard key={v.id} vehicle={v}/>)}</div>
      </div>
    </section>

    <section className="section section-dark section-pad">
      <div className="container">
        <SectionHeading eyebrow="THE AI ZAMI APPROACH" title="A considered process, from first message to next steps." text="We believe a vehicle purchase should begin with the right questions and a clear understanding of what comes next."/>
        <div className="benefit-grid">{benefits.map(({icon:Icon,title,text},i)=><article className="benefit-card" key={title}><div className="benefit-icon"><Icon size={23}/></div><span className="benefit-number">0{i+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </div>
    </section>

    <section className="section section-pad">
      <div className="container">
        <SectionHeading eyebrow="HOW IT WORKS" title="Four steps to a more informed vehicle request." text="A straightforward starting point. The exact process, timeline and costs depend on the vehicle and the arrangements agreed for your order." centered/>
        <div className="steps-grid">{steps.map(([n,t,d])=><article className="step-card" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div>
        <div className="center-action"><Link to="/import" className="text-link">Understand the import process <ArrowRight size={17}/></Link></div>
      </div>
    </section>

    <section className="cta-band"><div className="container cta-inner"><div><span className="eyebrow">LET'S FIND YOUR NEXT VEHICLE</span><h2>Have a car in mind?<br/>Let's talk about it.</h2><p>Send us your preferred make, model, year and budget. We’ll use those details to start a focused conversation.</p></div><div className="cta-actions"><WhatsAppLink message="Hello AI Zami Ventures & Autos. I have a vehicle in mind and would like to discuss sourcing options."/><Link to="/contact" className="btn btn-outline">Send an enquiry <ArrowUpRight size={17}/></Link></div></div></section>
  </>
}
