function normalize_url(url){
    urlObj = new URL(url)
    return urlObj.hostname
}

