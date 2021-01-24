importScripts("js/sw.utils.js");

const STATIC_CACHE = "static-v2";
const DYNAMIC_CACHE = "dynamic-v1";
const INMUTABLE_CACHE = "inmutable-v1";

const APP_SHELL = [
    // "/",
    "index.html",
    "css/style.css",
    "img/favicon.ico",
    "img/avatars/spiderman.jpg",
    "img/avatars/ironman.jpg",
    "img/avatars/wolverine.jpg",
    "img/avatars/thor.jpg",
    "js/app.js",
    "js/sw.utils.js"
]

const APP_SHELL_INMUTABLE = [
    "https://fonts.googleapis.com/css?family=Quicksand:300,400",
    "https://fonts.googleapis.com/css?family=Lato:400,300",
    "https://use.fontawesome.com/releases/v5.3.1/css/all.css",
    "css/animate.css",
    "js/libs/jquery.js"
]

self.addEventListener("install", e => {

    const cacheStatic = caches.open(STATIC_CACHE).then(cache => cache.addAll(APP_SHELL));

    const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache => cache.addAll(APP_SHELL_INMUTABLE));

    e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));
})

self.addEventListener("activate", e => {

    const responseActiveted = caches.keys().then(keys => {
        keys.map(el => {
            if (el !== STATIC_CACHE && el.includes('static')) {
                return caches.delete(el);
            }
        })
    })
    e.waitUntil(responseActiveted);

})

self.addEventListener("fetch", e => {

    const response = caches.match(e.request).then(res => {

        if (res) {
            return res;
        }
        else {
            return fetch(e.request).then(newRespon => {
                return regreshCacheDynamic(DYNAMIC_CACHE, e.request, newRespon);
            })
        }
    })

    e.respondWith(response);
})