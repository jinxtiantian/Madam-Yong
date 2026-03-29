const CACHE = "tp-tracker-v1";
const ASSETS = ["/Madam-Yong/", "/Madam-Yong/index.html", "/Madam-Yong/manifest.json"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  // Always go to network for Google Script API calls
  if (e.request.url.includes("script.google.com")) return;
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
