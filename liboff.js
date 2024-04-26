// An attempt to make the site work even without internet.
// Funny thing, because the entire DataBase is in a JSON, I could make (almost) all of the site work without Internet, I just need to place a warning in the footer that the user is offline. 
const cacheBar = "cacheBar";
const bar = [
  "/WebAppProj",
  "index.html",
  "style.css",
  "libext.js",
  "libret.js",
  "liboff.js",
  "archive.js",
  "articles.js",
  "archives.html",
  "archives.js",
  "contact.html",
  "hot.html",
  "info.html",
  "legal.html",
  "privacy.html",
  "search.html",
  "search.js",
  "submit.html",
  "terms.html",
  "viewer.html",
  "viewer.html?*",
  "viewer.js",
  "favicon.svg",
  "manifest.json"
];

self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open(cacheBar).then(function(cache) {

      // Clear Old CacheBar if Exists
      for (stuff of bar) if (cache.match(stuff).then(function(is){reutrn is.ok;})) {
        cache.delete(stuff);
      }
      
      
      return cache.addAll(bar);
    })
  )
})

self.addEventListener("fetch", function(e) {
  e.respondWith(
    caches.match(e.request, {"ignoreSearch": true}).then(function(response) {
      return response || (fetch(e.request) || fetch(response.url))
    })
  )
})

