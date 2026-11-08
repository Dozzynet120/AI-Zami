import { readStoredContent } from './_contentStore.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed.' })
  }
  try {
    return res.status(200).json(await readStoredContent())
  } catch (error) {
    return res.status(503).json({ error: error.message || 'Could not load shared content from Vercel Blob.' })
  }
}
