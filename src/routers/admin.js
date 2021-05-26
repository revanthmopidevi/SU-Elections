const express = require('express')
const router = new express.Router()
const Admin = require('../models/admin')

router.post('/create', async (req, res) => {
    console.log("0")
    const admin = new Admin(req.body)
    try {
        console.log("1")
        await admin.save()
        console.log("2")
        const token = admin.generateAuthToken()
        res.status(201).send({admin, token:token})
    } catch (error) {
        res.status(400).send()
    }
})

module.exports = router