function printReport(pages){
    console.log('Starting report')
    const sorted = Object.fromEntries(
        (Object.entries(pages).sort(([,a],[,b]) => a-b)).reverse()
    )
    for(const [key, value] of Object.entries(sorted)) {
        console.log(`Found ${value} internal links to ${key}`)
    }
}

module.exports = {
    printReport
}