const Voter = require('../models/voter')
const VoterMaster = require('../models/voterMaster')

const auth = async (req, res, next) => {
    try {
        const voter = await Voter.findByCredentials(req.body.username, req.body.password)
        const voterMaster = await VoterMaster.findOne({username: req.body.username})
        
        if (!voter || voterMaster.voted) {
            return res.status(404).send("Invalid or Expired Credentials")
        }
        voterMaster.voted = true
        await voterMaster.save()
        req.boy = voter.boy
        next()
    } catch(e) {
        res.status(401).send({
            "text": "Invalid or Expired Credentials."
        })
    }
}

module.exports = auth