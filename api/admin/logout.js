import { denyMethod, setSessionCookie } from '../_adminAuth.js'

export default function handler(req, res) {
  if (req.method !== 'POST') return denyMethod(res, 'POST')
  setSessionCookie(res, '', 0)
  return res.status(200).json({ authenticated: false })
}
