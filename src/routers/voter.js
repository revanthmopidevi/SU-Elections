const express = require('express')
const path = require('path')
const router = new express.Router()
const Voter = require('../models/voter')
const auth = require('../middleware/voter')

router.use(express.static(path.join(__dirname, '..', 'static')));

// 0. Information Page
router.get('/', (req, res) => {
    // res.sendFile(__dirname + '/../static/index.html')
    res.sendFile(path.resolve(__dirname + '/index.html'))
})

module.exports = router