import { createSession, denyMethod, safeEqual, setSessionCookie } from '../_adminAuth.js'

export default function handler(req, res) {
  if (req.method !== 'POST') return denyMethod(res, 'POST')
  const username = process.env.ADMIN_USERNAME
  const password = process.env.ADMIN_PASSWORD
  if (!username || !password || !process.env.ADMIN_SESSION_SECRET) {
    return res.status(503).json({ error: 'Admin login is not configured. Set the admin secrets in Vercel.' })
  }
  if (!safeEqual(req.body?.username, username) || !safeEqual(req.body?.password, password)) {
    return res.status(401).json({ error: 'The username or password is incorrect.' })
  }
  setSessionCookie(res, createSession(username))
  return res.status(200).json({ authenticated: true })
}
