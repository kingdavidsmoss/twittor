function regreshCacheDynamic(dymanicCache, req, res) {
    if (res.ok) {
        caches.open(dymanicCache).then(cache => {
            cache.put(req, res.clone());
            return res.clone();
        })
    } else {
        res;
    }
}