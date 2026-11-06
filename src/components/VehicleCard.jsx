import { ArrowUpRight, Fuel, Gauge, MapPin } from 'lucide-react'
import WhatsAppLink from './WhatsAppLink'

export default function VehicleCard({ vehicle }) {
  const message = `Hello AI Zami Ventures & Autos. I am interested in the ${vehicle.year} ${vehicle.name} (${vehicle.origin} sourcing). Please share availability, condition details and a quotation.`
  return <article className="vehicle-card">
    <div className="vehicle-image">
      <img src={vehicle.image} alt={`${vehicle.year} ${vehicle.name}`} loading="lazy" />
      <span className="vehicle-origin"><MapPin size={13} /> {vehicle.origin}</span>
      <span className="vehicle-status">{vehicle.status}</span>
    </div>
    <div className="vehicle-info">
      <div className="vehicle-title-row"><div><span className="vehicle-year">{vehicle.year} MODEL</span><h3>{vehicle.name}</h3></div><span className="vehicle-price">{vehicle.price}</span></div>
      <p className="vehicle-trim">{vehicle.trim}</p>
      <p className="vehicle-description">{vehicle.description}</p>
      <div className="vehicle-specs"><span><Fuel size={15}/>{vehicle.fuel}</span><span><Gauge size={15}/>{vehicle.transmission}</span></div>
      <WhatsAppLink className="vehicle-link" message={message} icon={false}>Enquire about this car <ArrowUpRight size={16}/></WhatsAppLink>
    </div>
  </article>
}