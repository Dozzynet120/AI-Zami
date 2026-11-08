import { randomUUID } from 'node:crypto'
import { put } from '@vercel/blob'
import { denyMethod, requireAdmin } from '../_adminAuth.js'

const MAX_IMAGE_BYTES = 2_500_000
const TYPES = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' }

export default async function handler(req, res) {
  if (req.method !== 'POST') return denyMethod(res, 'POST')
  if (!requireAdmin(req, res)) return
  const { file, type } = req.body || {}
  const extension = TYPES[type]
  if (!extension || typeof file !== 'string') return res.status(400).json({ error: 'Choose a JPG, PNG or WebP image.' })
  const bytes = Buffer.from(file, 'base64')
  if (!bytes.length || bytes.length > MAX_IMAGE_BYTES) return res.status(413).json({ error: 'Choose an image smaller than 2.5 MB.' })
  try {
    const blob = await put(`vehicles/${randomUUID()}.${extension}`, bytes, {
      access: 'public',
      addRandomSuffix: false,
      contentType: type,
      cacheControlMaxAge: 31536000,
    })
    return res.status(200).json({ image: blob.url })
  } catch (error) {
    return res.status(503).json({ error: error.message || 'Could not upload this image.' })
  }
}
