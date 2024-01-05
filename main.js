const { argv } = require('node:process');
const { getURLsFromHTML, crawlPage, normalizeURL } = require('./crawl.js')
const { printReport } = require('./report.js')

async function main(){
    if(argv.length < 3){
        console.log('Not enough CLI arguments!')
        return
    } else if(argv.length > 3) {
        console.log('Too many arguments!')
        return
    } 
    
    console.log(`Crawl is starting at ${argv[2]}`)
    const pages = await crawlPage(argv[2], argv[2], {})
    printReport(pages)

}

main()