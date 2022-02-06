self.addEventListener("install", function (event) {
  console.log("Hello world from the Service Worker");
});

self.addEventListener('fetch', e => {
  console.log('Service Worker: Fetching');
  console.log(e);
  e.respondWith(
    fetch(e.request)
    .then(res => res)
    .catch(err => console.error(err))
  );
});
