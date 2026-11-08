import { del, list, put } from '@vercel/blob'
import { randomUUID } from 'node:crypto'
import { defaultSiteContent } from '../src/data/siteContent.js'

const CONTENT_PREFIX = 'site-content/'

export async function readStoredContent() {
  const { blobs } = await list({ prefix: CONTENT_PREFIX, limit: 1000 })
  const newest = blobs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))[0]
  if (!newest) return defaultSiteContent
  const response = await fetch(newest.url, { cache: 'no-store' })
  if (!response.ok) throw new Error('Could not load the shared car listings from Vercel Blob.')
  const content = await response.json()
  if (!Array.isArray(content.vehicles) || !Array.isArray(content.gallery)) {
    throw new Error('The saved car listings are not in the expected format.')
  }
  return content
}

export async function writeStoredContent(content) {
  const filename = `${CONTENT_PREFIX}${Date.now()}-${randomUUID()}.json`
  await put(filename, JSON.stringify(content), {
    access: 'public',
    addRandomSuffix: false,
    contentType: 'application/json; charset=utf-8',
    cacheControlMaxAge: 60,
  })
  const { blobs } = await list({ prefix: CONTENT_PREFIX, limit: 1000 })
  const previousSnapshots = blobs
    .filter(blob => blob.pathname !== filename)
    .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
    .slice(4)
  if (previousSnapshots.length) await del(previousSnapshots.map(blob => blob.url))
}
