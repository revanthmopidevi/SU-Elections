const express = require('express')
const path = require('path')
const router = new express.Router()
const President = require('../models/president')
const Gensec = require('../models/gensec')
const Cultsec = require('../models/cultsec')
const Sportsec = require('../models/sportsec')
const VoterMaster = require('../models/voterMaster')
const auth = require('../middleware/voter')

router.use('/', express.static(path.join(__dirname, '..', 'static', 'vote')));

// 0. Information Page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'static', 'vote', 'info.html'))
})

// 1. vote page
router.get('/boys', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'static', 'vote', 'ballot_boys.html'))
})

router.get('/girls', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'static', 'vote', 'ballot_girls.html'))
})


// 2. vote route
router.post('/boys', auth, async (req, res) => {
    if (req.boy === false) {
        return res.status(403).send({
            "text": "Forbidden."
        })
    }

    try {
        const president = await President.findOne({name: req.body.president})
        const gensec = await Gensec.findOne({name: req.body.gensec})
        const cultsec = await Cultsec.findOne({name: req.body.cultsec})
        const sportsec = await Sportsec.findOne({name: req.body.sportsec})

        president.votes += 1
        gensec.votes += 1
        cultsec.votes += 1
        sportsec.votes += 1

        await president.save()
        await gensec.save()
        await cultsec.save()
        await sportsec.save()

        const voterMaster = await VoterMaster.findOne({username: req.body.username})
        voterMaster.voted = true
        await voterMaster.save()

        res.status(200).send({
            "text": "Thank You for Voting."
        })
    } catch (e) {
        res.status(400).send({
            "text": "Internal Server Error."
        })
    }
})

router.post('/girls', auth, async (req, res) => {
    if (req.boy === true) {
        return res.status(403).send({
            "text": "Forbidden."
        })
    }

    try {
        const president = await President.findOne({name: req.body.president})
        const gensec = await Gensec.findOne({name: req.body.gensec})
        const cultsec = await Cultsec.findOne({name: req.body.cultsec})
        const sportsec = await Sportsec.findOne({name: req.body.sportsec})

        president.votes += 1
        gensec.votes += 1
        cultsec.votes += 1
        sportsec.votes += 1

        await president.save()
        await gensec.save()
        await cultsec.save()
        await sportsec.save()

        const voterMaster = await VoterMaster.findOne({username: req.body.username})
        voterMaster.voted = true
        await voterMaster.save()

        res.status(200).send({
            "text": "Thank You for Voting."
        })
    } catch (e) {
        // console.log(e)
        res.status(400).send({
            "text": "Internal Server Error."
        })
    }
})

module.exports = router