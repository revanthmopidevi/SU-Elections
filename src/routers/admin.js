const express = require('express')
const router = new express.Router()
const Admin = require('../models/admin')
const Voter = require('../models/voter')
const VoterMaster = require('../models/voterMaster')
const President = require('../models/president')
const Gensec = require('../models/gensec')
const Cultsec = require('../models/cultsec')
const Sportsec = require('../models/sportsec')
const Secretary = require('../models/secretary')
const JSecretary = require('../models/jsecretary')
const Treasurer = require('../models/treasurer')
const generator = require('generate-password')
const auth = require('../middleware/admin')
const nodemailer = require('nodemailer')

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

// 5. add voter - NO AUTH
router.post('/addVoter', async (req, res) => {
    const exists = await VoterMaster.exists({username: req.body.username, voted: true})
    if (exists) {
        return res.status(400).send("User already created.")
    }
    // generate password
    const password = generator.generate({
        length: 7,
        numbers: true
    })
    req.body.password = password
    // save models and respond
    try {
        const voter = new Voter(req.body)
        await voter.save()
        if (!await VoterMaster.exists({username: req.body.username})) {
            const voterMaster = new VoterMaster({
                username: req.body.username
            })
            await voterMaster.save()
        }

        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: process.env.GMAIL_ID,
                  pass: process.env.GMAIL_PASSWORD
                }
            })
            const mailOptions = {
                from: process.env.GMAIL_ID,
                to: voter.username + process.env.EMAIL_DOMAIN,
                subject: process.env.MAIL_SUBJECT,
                text: `Your username and password are ${voter.username} and ${password} respectively. The credentials shall be valid only for the next 10 minutes. In case of any queries, contact the Election Commission` 
            }
            transporter.sendMail(mailOptions)
        } catch (error) {
            throw new Error(error)
        }
        res.status(201).send(voter.username)
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
        const voterMaster = await VoterMaster.findOne({username: req.body.username})
        res.status(200).send(voterMaster)
    } catch (error) {
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
router.get('/voted', auth, async (req, res) => {
    try {
        const voterMaster = await VoterMaster.find({voted: true})
        res.status(200).send(voterMaster)
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

// 19. get results
router.get('/results', auth, async (req, res) => {
    try {
        const president = await President.find({})
        const gensec = await Gensec.find({})
        const cultsec = await Cultsec.find({})
        const sportsec = await Sportsec.find({})
        const secretary = await Secretary.find({})
        const jsecretary = await JSecretary.find({})
        const treasurer = await Treasurer.find({})

        res.status(200).send({
            president,
            gensec,
            cultsec,
            sportsec,
            secretary,
            jsecretary,
            treasurer
        })
    } catch (error) {
        res.status(400).send()
    }
    
})
module.exports = router