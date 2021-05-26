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
    voted: {
        type: Boolean,
        required: false,
        default: false
    }
}, {
    timestamps: true
})

voterSchema.statics.findByCredentials = async (username, password) => {
    const voter = await Voter.findOne({username: username})
    
    if (!voter) {
        throw new Error("Wrong Username or Password.")
    }
    const passwordOk = await bcrypt.compare(password, voter.password)
    if (!passwordOk) {
        throw new Error("Wrong Username or Password.")
    }

    if (voter.voted === true) {
        throw new Error("Vote casted.")
    }
    return voter
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