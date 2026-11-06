import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal, ArrowUpRight, Info } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import VehicleCard from '../components/VehicleCard'
import WhatsAppLink from '../components/WhatsAppLink'
import { vehicles } from '../data/vehicles'

export default function Cars() {
  const [search,setSearch] = useState('')
  const [origin,setOrigin] = useState('All markets')
  const [sort,setSort] = useState('Recommended')
  const filtered = useMemo(() => {
    let list = vehicles.filter(v => `${v.name} ${v.year} ${v.trim} ${v.origin}`.toLowerCase().includes(search.toLowerCase()) && (origin === 'All markets' || v.origin === origin))
    if (sort === 'Newest first') list = [...list].sort((a,b)=>Number(b.year)-Number(a.year))
    if (sort === 'Oldest first') list = [...list].sort((a,b)=>Number(a.year)-Number(b.year))
    return list
  },[search,origin,sort])
  return <>
    <section className="page-hero page-hero-cars"><div className="container page-hero-content"><span className="eyebrow">VEHICLE OPTIONS</span><h1>Find the vehicle<br/><em>that fits your life.</em></h1><p>From practical daily drivers to premium SUVs and executive vehicles, start with the car you want and let’s discuss sourcing possibilities.</p></div></section>
    <section className="section section-pad">
      <div className="container">
        <SectionHeading eyebrow="OUR VEHICLE DESK" title="Explore vehicle inspiration" text="Use the filters to narrow the examples below. These are sample sourcing profiles, not a representation of confirmed physical stock. Contact us for current availability and a personalised quotation."/>
        <div className="inventory-toolbar">
          <label className="search-box"><Search size={18}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search make, model or year..." aria-label="Search vehicles"/></label>
          <label className="filter-box"><SlidersHorizontal size={17}/><select value={origin} onChange={e=>setOrigin(e.target.value)} aria-label="Filter by origin"><option>All markets</option><option>USA</option><option>Dubai</option><option>Germany</option></select></label>
          <label className="filter-box"><select value={sort} onChange={e=>setSort(e.target.value)} aria-label="Sort vehicles"><option>Recommended</option><option>Newest first</option><option>Oldest first</option></select></label>
        </div>
        <div className="results-line"><span>{filtered.length} vehicle {filtered.length===1?'example':'examples'}</span><span>Prices and availability confirmed individually</span></div>
        {filtered.length ? <div className="vehicle-grid">{filtered.map(v=><VehicleCard key={v.id} vehicle={v}/>)}</div> : <div className="empty-state"><Search size={30}/><h3>No matching examples found</h3><p>Try a different search or choose another market. You can also tell us what vehicle you want us to source.</p><button className="btn btn-primary" onClick={()=>{setSearch('');setOrigin('All markets')}}>Clear filters</button></div>}
      </div>
    </section>
    <section className="section section-soft section-pad"><div className="container two-column-content"><div><span className="eyebrow">CAN'T SEE YOUR DREAM CAR?</span><h2>We can start with your exact specification.</h2><p>Not every vehicle request will appear in a sample gallery. Send us the make, model, preferred year, trim, mileage expectations, colour and budget range. If you have a reference listing or photograph, include it in your WhatsApp message.</p><ul className="check-list"><li>New, foreign-used and other requested categories can be discussed.</li><li>Specify the source country you prefer—or ask us to discuss alternatives.</li><li>Ask for a breakdown of the expected costs before you commit.</li></ul><WhatsAppLink message="Hello AI Zami Ventures & Autos. I would like to request a vehicle that is not listed on your website. I will share my preferred make, model, year and budget."/></div><div className="request-panel"><div className="request-panel-icon"><Info/></div><h3>Before you place an order</h3><p>Vehicle prices, condition, mileage, availability, shipping schedules and import charges can change. Always request a current quotation and review the relevant vehicle and transaction details before making payment.</p><div className="request-panel-line"/><strong>Need help preparing your brief?</strong><p>Our team can help you organise the information needed to begin a vehicle search.</p><WhatsAppLink className="btn btn-dark" message="Hello AI Zami Ventures & Autos. Please help me prepare a vehicle sourcing brief." icon={false}>Prepare my vehicle brief <ArrowUpRight size={16}/></WhatsAppLink></div></div></section>
  </>
}