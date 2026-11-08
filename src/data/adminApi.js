async function request(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: { ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...options.headers },
  })
  const result = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(result.error || `Request failed (${response.status}).`)
  return result
}

export async function checkAdminSession() {
  return (await request('/api/admin/session')).authenticated
}

export async function loginAdmin(username, password) {
  return request('/api/admin/login', { method: 'POST', body: JSON.stringify({ username, password }) })
}

export async function logoutAdmin() {
  return request('/api/admin/logout', { method: 'POST' })
}

export async function readAdminContent() {
  return request('/api/admin/content')
}

export async function saveAdminContent(content) {
  return request('/api/admin/content', { method: 'PUT', body: JSON.stringify(content) })
}

export async function uploadAdminImage(file) {
  const base64 = await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Could not read the selected image.'))
    reader.onload = () => resolve(String(reader.result).split(',')[1])
    reader.readAsDataURL(file)
  })
  const result = await request('/api/admin/upload', {
    method: 'POST',
    body: JSON.stringify({ file: base64, type: file.type }),
  })
  return result.image
}
