/* Pr8note offline shell — small, safe, cache-first with background refresh. */
const CACHE = 'pr8note-v5'

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const request = event.request
  if (request.method !== 'GET') return
  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  // Never cache an OAuth callback: codes are single-use and must not be replayed.
  if (url.searchParams.has('code') || url.searchParams.has('state') || url.searchParams.has('error')) {
    return
  }

  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      if (request.mode === 'navigate') {
        try {
          // Toujours du HTML frais : sinon un index.html en cache peut pointer
          // vers d'anciens fichiers JS, eux aussi servis depuis le cache.
          const response = await fetch(request, { cache: 'no-store' })
          if (response && response.ok) cache.put(request, response.clone()).catch(() => {})
          return response
        } catch {
          return (await cache.match(request)) || (await cache.match('./index.html')) || Response.error()
        }
      }

      const cached = await cache.match(request)
      const network = fetch(request)
        .then((response) => {
          if (response && response.ok) cache.put(request, response.clone())
          return response
        })
        .catch(() => cached)
      return cached || network
    }),
  )
})
