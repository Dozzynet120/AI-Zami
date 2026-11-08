import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import WhatsAppLink from './WhatsAppLink'

const links = [
  ['Home', '/'], ['Our Cars', '/cars'], ['Import & Shipping', '/import'],
  ['About Us', '/about'], ['Contact', '/contact'], ['Place an Order', '/order'],
]

export default function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <img src="/logo.png" alt="AI Zami Ventures & Autos" />
        </Link>
        <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
        <nav className={`main-nav ${open ? 'is-open' : ''}`}>
          {links.map(([label, path]) => (
            <NavLink key={path} to={path} end={path === '/'} onClick={() => setOpen(false)}
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              {label}
            </NavLink>
          ))}
          <WhatsAppLink className="btn btn-primary nav-cta" message="Hello AI Zami Ventures & Autos. I would like to discuss a vehicle enquiry.">
            Get a quote
          </WhatsAppLink>
        </nav>
      </div>
    </header>
  )
}