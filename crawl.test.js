const { normalizeURL, getURLsFromHTML} = require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('normalizeURL protocol', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
  })

test('normalizeURL slash', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
    const input = 'https://BLOG.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL http', () => {
    const input = 'http://BLOG.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative to absolute', () => {
    const htmlBody = '<html><body><a href="/resources/knowledgebase/"><span>Go to Boot.dev</span></a></body></html>'
    const baseURL = 'boot.dev'
    const actual= getURLsFromHTML(htmlBody, baseURL)
    const expected = ['boot.dev/resources/knowledgebase/']
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML contains multiple links', () => {
    const htmlBody = '<html><body><a href="/resources/knowledgebase/"><a href="boot.dev/web-crawler"><span>Go to Boot.dev</span></a></body></html>'
    const baseURL = 'boot.dev'
    const actual = getURLsFromHTML(htmlBody, baseURL)
    const expected = ['boot.dev/resources/knowledgebase/', 'boot.dev/web-crawler']
    expect(actual).toEqual(expected)
}) 