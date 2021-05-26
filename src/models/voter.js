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
        required: true,
        validate(value) {
            if (value.length !== 9) {
                throw new Error("Username format incorrect.")
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7
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

voterSchema.statics.findByCredentials = async (username, password) => {
    const voter = await Voter.findOne({username: username})
    
    if (!voter) {
        throw new Error("Wrong Username or Password.")
    }
    const passwordOk = await bcrypt.compare(password, voter.password)
    if (!passwordOk) {
        throw new Error("Wrong Username or Password.")
    }

    return voter
}

voterSchema.methods.getPublicProfile = function () {
    const voter = this
    const voterProfile = voter.toObject()

    delete voterProfile.password
    delete voterProfile.tokens

    return voterProfile
}

voterSchema.pre('save', async function (next) {
    const voter = this
    if (voter.isModified('password')) {
        voter.password = await bcrypt.hash(voter.password, 8)
    }
    next()
})

const Voter = mongoose.model('Voter', voterSchema)
module.exports = Voter