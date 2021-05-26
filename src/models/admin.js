const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const adminSchema = new mongoose.Schema({
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

adminSchema.methods.generateAuthToken = async function () {
    const admin = this
    const token = jwt.sign({ username: admin.username}, 'secret_string')
    admin.tokens = admin.tokens.concat({token})
    await admin.save()
    return token
}

adminSchema.methods.getPublicProfile = function () {
    const admin = this
    const adminProfile = admin.toObject()

    delete adminProfile.password
    delete adminProfile.tokens

    return adminProfile
}

adminSchema.statics.findByCredentials = async (username, password) => {
    const admin = await Admin.findOne({username: username})
    
    if (!admin) {
        throw new Error("Wrong Username or Password.")
    }
    const passwordOk = await bcrypt.compare(password, admin.password)
    if (!passwordOk) {
        throw new Error("Wrong Username or Password.")
    }

    return admin
}

adminSchema.pre('save', async function (next) {
    const admin = this
    if (admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, 8)
    }
    next()
})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin