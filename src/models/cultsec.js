const mongoose = require('mongoose')

const cultsecSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase:true,
        unique: true,
        trim:true,
        required: true
    },
    votes: {
        type: Number,
        required: false,
        default: 0
    }
}, {
    timestamps: true
})


cultsecSchema.statics.addVote = async (name) => {
    const cultsec = await Cultsec.findOne({name: name})
    
    if (!cultsec) {
        throw new Error("Wrong Username or Password.")
    }
    
    cultsec.votes += 1
    cultsec.save()
}


const Cultsec = mongoose.model('Cultsec', cultsecSchema)
module.exports = Cultsec