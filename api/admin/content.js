import { denyMethod, requireAdmin } from '../_adminAuth.js'
import { readStoredContent, writeStoredContent } from '../_contentStore.js'

export default async function handler(req, res) {
  if (!['GET', 'PUT'].includes(req.method)) return denyMethod(res, 'GET, PUT')
  if (!requireAdmin(req, res)) return
  try {
    if (req.method === 'GET') {
      return res.status(200).json(await readStoredContent())
    }
    const content = req.body
    if (!content || !Array.isArray(content.vehicles) || !Array.isArray(content.gallery)) {
      return res.status(400).json({ error: 'Vehicle and gallery data are required.' })
    }
    await writeStoredContent(content)
    return res.status(200).json({ saved: true })
  } catch (error) {
    return res.status(503).json({ error: error.message || 'Could not save shared vehicle data to Vercel Blob.' })
  }
}
