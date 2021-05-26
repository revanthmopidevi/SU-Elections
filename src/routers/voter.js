const express = require('express')
const path = require('path')
const router = new express.Router()
const Voter = require('../models/voter')
const auth = require('../middleware/voter')

router.use('/login', express.static(path.join(__dirname, '..', 'static', 'login')));

// 0. Information Page
router.get('/', (req, res) => {
    res.send({"response": "Accepted"})
})

// 1. login page
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'static', 'login', 'login.html'))
})

// 2. login route
router.post('/login', (req, res) => {
    console.log(req.body.username)
    res.send({"response": "Accepted"})
})

module.exports = router