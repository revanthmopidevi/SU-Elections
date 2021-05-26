const jwt = require('jsonwebtoken')
const Admin = require('../models/admin')
const secretString = process.env.SECRET_STRING

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, secretString)
        const admin = await Admin.findOne({username: decoded.username, 'tokens.token': token})
        
        if (!admin) {
            throw new Error()
        }

        req.token = token
        req.admin = admin
        next()
    } catch(e) {
        res.status(401).send({"error": "Please authenticate."})
    }
}

module.exports = auth