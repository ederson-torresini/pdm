const version = "0.1.4";
const cacheName = "boidacarapreta-pdm"
const precacheResources = [
  "./",
  "./index.html",
  "./logo-128.png",
  "./logo-192.png",
  "./logo-256.png",
  "./logo-384.png",
  "./logo-512.png"
];

self.addEventListener("install", event => {
  console.log("Service worker install event!");
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(precacheResources).then(() => self.skipWaiting());
    })
  );
});

self.addEventListener("activate", event => {
  console.log("Service worker activate event!");
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  console.log("Fetch intercepted for: ", event.request.url);
  event.respondWith(
    caches
      .open(cacheName)
      .then(cache => cache.match(event.request, { ignoreSearch: true }))
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
