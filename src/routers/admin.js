const express = require('express')
const router = new express.Router()
const Admin = require('../models/admin')

router.post('/create', async (req, res) => {
    console.log("0")
    const admin = new Admin(req.body)
    try {
        await admin.save()
        const token = admin.generateAuthToken()
        res.status(201).send({admin, token:token})
    } catch (error) {
        res.status(400).send()
    }
})

module.exports = router