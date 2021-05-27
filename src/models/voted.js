const mongoose = require('mongoose')
const validator = require('validator')

const votedSchema = new mongoose.Schema({
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
    boy: {
        type: Boolean,
        required: true
    }
})


const Voted = mongoose.model('Voted', votedSchema)
module.exports = Voted