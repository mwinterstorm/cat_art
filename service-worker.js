const CACHE_NAME = 'cat-gallery-cache-v1';
const urlsToCache = [
  'index.html',
  'style.css',
  'script.js',
  'images/image1.jpeg',
  'images/image3.jpeg',
  'images/image2.jpeg',
  'images/image4.jpeg',
  'images/image5.jpeg',
  'images/image6.jpeg',
  'images/image7.jpeg',
  'images/image8.jpeg',
  'images/image9.jpeg',
  'images/image10.jpeg',
  'images/image11.jpeg',
  'images/image12.jpeg',
  'images/image13.jpeg',
  'images/image14.jpeg',
  'images/image15.jpeg',
  'images/image16.jpeg',
  'images/image17.jpeg',
  'images/image18.jpeg',
  'images/image19.jpeg',
  'images/image20.jpeg',
  'images/image21.jpeg'
  //... add all your image URLs here...
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});