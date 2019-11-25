// Файлы, которые потребуются офлайн
const dependencies = ['/css/*.css', '/files/assets/**/*'];

// Фаза установки, сервис-воркер еще не активен
self.addEventListener('install', event => {
    console.log('--- service worker installing');
    // Загружаем все файлы, которые потребуются для offline-режима
    const loadDependencies = self.caches
        .open('myApp')
        .then(cache => cache.addAll(dependencies));

    // Сервис-воркер перейдет к следующему этапу своего цикла,
    // когда все необходимые файлы будут загружены и закэшированы
    event.waitUntil(loadDependencies);
});

self.addEventListener('activate', event => {
    console.log('--- service worker ready to handle fetchese!');
});

self.addEventListener('fetch', event => {
    console.log('--- service worker ready to handle fetchese!');
});
