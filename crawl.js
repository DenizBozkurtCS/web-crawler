const { JSDOM } = require('jsdom')

function normalizeURL(url){
    urlObj = new URL(url)
    let fullPath = `${urlObj.hostname}${urlObj.pathname}`
    if(fullPath[fullPath.length-1] == '/'){
        fullPath = fullPath.slice(0,-1)
    }
    return fullPath
}

function getURLsFromHTML(htmlBody, baseURL){
    const dom = new JSDOM(htmlBody);
    const links = dom.window.document.querySelectorAll('a')
    const urlsFound = []

    for(let i = 0; i < links.length; i++){
        if(links[i].href[0] === '/'){
            urlsFound.push(`${baseURL}${links[i].href}`)
        } else {
            urlsFound.push(links[i].href)
        }
    }
    return urlsFound
}

function getDomain(url){
    urlObj = new URL(url)
    return urlObj.hostname
}

async function crawlPage(baseURL, currentURL, pages){
    currentURLNormalized = normalizeURL(currentURL)
    baseURLNormalized = normalizeURL(baseURL)

    if(getDomain(baseURL) != getDomain(currentURL)){
        return pages
    }

    if(currentURLNormalized in pages){
        pages[currentURLNormalized]++
        return pages
    } 

    if(baseURLNormalized === currentURLNormalized){
            pages[currentURLNormalized] = 0
    } else {
            pages[currentURLNormalized] = 1
    }   

    let htmlBody = ''

    try{
        console.log(`Starting fetch on ${currentURL}`)
        const response = await fetch(currentURL);
        if (response.status >  400){
            console.log(`Error code: ${response.status}`)
            return pages
        }
        const contentType = response.headers.get('content-type')
        if (!contentType.includes('text/html')){
            console.log('Content type is not text/html')
            return pages
        }
        htmlBody = await response.text()
            
    }
    catch (err) {
        console.log(err.message)
    }

    nextURLs = getURLsFromHTML(htmlBody, baseURL)
    for(nextURL of nextURLs){
        pages = await crawlPage(baseURL, nextURL, pages)
    }
    return pages
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}
