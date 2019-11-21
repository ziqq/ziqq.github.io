importScripts("/precache-manifest.db66c47552a24565f3485e843708082b.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

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

