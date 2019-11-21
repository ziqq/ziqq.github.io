importScripts("/precache-manifest.925959261fa5effb3a3f314c8a335848.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

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

