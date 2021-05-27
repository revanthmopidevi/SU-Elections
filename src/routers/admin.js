const express = require('express')
const router = new express.Router()
const Admin = require('../models/admin')
const Voter = require('../models/voter')
const Voted = require('../models/voted')
const President = require('../models/president')
const Gensec = require('../models/gensec')
const Cultsec = require('../models/cultsec')
const Sportsec = require('../models/sportsec')
const Secretary = require('../models/secretary')
const JSecretary = require('../models/jsecretary')
const Treasurer = require('../models/treasurer')
const auth = require('../middleware/admin')

// 0. create admin
router.post('/addAdmin', auth, async (req, res) => {
    const admin = new Admin(req.body)
    try {
        await admin.save()
        res.send({admin: admin.getPublicProfile()})
    } catch (error) {
        res.status(400).send(error)
    }
})

// 1. login admin
router.post('/login', async (req, res) => {
    try {
        const admin = await Admin.findByCredentials(req.body.username, req.body.password)
        const token = await admin.generateAuthToken()
        res.send({admin: admin.getPublicProfile(), token: token})
    } catch (error) {
        res.status(400).send(error)
    }
})

// 2. logout admin session
router.post('/logout', auth, async (req, res) => {
    try {
        req.admin.tokens = req.admin.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.admin.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// 3. logout all admin sessions
router.post('/logoutAll', auth, async (req, res) => {
    try {
        req.admin.tokens = []
        await req.admin.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// 4. update admin credentials
router.patch('/update', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['username', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOperation) {
        return res.status(400).send({"error": "Invalid update operations."})
    }

    try {
        updates.forEach((update) => {
            req.admin[update] = req.body[update]
        })
        await req.admin.save()
        res.send(req.admin)
    } catch (error) {
        res.status(400).send(error)
    }
})

// 5. add voter
router.post('/addVoter', auth ,async (req, res) => {
    const voter = new Voter(req.body)
    const password = req.body.password
    try {
        await voter.save()
        res.send({voter, password})
    } catch (error) {
        res.status(400).send(error)
    }
})

// 6. remove voter
router.delete('/deleteVoter', auth, async (req, res) => {
    try {
        await Voter.findOneAndDelete({username: req.body.username})
        res.status(200).send()
    } catch (error) {
        res.status(400).send(error)
    }
})

// 8. add President candidate
router.post('/addPresident', auth, async (req, res) => {
    const candidate = new President(req.body)
    try {
        await candidate.save()
        res.status(201).send()
    } catch (error) {
        res.status(400).send(error)
    }
})

// 9. add General Secretary candidate
router.post('/addGensec', auth, async (req, res) => {
    const candidate = new Gensec(req.body)
    try {
        await candidate.save()
        res.status(201).send()
    } catch (error) {
        res.status(400).send(error)
    }
})

// 10. add Cultural Secretary candidate
router.post('/addCultsec', auth, async (req, res) => {
    const candidate = new Cultsec(req.body)
    try {
        await candidate.save()
        res.status(201).send()
    } catch (error) {
        res.status(400).send(error)
    }
})

// 11. add Sports Secretary candidate
router.post('/addSportsec', auth, async (req, res) => {
    const candidate = new Sportsec(req.body)
    try {
        await candidate.save()
        res.status(201).send()
    } catch (error) {
        res.status(400).send(error)
    }
})

// 12. get voter data
router.get('/getVoter', auth, async (req, res) => {
    try {
        const voter = await Voter.findOne({username: req.body.username})
        res.status(200).send(voter)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})
// 13. revoke all voter access
router.delete('/deleteVoters', auth, async (req, res) => {
    try {
        await Voter.deleteMany({})
        res.status(200).send()
    } catch (error) {
        res.status(400).send(error)
    }
    
})

// 15. get voted list
router.get('/voted', async (req, res) => {
    try {
        const voted = await Voted.find({})
        res.status(200).send(voted)
    } catch (error) {
        res.status(400).send(error)
    }
})

// 16. add secretary candidate
router.post('/addSecretary', auth, async (req, res) => {
    const candidate = new Secretary(req.body)
    try {
        await candidate.save()
        res.status(201).send()
    } catch (error) {
        res.status(400).send(error)
    }
})

// 17. add joint secretary candidate
router.post('/addJSecretary', auth, async (req, res) => {
    const candidate = new JSecretary(req.body)
    try {
        await candidate.save()
        res.status(201).send()
    } catch (error) {
        res.status(400).send(error)
    }
})

// 18. add secretary candidate
router.post('/addTreasurer', auth, async (req, res) => {
    const candidate = new Treasurer(req.body)
    try {
        await candidate.save()
        res.status(201).send()
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router