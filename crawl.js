function normalizeURL(url){
    urlObj = new URL(url)
    let fullPath = `${urlObj.hostname}${urlObj.pathname}`
    if(fullPath[fullPath.length-1] == '/'){
        fullPath = fullPath.slice(0,-1)
    }
    return fullPath
}

module.exports = {
    normalizeURL
}
