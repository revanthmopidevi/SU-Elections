const jwt = require('jsonwebtoken')
const Voter = require('../models/voter')

const auth = async (req, res, next) => {
    try {
        const voter = await Voter.findByCredentials(req.body.username, req.body.password)
        next()
    } catch(e) {
        res.status(401).send("Invalid or Expired Credentials.")
    }
}

module.exports = auth