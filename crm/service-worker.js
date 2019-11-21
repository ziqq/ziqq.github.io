importScripts("/crm/precache-manifest.ad1f9d11b37af4474199a85da166f8a2.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open('beautybox').then(cache => {
            return cache.addAll(['./offline.html']);
        })
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return (
                response ||
                fetch(e.request).catch(() => caches.match('offline.html'))
            );
        })
    );
});

