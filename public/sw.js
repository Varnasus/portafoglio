// Self-destruct service worker.
//
// A previous version of this site shipped a full page-caching service
// worker. It is no longer registered by the app, but browsers that
// visited the old version still have it installed and will keep
// intercepting requests forever — caching stale HTML and causing
// hydration mismatches.
//
// This replacement unregisters itself on activation, clears every
// cache it owns, and releases control of all clients so the next
// request goes straight to the network.

self.addEventListener("install", () => {
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      try {
        const cacheNames = await caches.keys()
        await Promise.all(cacheNames.map((name) => caches.delete(name)))
      } catch (err) {
        console.warn("sw self-destruct: cache cleanup failed", err)
      }

      try {
        await self.registration.unregister()
      } catch (err) {
        console.warn("sw self-destruct: unregister failed", err)
      }

      try {
        const clients = await self.clients.matchAll({ type: "window" })
        clients.forEach((client) => client.navigate(client.url))
      } catch (err) {
        console.warn("sw self-destruct: client refresh failed", err)
      }
    })()
  )
})

// Pass every request straight through to the network.
self.addEventListener("fetch", () => {})
