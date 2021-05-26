const express = require('express')
const router = new express.Router()
const adminConn = require('../db/admin')
const adminSchema = require('../schema/admin')
const Admin = adminConn.model('Admin', adminSchema)
const auth = require('../middleware/authAdmin')

// 0. create admin
router.post('/create', async (req, res) => {
    const admin = new Admin(req.body)
    try {
        await admin.save()
        const token = admin.generateAuthToken()
        res.send({admin: admin.getPublicProfile(), token: token})
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
    const allowedUpdates = ['name', 'password', 'age']
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


module.exports = router