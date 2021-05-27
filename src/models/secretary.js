const mongoose = require('mongoose')

const secretarySchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase:true,
        unique: true,
        trim:true,
        required: true
    },
    ID: {
        type: String,
        unique: true,
        required: false,
        trim: true
    },
    votes: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
})


secretarySchema.statics.addVote = async (name) => {
    const secretary = await Secretary.findOne({name: name})
    
    if (!secretary) {
        throw new Error("Wrong Username or Password.")
    }
    
    secretary.votes += 1
    await secretary.save()
}


const Secretary = mongoose.model('Secretary', secretarySchema)
module.exports = Secretary