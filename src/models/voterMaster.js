const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const voterMasterSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase:true,
        unique: true,
        trim:true,
        required: true,
        validate(value) {
            if (value.length !== 9) {
                throw new Error("Username format incorrect.")
            }
        }
    },
    voted: {
        type: Boolean,
        required: false,
        default: false
    }
})

const voterMaster = mongoose.model('voterMaster', voterMasterSchema)
module.exports = voterMaster