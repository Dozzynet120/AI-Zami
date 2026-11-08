import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import Home from './pages/Home'
import Cars from './pages/Cars'
import Import from './pages/Import'
import About from './pages/About'
import Contact from './pages/Contact'
import Order from './pages/Order'
import Admin from './pages/Admin'

export default function App() {
  const location = useLocation()
  useEffect(() => {
    const titles = {
      '/': 'AI Zami Ventures & Autos | Your Trusted Auto Import Partner',
      '/cars': 'Cars & Vehicle Sourcing | AI Zami Ventures & Autos',
      '/import': 'Car Import & Shipping | AI Zami Ventures & Autos',
      '/about': 'About Us | AI Zami Ventures & Autos',
      '/contact': 'Contact Us | AI Zami Ventures & Autos',
      '/order': 'Place a Vehicle Order | AI Zami Ventures & Autos',
      '/admin': 'Site Admin | AI Zami Ventures & Autos',
    }
    document.title = titles[location.pathname] || titles['/']
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/import" element={<Import />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/order" element={<Order />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
