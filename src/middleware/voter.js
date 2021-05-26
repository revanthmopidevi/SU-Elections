const jwt = require('jsonwebtoken')
const Voter = require('../models/voter')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'secret_string')
        const voter = await Voter.findOne({username: decoded.username, 'tokens.token': token})
        
        if (!voter) {
            throw new Error()
        }

        req.token = token
        req.voter = voter
        next()
    } catch(e) {
        res.status(401).send({"error": "Please authenticate."})
    }
}

module.exports = auth