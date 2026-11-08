import { useEffect, useMemo, useState } from 'react'
import { CheckCircle2, ImagePlus, LockKeyhole, LogOut, Pencil, Plus, Save, Trash2, X } from 'lucide-react'
import { checkAdminSession, loginAdmin, logoutAdmin, readAdminContent, saveAdminContent, uploadAdminImage } from '../data/adminApi'
import { defaultSiteContent } from '../data/siteContent'

const emptyVehicle = {
  name: '', year: '', trim: '', origin: 'USA', fuel: 'Petrol', transmission: 'Automatic',
  price: 'Request price', status: 'Sourcing available', image: '', description: '',
}

export default function Admin() {
  const [connected, setConnected] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [content, setContent] = useState(null)
  const [form, setForm] = useState(emptyVehicle)
  const [editingId, setEditingId] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const sortedVehicles = useMemo(() => [...(content?.vehicles || [])].sort((a, b) => Number(b.year) - Number(a.year)), [content])

  useEffect(() => {
    checkAdminSession().then(async authenticated => {
      if (!authenticated) return
      const saved = await readAdminContent()
      setContent(saved || defaultSiteContent)
      setConnected(true)
    }).catch(() => {})
  }, [])

  const connect = async event => {
    event.preventDefault()
    setBusy(true); setError(''); setNotice('')
    try {
      await loginAdmin(username, password)
      const saved = await readAdminContent()
      setContent(saved || defaultSiteContent)
      setConnected(true)
      setPassword('')
    } catch (err) {
      setError(err.message)
    } finally { setBusy(false) }
  }

  const resetForm = () => { setForm(emptyVehicle); setEditingId(null); setImageFile(null) }
  const editVehicle = vehicle => {
    setForm({ ...emptyVehicle, ...vehicle })
    setEditingId(vehicle.id)
    setImageFile(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const saveVehicle = async event => {
    event.preventDefault()
    setBusy(true); setError(''); setNotice('')
    try {
      let image = form.image
      if (imageFile) {
        if (imageFile.size > 2_500_000) throw new Error('Choose an image smaller than 2.5 MB.')
        image = await uploadAdminImage(imageFile)
      }
      if (!image) throw new Error('Choose a car photo before saving.')
      const record = { ...form, id: editingId ?? Date.now(), image }
      const vehicles = editingId === null
        ? [...content.vehicles, record]
        : content.vehicles.map(vehicle => vehicle.id === editingId ? record : vehicle)
      const nextContent = { ...content, vehicles }
      await saveAdminContent(nextContent)
      setContent(nextContent); resetForm()
      setNotice(`Saved ${record.year} ${record.name}. The update is available to all visitors and remains after refresh.`)
    } catch (err) {
      setError(`Could not save this car. ${err.message}`)
    } finally { setBusy(false) }
  }

  const deleteVehicle = async vehicle => {
    if (!window.confirm(`Remove ${vehicle.year} ${vehicle.name} from the Home gallery and Place an Order?`)) return
    setBusy(true); setError(''); setNotice('')
    try {
      const nextContent = { ...content, vehicles: content.vehicles.filter(item => item.id !== vehicle.id) }
      await saveAdminContent(nextContent)
      setContent(nextContent)
      if (editingId === vehicle.id) resetForm()
      setNotice(`Removed ${vehicle.year} ${vehicle.name} from both galleries.`)
    } catch (err) {
      setError(`Could not remove this car. ${err.message}`)
    } finally { setBusy(false) }
  }

  const disconnect = () => {
      logoutAdmin().catch(() => {})
      setPassword(''); setContent(null); setConnected(false); resetForm(); setError(''); setNotice('')
  }

  return <>
    <section className="page-hero page-hero-admin"><div className="container page-hero-content"><span className="eyebrow">PRIVATE SITE MANAGEMENT</span><h1>Manage the car<br/><em>gallery.</em></h1><p>Add, edit or remove cars. Your changes update the Home gallery, vehicle listings and Place an Order together.</p></div></section>
    <section className="section section-pad admin-section"><div className="container">
      {!connected ? <div className="admin-connect-card">
        <div className="admin-card-icon"><LockKeyhole/></div>
        <h2>Admin sign in</h2>
        <p>Sign in with the administrator username and password provided by the website owner. Changes are stored centrally and shared across the website.</p>
        <form className="contact-form admin-token-form" onSubmit={connect}>
          <label>Username<input autoComplete="username" value={username} onChange={event => setUsername(event.target.value)} required /></label>
          <label>Password<input type="password" autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} required /></label>
          {error && <p className="admin-message admin-error" role="alert">{error}</p>}
          <button className="btn btn-primary form-submit" type="submit" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
        </form>
      </div> : <>
        <div className="admin-heading-row"><div><span className="eyebrow">SHARED WEBSITE CONTENT</span><h2>Vehicle gallery</h2><p>Each car appears in the Home gallery and Place an Order.</p></div><button className="btn btn-outline" type="button" onClick={disconnect}><LogOut size={16}/> Sign out</button></div>
        <div className="admin-layout">
          <form className="contact-form admin-vehicle-form" onSubmit={saveVehicle}>
            <div className="admin-form-heading"><span className="admin-card-icon"><ImagePlus/></span><div><h3>{editingId === null ? 'Add a car' : 'Edit car'}</h3><p>New photos appear on Home and Place an Order.</p></div></div>
            <div className="form-row"><label>Year *<input required inputMode="numeric" value={form.year} onChange={event => setForm({ ...form, year: event.target.value })} placeholder="2025"/></label><label>Car name *<input required value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} placeholder="Toyota Corolla LE"/></label></div>
            <div className="form-row"><label>Trim / transmission<input value={form.trim} onChange={event => setForm({ ...form, trim: event.target.value })} placeholder="LE • Automatic"/></label><label>Market<select value={form.origin} onChange={event => setForm({ ...form, origin: event.target.value })}><option>USA</option><option>Dubai</option><option>Germany</option><option>Nigeria</option><option>Other</option></select></label></div>
            <div className="form-row"><label>Fuel type<select value={form.fuel} onChange={event => setForm({ ...form, fuel: event.target.value })}><option>Petrol</option><option>Diesel</option><option>Hybrid</option><option>Electric</option><option>Petrol/Diesel</option></select></label><label>Transmission<input value={form.transmission} onChange={event => setForm({ ...form, transmission: event.target.value })} placeholder="Automatic"/></label></div>
            <label>Car photo {editingId === null ? '*' : '(choose a new image to replace the current one)'}<input type="file" accept="image/jpeg,image/png,image/webp" required={editingId === null && !form.image} onChange={event => setImageFile(event.target.files?.[0] || null)}/><small className="admin-field-note">JPG, PNG or WebP, up to 2.5 MB. {form.image && !imageFile ? 'Current photo is kept unless you select a new one.' : ''}</small></label>
            <label>Description<textarea rows="3" value={form.description} onChange={event => setForm({ ...form, description: event.target.value })} placeholder="A short description of the vehicle."/></label>
            {error && <p className="admin-message admin-error" role="alert">{error}</p>}
            {notice && <p className="admin-message admin-success" role="status"><CheckCircle2 size={17}/>{notice}</p>}
            <div className="admin-form-actions"><button className="btn btn-primary" type="submit" disabled={busy}><Save size={16}/>{busy ? 'Saving…' : 'Save to website'}</button>{editingId !== null && <button className="btn btn-outline" type="button" onClick={resetForm}><X size={16}/> Cancel edit</button>}</div>
          </form>
          <div className="admin-vehicle-list"><div className="admin-list-heading"><div><h3>Current cars</h3><p>{content.vehicles.length} cars in both galleries</p></div><button className="btn btn-outline" type="button" onClick={resetForm}><Plus size={16}/> Add car</button></div>
            {sortedVehicles.map(vehicle => <article className="admin-vehicle-row" key={vehicle.id}><img src={vehicle.image} alt={`${vehicle.year} ${vehicle.name}`}/><div className="admin-vehicle-copy"><small>{vehicle.year} • {vehicle.origin}</small><strong>{vehicle.name}</strong></div><button type="button" aria-label={`Edit ${vehicle.name}`} onClick={() => editVehicle(vehicle)} disabled={busy}><Pencil size={16}/></button><button type="button" aria-label={`Delete ${vehicle.name}`} onClick={() => deleteVehicle(vehicle)} disabled={busy}><Trash2 size={16}/></button></article>)}
          </div>
        </div>
        <p className="admin-disclaimer">Removing a car removes it from the website galleries. Previously uploaded photos remain in your image storage.</p>
      </>}
    </div></section>
  </>
}
