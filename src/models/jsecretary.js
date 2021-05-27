const mongoose = require('mongoose')

const jsecretarySchema = new mongoose.Schema({
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


jsecretarySchema.statics.addVote = async (name) => {
    const jsecretary = await Jsecretary.findOne({name: name})
    
    if (!jsecretary) {
        throw new Error("Wrong Username or Password.")
    }
    
    jsecretary.votes += 1
    await jsecretary.save()
}


const Jsecretary = mongoose.model('Jsecretary', jsecretarySchema)
module.exports = Jsecretary