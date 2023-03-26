const shortid  = require('shortid')
const URL = require('../models/url')
// const { random } = require('nanoid')


async function handleGenerateNewShortenURL(req, res) {
    const body = req.body
    if(!body.url) return res.status(400).json({err: "url is required"})
    const shortId = shortid()
    await URL.create(
        {
            shortId: shortId,
            redirectURL: body.url
        }
    )
    return res.render('home',
    {id:shortId})
    
    return res.json({id:shortId})
}

module.exports = {
    handleGenerateNewShortenURL
}