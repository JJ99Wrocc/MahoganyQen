// public/service-worker.js
const CACHE_NAME = 'mahogany-qen-cache-v1';

// Pliki do przechwycenia
self.addEventListener('fetch', (event) => {
  // Interesują nas tylko zdjęcia WebP i czcionki
  if (event.request.destination === 'image' || event.request.destination === 'font') {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          const fetchedResponse = fetch(event.request).then((networkResponse) => {
            // Zapisujemy nową kopię w tle dla następnego razu
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });

          // Zwracamy z cache jeśli mamy, jak nie to z sieci
          return cachedResponse || fetchedResponse;
        });
      })
    );
  }
});

// Czyszczenie starego cache przy aktualizacji strony
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});