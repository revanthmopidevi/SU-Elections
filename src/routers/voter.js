const express = require('express')
const path = require('path')
const router = new express.Router()
const Voter = require('../models/voter')
const auth = require('../middleware/voter')

router.use('/', express.static(path.join(__dirname, '..', 'static', 'login')));

// 0. Information Page
router.get('/info', (req, res) => {
    res.send({"response": "Accepted"})
})

// 1. vote page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'static', 'login', 'login.html'))
})

// 2. vote route
router.post('/', (req, res) => {
    console.log(req.body)
    res.send({"response": "Accepted"})
})

module.exports = router