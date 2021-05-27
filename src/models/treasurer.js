const mongoose = require('mongoose')

const treasurerSchema = new mongoose.Schema({
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


treasurerSchema.statics.addVote = async (name) => {
    const treasurer = await Treasurer.findOne({name: name})
    
    if (!treasurer) {
        throw new Error("Wrong Username or Password.")
    }
    
    treasurer.votes += 1
    await treasurer.save()
}


const Treasurer = mongoose.model('Treasurer', treasurerSchema)
module.exports = Treasurer