// An attempt to make the site work even without internet.
// Funny thing, because the entire DataBase is in a JSON, I could make (almost) all of the site work without Internet, I just need to place a warning in the footer that the user is offline. 
const cacheBar = "cacheBar";
const bar = [
  "/WebAppProj",
  "index.html",
  "style.css",
  "libext.js",
  "libret.js",
  //"liboff.js",
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

// Installation Caching
self.addEventListener("install", async function(e) {
  e.waitUntil(
    // Open Cachebar
    caches.open(cacheBar).then(async function(cache) {

      // Clear Old CacheBar if Exists
      for (stuff of bar) if (await cache.match(stuff).then(function(result) { try { return result.ok; } catch (e) { return false; } })) {
        cache.delete(stuff);
      }
      
      // Add Pages to CacheBar
      return cache.addAll(bar);
    })
  )
})

// Use the Cachebar

self.addEventListener("fetch", async function(e) {
  e.respondWith(
    // Search Cachebar
 caches.match(e.request, {"ignoreSearch": true}).then(async function(response) {
      // Caching 2.0 (Dynamic Cache Use)
      try { // Try and not use cachebar
        let result; let i = await (await fetch(e.request).then((r) => { if (r.ok) {result = r; return r;}}) || await fetch(response.url).then((r) => { if (r.ok) {result = r; return r;}})); if (result.ok) return result; else throw new Error("");
      } catch (err) { // Catch the system in offline mode, then retrieve from cachebar
        try {
          if (response.url.slice(0, ("https://621365.github.io/WebAppProj/").length) == "https://621365.github.io/WebAppProj/") return response; else return (fetch(e.request) || fetch(response.url));
        } catch (e) {
          // fix for offline?
          return (fetch(e.request) || fetch(response.url));
        }
        if (!(response instanceof Response)) return (fetch(e.request) || fetch(response.url)); else if (result instanceof Response) return response; else return (fetch(e.request) || fetch(response.url));
      }


      // Simplified Version
      // return response || (fetch(e.request) || fetch(response.url));
    //console.log(e);
    // In the rare case that an async error occurs
    return (fetch(e.request) || fetch(response.url));
  
    }))
  });
