const express = require('express')
const router = express.Router()
const { handleGenerateNewShortenURL } = require('../controllers/url')

router.post('/', handleGenerateNewShortenURL)

module.exports = router