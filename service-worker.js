importScripts("/precache-manifest.70daff490c57913fae3f353522c3cf43.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

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

