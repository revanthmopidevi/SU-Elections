const express = require('express')
const path = require('path')
const router = new express.Router()

router.use('*', express.static(path.join(__dirname, '..', 'static', 'vote')));

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'static', 'vote', 'error.html'))
})

module.exports = router
