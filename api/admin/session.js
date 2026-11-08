import { denyMethod, isAdmin } from '../_adminAuth.js'

export default function handler(req, res) {
  if (req.method !== 'GET') return denyMethod(res, 'GET')
  return res.status(200).json({ authenticated: isAdmin(req) })
}
