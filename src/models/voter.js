const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

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
        required: true
    },
    boy: {
        type: Boolean,
        required: true
    },
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: '15m' },
    }
})

voterSchema.statics.findByCredentials = async (username, password) => {
    const voter = await Voter.findOne({username: username})
    
    if (!voter) {
        throw new Error("Wrong Username or Password.")
    }

    if (!await bcrypt.compare(password, voter.password)) {
        throw new Error("Wrong Username or Password.")   
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