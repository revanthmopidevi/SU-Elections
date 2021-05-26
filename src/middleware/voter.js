const jwt = require('jsonwebtoken')
const Voter = require('../models/voter')

const auth = async (req, res, next) => {
    try {
        const voter = await Voter.findByCredentials(req.body.username, req.body.password)
        voter.voted = true
        await voter.save()
        req.boy = voter.boy
        next()
    } catch(e) {
        res.status(401).send({
            "text": "Invalid or Expired Credentials."
        })
    }
}

module.exports = auth