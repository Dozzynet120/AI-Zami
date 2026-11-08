import { createHmac, timingSafeEqual } from 'node:crypto'

const COOKIE_NAME = 'zami_admin_session'
const SESSION_AGE_SECONDS = 60 * 60 * 8

function secret() {
  const value = process.env.ADMIN_SESSION_SECRET
  if (!value || value.length < 32) throw new Error('ADMIN_SESSION_SECRET must be set to at least 32 characters.')
  return value
}

function signature(payload) {
  return createHmac('sha256', secret()).update(payload).digest('base64url')
}

export function safeEqual(left, right) {
  const a = Buffer.from(String(left || ''))
  const b = Buffer.from(String(right || ''))
  return a.length === b.length && timingSafeEqual(a, b)
}

export function createSession(username) {
  const payload = Buffer.from(JSON.stringify({ username, expires: Date.now() + SESSION_AGE_SECONDS * 1000 })).toString('base64url')
  return `${payload}.${signature(payload)}`
}

export function isAdmin(req) {
  try {
    const cookie = req.headers.cookie?.split(';').map(part => part.trim()).find(part => part.startsWith(`${COOKIE_NAME}=`))
    if (!cookie) return false
    const [payload, supplied] = decodeURIComponent(cookie.slice(COOKIE_NAME.length + 1)).split('.')
    if (!payload || !supplied) return false
    const expected = Buffer.from(signature(payload))
    const actual = Buffer.from(supplied)
    if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return false
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString())
    return session.username === process.env.ADMIN_USERNAME && session.expires > Date.now()
  } catch {
    return false
  }
}

export function setSessionCookie(res, value, maxAge = SESSION_AGE_SECONDS) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=${encodeURIComponent(value)}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${maxAge}${secure}`)
}

export function denyMethod(res, method) {
  res.setHeader('Allow', method)
  return res.status(405).json({ error: 'Method not allowed.' })
}

export function requireAdmin(req, res) {
  if (isAdmin(req)) return true
  res.status(401).json({ error: 'Please sign in as an administrator.' })
  return false
}

