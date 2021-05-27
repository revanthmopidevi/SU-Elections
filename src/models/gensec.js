const mongoose = require('mongoose')

const gensecSchema = new mongoose.Schema({
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
        required: true,
        trim: true
    },
    votes: {
        type: Number,
        required: false,
        default: 0
    }
}, {
    timestamps: true
})


gensecSchema.statics.addVote = async (name) => {
    const gensec = await Gensec.findOne({name: name})
    
    if (!gensec) {
        throw new Error("Wrong Username or Password.")
    }
    
    gensec.votes += 1
    await gensec.save()
}


const Gensec = mongoose.model('Gensec', gensecSchema)
module.exports = Gensec