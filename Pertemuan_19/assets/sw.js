self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('berkah-store')
      .then((cache) => {
        return cache.addAll(['./', './index.html', './style.css', './script.js']);
      })
      .catch((error) => {
        console.error('Gagal menyimpan cache saat install:', error);
      })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(e.request).catch((error) => {
          console.error('Gagal mengambil resource dari jaringan:', error);
          return new Response('Konten tidak tersedia secara offline.', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({ 'Content-Type': 'text/plain' })
          });
        });
      })
  );
});

// --- BAGIAN REGISTRASI SERVICE WORKER ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then((reg) => console.log('Service Worker terdaftar:', reg.scope))
            .catch((err) => console.error('Service Worker gagal didaftarkan:', err));
    });
}

// --- BAGIAN LOGIKA APLIKASI ANDA ---
const uploadedPhotos = [];

function handleFiles(files) {
    // ... kode handleFiles Anda
}

function renderThumbnails() {
    // ... kode renderThumbnails Anda
}