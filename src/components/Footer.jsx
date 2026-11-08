import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react'
import WhatsAppLink from './WhatsAppLink'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <img src="/logo.png" alt="AI Zami Ventures & Autos" />
          <p>Making international vehicle sourcing clearer, more convenient and more customer-focused for buyers in Akwa Ibom and across Nigeria.</p>
          <WhatsAppLink message="Hello AI Zami Ventures & Autos. I found your website and would like to make an enquiry." />
        </div>
        <div>
          <h4>Explore</h4>
          <Link to="/">Home</Link><Link to="/cars">Our Cars</Link><Link to="/import">Import & Shipping</Link><Link to="/about">About Us</Link><Link to="/contact">Contact Us</Link><Link to="/order">Place an Order</Link>
        </div>
        <div>
          <h4>Our services</h4>
          <Link to="/import">USA vehicle sourcing</Link><Link to="/import">Dubai vehicle sourcing</Link><Link to="/import">Germany vehicle sourcing</Link><Link to="/import">Import guidance</Link><Link to="/cars">Vehicle requests</Link><Link to="/order">Order a vehicle</Link>
        </div>
        <div className="footer-contact">
          <h4>Get in touch</h4>
          <p><MapPin size={17} /> Akwa Ibom State, Nigeria</p>
          <a href="https://wa.me/2349115608176" target="_blank" rel="noreferrer"><Phone size={17} /> +234 911 560 8176</a>
          <p className="small-muted">For enquiries, availability and quotations, message our team on WhatsApp.</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} AI Zami Ventures & Autos. All rights reserved.</span>
        <span>International vehicle sourcing • Akwa Ibom, Nigeria</span>
      </div>
    </footer>
  )
}
