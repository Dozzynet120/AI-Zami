const OWNER = 'Dozzynet120'
const REPOSITORY = 'AI-Zami'
const BRANCH = 'main'
const CONTENT_PATH = 'public/site-content.json'

function apiUrl(path) {
  return `https://api.github.com/repos/${OWNER}/${REPOSITORY}/${path}`
}

async function githubRequest(path, token, options = {}) {
  const response = await fetch(apiUrl(path), {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  })
  const result = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(result.message || `GitHub request failed (${response.status})`)
  return result
}

function decodeUtf8Base64(value) {
  const binary = atob(value.replace(/\s/g, ''))
  return new TextDecoder().decode(Uint8Array.from(binary, char => char.charCodeAt(0)))
}

function encodeUtf8Base64(value) {
  const bytes = new TextEncoder().encode(value)
  let binary = ''
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000))
  }
  return btoa(binary)
}

export async function getSiteContent(token) {
  const file = await githubRequest(`contents/${CONTENT_PATH}?ref=${BRANCH}`, token)
  return { content: JSON.parse(decodeUtf8Base64(file.content)), sha: file.sha }
}

export async function saveSiteContent(token, content, sha) {
  const result = await githubRequest(`contents/${CONTENT_PATH}`, token, {
    method: 'PUT',
    body: JSON.stringify({
      message: 'Update vehicle gallery from site admin',
      content: encodeUtf8Base64(JSON.stringify(content, null, 2)),
      sha,
      branch: BRANCH,
    }),
  })
  return result.content.sha
}

export async function uploadVehicleImage(token, file) {
  const safeName = file.name.normalize('NFKD').replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/^-+|-+$/g, '') || 'vehicle-image.jpg'
  const path = `public/images/uploads/${Date.now()}-${safeName}`
  const base64 = await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Could not read the selected image.'))
    reader.onload = () => resolve(String(reader.result).split(',')[1])
    reader.readAsDataURL(file)
  })
  const uploaded = await githubRequest(`contents/${path}`, token, {
    method: 'PUT',
    body: JSON.stringify({
      message: `Add vehicle image ${safeName}`,
      content: base64,
      branch: BRANCH,
    }),
  })
  return `/${uploaded.content.path.replace(/^public\//, '')}`
}
