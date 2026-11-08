import { vehicles as defaultVehicles } from './vehicles.js'

export const defaultGallery = [
  'WhatsApp Image 2026-11-07 at 5.55.47 AM (1).jpeg', 'WhatsApp Image 2026-11-07 at 5.55.47 AM (2).jpeg',
  'WhatsApp Image 2026-11-07 at 5.55.48 AM (1).jpeg', 'WhatsApp Image 2026-11-07 at 5.55.48 AM (2).jpeg',
  'WhatsApp Image 2026-11-07 at 5.55.48 AM (3).jpeg', 'WhatsApp Image 2026-11-07 at 5.55.48 AM.jpeg',
  'WhatsApp Image 2026-11-07 at 5.55.49 AM (1).jpeg', 'WhatsApp Image 2026-11-07 at 5.55.49 AM (3).jpeg',
  'WhatsApp Image 2026-11-07 at 5.55.49 AM.jpeg', 'WhatsApp Image 2026-11-07 at 5.55.50 AM (1).jpeg',
  'WhatsApp Image 2026-11-07 at 5.55.51 AM (1).jpeg', 'WhatsApp Image 2026-11-07 at 5.55.51 AM.jpeg',
  'WhatsApp Image 2026-11-07 at 5.55.52 AM (1).jpeg', 'WhatsApp Image 2026-11-07 at 5.55.52 AM (2).jpeg', 'WhatsApp Image 2026-11-07 at 5.55.52 AM.jpeg',
  'WhatsApp Image 2026-11-07 at 5.55.53 AM (1).jpeg', 'WhatsApp Image 2026-11-07 at 5.55.53 AM.jpeg',
  'WhatsApp Image 2026-11-07 at 5.55.54 AM.jpeg', 'WhatsApp Image 2026-11-07 at 5.55.56 AM.jpeg',
]

export const defaultSiteContent = { vehicles: defaultVehicles, gallery: defaultGallery }

export async function loadSiteContent() {
  try {
    const shared = await fetch('/api/content', { cache: 'no-store' })
    if (shared.ok) {
      const content = await shared.json()
      if (Array.isArray(content.vehicles) && Array.isArray(content.gallery)) return content
    }
    const response = await fetch('/site-content.json', { cache: 'no-store' })
    if (!response.ok) throw new Error('Site content is unavailable')
    const content = await response.json()
    return {
      vehicles: Array.isArray(content.vehicles) ? content.vehicles : defaultVehicles,
      gallery: Array.isArray(content.gallery) ? content.gallery : defaultGallery,
    }
  } catch {
    return defaultSiteContent
  }
}
