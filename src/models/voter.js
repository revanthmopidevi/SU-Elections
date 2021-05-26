const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const voterSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase:true,
        unique: true,
        trim:true,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error("Password too weak.")
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

voterSchema.methods.generateAuthToken = async function () {
    const voter = this
    const token = jwt.sign({ username: voter.username}, 'secret_string')
    voter.tokens = voter.tokens.concat({token})
    await voter.save()
    return token
}

voterSchema.pre('save', async function (next) {
    const voter = this
    if (voter.isModified('password')) {
        voter.password = await bcrypt.hash(voter.password, 8)
    }
    next()
})

const voter = mongoose.model('voter', voterSchema)
module.exports = Voter