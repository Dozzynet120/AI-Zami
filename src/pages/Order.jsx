import { useEffect, useMemo, useState } from 'react'
import { CarFront, MapPin, Truck, Store, ShieldCheck, Clock3, Copy, CheckCircle2, AlertCircle, ArrowRight, X } from 'lucide-react'
import { vehicles } from '../data/vehicles'
import { whatsappUrl } from '../components/WhatsAppLink'

const PAYMENT_WINDOW_SECONDS = 15 * 60

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0')
  const secs = (seconds % 60).toString().padStart(2, '0')
  return `${mins}:${secs}`
}

// Replace these configuration values with the business's verified commercial account details.
const PAYMENT_DETAILS = {
  bank: 'BUSINESS BANK NAME TO BE ADDED',
  accountName: 'AI ZAMI VENTURES & AUTOS',
  accountNumber: 'ACCOUNT NUMBER TO BE ADDED',
}

export default function Order() {
  const [selectedId, setSelectedId] = useState(String(vehicles[0]?.id || ''))
  const [customer, setCustomer] = useState({ name: '', phone: '', email: '' })
  const [delivery, setDelivery] = useState('pickup')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [seconds, setSeconds] = useState(PAYMENT_WINDOW_SECONDS)
  const [paymentSubmitted, setPaymentSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [errors, setErrors] = useState(false)

  const selectedCar = useMemo(() => vehicles.find(v => String(v.id) === selectedId), [selectedId])

  useEffect(() => {
    if (!modalOpen || seconds <= 0 || paymentSubmitted) return
    const timer = window.setInterval(() => setSeconds(v => Math.max(0, v - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [modalOpen, seconds, paymentSubmitted])

  const updateCustomer = e => setCustomer({ ...customer, [e.target.name]: e.target.value })

  const beginPayment = e => {
    e.preventDefault()
    const valid = customer.name.trim() && customer.phone.trim() && selectedCar && (delivery === 'pickup' || address.trim())
    setErrors(true)
    if (!valid) return
    setSeconds(PAYMENT_WINDOW_SECONDS)
    setPaymentSubmitted(false)
    setModalOpen(true)
  }

  const copyAccount = async () => {
    try {
      await navigator.clipboard.writeText(PAYMENT_DETAILS.accountNumber)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  const sendOrderForVerification = () => {
    const message = `Hello AI Zami Ventures & Autos. I have initiated a vehicle order and would like payment verification.\n\nVehicle: ${selectedCar?.year} ${selectedCar?.name}\nCustomer: ${customer.name}\nPhone: ${customer.phone}\nEmail: ${customer.email || 'Not provided'}\nCollection: ${delivery === 'pickup' ? 'Pickup at car stand' : 'Doorstep shipping requested'}\nDelivery address: ${delivery === 'delivery' ? address : 'Not applicable'}\nAdditional notes: ${notes || 'None'}\n\nI will attach my payment receipt in this WhatsApp chat. Please confirm receipt and next steps.`
    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer')
    setPaymentSubmitted(true)
  }

  return <>
    <section className="page-hero page-hero-order">
      <div className="container page-hero-content">
        <span className="eyebrow">VEHICLE ORDER DESK</span>
        <h1>Choose your car.<br/><em>Plan your handover.</em></h1>
        <p>Select a vehicle example, provide your details and choose whether you prefer collection or doorstep shipping. Our team will confirm the final quotation and availability.</p>
      </div>
    </section>

    <section className="section section-pad">
      <div className="container order-layout">
        <div className="order-main">
          <div className="order-step-heading"><span>01</span><div><h2>Select your vehicle</h2><p>Choose from the current vehicle examples. Listings remain illustrative until confirmed with our team.</p></div></div>
          <div className="order-car-grid">
            {vehicles.map(v => <button type="button" key={v.id} onClick={() => setSelectedId(String(v.id))} className={`order-car-option ${selectedId === String(v.id) ? 'selected' : ''}`}>
              <img src={v.image} alt={`${v.year} ${v.name}`} />
              <span className="order-car-check">{selectedId === String(v.id) ? '✓' : ''}</span>
              <span className="order-car-copy"><small>{v.year} • {v.origin}</small><strong>{v.name}</strong><em>Request quotation</em></span>
            </button>)}
          </div>

          <div className="order-step-heading order-next-step"><span>02</span><div><h2>Your details</h2><p>Provide accurate contact information so we can discuss your order.</p></div></div>
          <form className="contact-form order-form" onSubmit={beginPayment} noValidate>
            <div className="form-row">
              <label>Full name *<input name="name" value={customer.name} onChange={updateCustomer} placeholder="Your full name"/>{errors && !customer.name.trim() && <small className="field-error">Please enter your name.</small>}</label>
              <label>Phone number *<input name="phone" value={customer.phone} onChange={updateCustomer} placeholder="+234..."/>{errors && !customer.phone.trim() && <small className="field-error">Please enter your phone number.</small>}</label>
            </div>
            <label>Email address (optional)<input type="email" name="email" value={customer.email} onChange={updateCustomer} placeholder="you@example.com"/></label>

            <div className="order-step-heading order-next-step"><span>03</span><div><h2>Choose your handover option</h2><p>Choose how you would like to receive the vehicle once all arrangements are completed.</p></div></div>
            <div className="delivery-options">
              <button type="button" className={`delivery-option ${delivery === 'pickup' ? 'active' : ''}`} onClick={() => setDelivery('pickup')}>
                <Store/><span><strong>Pick up at the car stand</strong><small>You will arrange to collect the vehicle from the agreed collection point.</small></span><i>{delivery === 'pickup' ? '✓' : ''}</i>
              </button>
              <button type="button" className={`delivery-option ${delivery === 'delivery' ? 'active' : ''}`} onClick={() => setDelivery('delivery')}>
                <Truck/><span><strong>Ship to my doorstep</strong><small>Request delivery to your preferred address. Delivery availability, cost and timing will be confirmed separately.</small></span><i>{delivery === 'delivery' ? '✓' : ''}</i>
              </button>
            </div>
            {delivery === 'delivery' && <label className="delivery-address">Doorstep delivery address *<textarea rows="3" value={address} onChange={e => setAddress(e.target.value)} placeholder="Enter house number, street, area, LGA, state and any useful directions."/>{errors && !address.trim() && <small className="field-error">Please enter your delivery address.</small>}</label>}
            <label>Additional instructions (optional)<textarea rows="3" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any preferred delivery date, questions or special instructions?"/></label>
            <div className="order-summary">
              <div><small>SELECTED VEHICLE</small><strong>{selectedCar ? `${selectedCar.year} ${selectedCar.name}` : 'Choose a vehicle'}</strong></div>
              <div><small>HANDOVER</small><strong>{delivery === 'pickup' ? 'Collection / pickup' : 'Doorstep delivery requested'}</strong></div>
              <div><small>PRICE</small><strong>Final quotation required</strong></div>
            </div>
            <button className="btn btn-primary form-submit" type="submit">Continue to payment details <ArrowRight size={17}/></button>
            <p className="form-disclaimer">Selecting a vehicle or opening the payment details does not confirm stock, reserve a vehicle or create a completed purchase. Please wait for a written quotation and confirmation from AI Zami Ventures & Autos before transferring funds.</p>
          </form>
        </div>

        <aside className="order-sidebar">
          <div className="order-help-card">
            <span className="eyebrow">ORDER SUMMARY</span>
            <div className="order-summary-car">{selectedCar && <img src={selectedCar.image} alt={selectedCar.name}/>}<div><small>YOUR SELECTION</small><strong>{selectedCar ? `${selectedCar.year} ${selectedCar.name}` : 'No vehicle selected'}</strong><span>{selectedCar?.origin || 'Choose a vehicle'} sourcing</span></div></div>
            <div className="order-sidebar-line"/>
            <div className="summary-row"><span>Vehicle price</span><strong>To be quoted</strong></div>
            <div className="summary-row"><span>Shipping / logistics</span><strong>To be quoted</strong></div>
            <div className="summary-row"><span>Doorstep delivery</span><strong>{delivery === 'delivery' ? 'Quote required' : 'Not selected'}</strong></div>
            <div className="summary-total"><span>Total payable</span><strong>Awaiting quotation</strong></div>
            <p className="order-small-note">A final amount will be provided after the vehicle, shipping and any delivery requirements have been reviewed.</p>
          </div>
          <div className="order-assurance"><ShieldCheck/><div><strong>Payment safety</strong><p>Only pay into verified business account details supplied directly by AI Zami Ventures & Autos. Confirm the account name and amount before transferring.</p></div></div>
          <div className="order-assurance"><MapPin/><div><strong>Delivery planning</strong><p>Doorstep delivery is a request option. Route coverage, delivery charges, insurance and estimated timing must be confirmed before payment.</p></div></div>
        </aside>
      </div>
    </section>

    {modalOpen && <div className="payment-modal-backdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) setModalOpen(false) }}>
      <section className="payment-modal" role="dialog" aria-modal="true" aria-labelledby="payment-title">
        <button className="modal-close" onClick={() => setModalOpen(false)} aria-label="Close payment details"><X/></button>
        {!paymentSubmitted ? <>
          <div className="payment-modal-icon"><Clock3/></div>
          <span className="eyebrow">BANK TRANSFER INSTRUCTIONS</span>
          <h2 id="payment-title">Payment details</h2>
          <p className="payment-intro">Use only the verified account details confirmed by our team and transfer the exact amount on your written quotation.</p>
          <div className="payment-countdown"><small>PAYMENT WINDOW</small><strong>{formatTime(seconds)}</strong><span>{seconds > 0 ? 'Time remaining in this payment instruction window' : 'This instruction window has expired. Contact our team before making a transfer.'}</span></div>
          <div className="bank-detail"><small>BANK</small><strong>{PAYMENT_DETAILS.bank}</strong></div>
          <div className="bank-detail"><small>ACCOUNT NAME</small><strong>{PAYMENT_DETAILS.accountName}</strong></div>
          <div className="bank-detail account-number-row"><div><small>ACCOUNT NUMBER</small><strong>{PAYMENT_DETAILS.accountNumber}</strong></div><button type="button" onClick={copyAccount} className="copy-account"><Copy size={15}/>{copied ? 'Copied' : 'Copy'}</button></div>
          <div className="payment-warning"><AlertCircle/><p><strong>Important:</strong> The business bank details above are placeholders until the verified commercial account details are supplied and configured. Do not transfer money to a placeholder or unverified account.</p></div>
          <button className="btn btn-primary form-submit" disabled={seconds === 0} onClick={sendOrderForVerification}>I have paid — send receipt for verification</button>
          <p className="form-disclaimer">The countdown is an instruction-window timer only. It does not verify a bank transfer, reserve a car or confirm payment. Payment must be checked by the business before an order is marked as paid.</p>
        </> : <div className="payment-submitted">
          <div className="payment-modal-icon"><CheckCircle2/></div>
          <span className="eyebrow">VERIFICATION REQUEST SENT</span>
          <h2>Awaiting payment verification</h2>
          <p>Your order summary has been prepared in WhatsApp. Attach your transfer receipt in that chat. Our team must verify the payment before confirming your order.</p>
          <div className="payment-warning"><AlertCircle/><p>This message is not a payment confirmation or proof that funds have been received.</p></div>
          <button className="btn btn-dark form-submit" onClick={() => setModalOpen(false)}>Close</button>
        </div>}
      </section>
    </div>}
  </>
}
