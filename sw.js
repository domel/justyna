"use strict";

const CACHE_NAME = "testy-z-ustaw-v5";
const APP_FILES = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/csv.js",
  "./js/app.js",
  "./js/pwa.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
  "./materialy-do-nauki/Najwazniejsze.png",
  "./materialy-do-nauki/Kodeks postępowania.png",
  "./materialy-do-nauki/kpo-praktyka.png",
  "./materialy-do-nauki/Ustawa o pracownikach samorzadowych.png",
  "./materialy-do-nauki/Ustawa o samorzadzie.png",
  "./materialy-do-nauki/Ustawa o lasach.png",
  "./materialy-do-nauki/Ustawa o ochronie przyrody.png",
  "./materialy-do-nauki/Formy ochrony przyrody.png",
  "./materialy-do-nauki/Ustawa OOŚ.png",
  "./materialy-do-nauki/DŚU a OOŚ.png",
  "./materialy-do-nauki/KIP a raport OOŚ.png",
  "./data/pytania_Kodeks_postepowania_administracyjnego_KPA.csv",
  "./data/pytania_ustawa_informacja_srodowisko_OOS.csv",
  "./data/pytania_ustawa_o_lasach.csv",
  "./data/pytania_ustawa_o_ochronie_przyrody.csv",
  "./data/pytania_ustawa_o_pracownikach_samorzadowych.csv",
  "./data/pytania_ustawa_o_samorzadzie_gminnym.csv"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put("./index.html", copy));
          return response;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cachedResponse => {
      const networkResponse = fetch(request)
        .then(response => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cachedResponse);

      return cachedResponse || networkResponse;
    })
  );
});
