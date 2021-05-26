const express = require('express')
const path = require('path')
const router = new express.Router()
const Voter = require('../models/voter')
const President = require('../models/president')
const gensec = require('../models/gensec')
const Cultsec = require('../models/cultsec')
const Sportsec = require('../models/sportsec')
const auth = require('../middleware/voter')

router.use('/', express.static(path.join(__dirname, '..', 'static', 'vote')));

// 0. Information Page
router.get('/info', (req, res) => {
    res.send({"response": "Accepted"})
})

// 1. vote page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'static', 'vote', 'ballot.html'))
})

// 2. vote route
router.post('/', auth, (req, res) => {
    const president = req.body.president
    const gensec = req.body.gensec
    const cultsec = req.body.cultsec
    const sportsec = req.body.sportsec
    res.send({"response": "Accepted"})
})

module.exports = router