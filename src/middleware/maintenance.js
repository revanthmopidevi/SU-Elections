const express = require('express')

const m = false

const maintenance =  (req, res, next) => {
    if (m) {
        return res.status(503).send("503 Service Unavailable")
    }
    next()
}

module.exports = maintenance