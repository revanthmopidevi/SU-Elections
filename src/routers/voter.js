const express = require('express')
const path = require('path')
const router = new express.Router()
const President = require('../models/president')
const Gensec = require('../models/gensec')
const Cultsec = require('../models/cultsec')
const Sportsec = require('../models/sportsec')
const Secretary = require('../models/secretary')
const JSecretary = require('../models/jsecretary')
const Treasurer = require('../models/treasurer')
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

router.get('/club', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'static', 'vote', 'ballot_club.html'))
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

router.post('/club', auth, async (req, res) => {
    try {
        if (req.body.secretary) {
            const secretary = await Secretary.findOne({name: req.body.secretary})
            secretary.votes += 1
            await secretary.save()
        }

        if (req.body.jsecretary) {
            const jsecretary = await JSecretary.findOne({name: req.body.jsecretary})
            jsecretary.votes += 1
            await jsecretary.save()
        }

        if (req.body.secretary) {
            const treasurer = await Treasurer.findOne({name: req.body.treasurer})
            treasurer.votes += 1
            await treasurer.save()
        }

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