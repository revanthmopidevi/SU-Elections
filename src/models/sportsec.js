const mongoose = require('mongoose')

const sportsecSchema = new mongoose.Schema({
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


sportsecSchema.statics.addVote = async (name) => {
    const sportsec = await Sportsec.findOne({name: name})
    
    if (!sportsec) {
        throw new Error("Wrong Username or Password.")
    }
    
    sportsec.votes += 1
    await sportsec.save()
}


const Sportsec = mongoose.model('Sportsec', sportsecSchema)
module.exports = Sportsec