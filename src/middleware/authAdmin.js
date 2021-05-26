const jwt = require('jsonwebtoken')
const adminConn = require('../db/admin')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'secret_string')
        const admin = await adminConn.Admin.findOne({username: decoded.username, 'tokens.token': token})
        
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