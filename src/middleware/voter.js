const Voter = require('../models/voter')
const Voted = require('../models/voted')

const auth = async (req, res, next) => {
    try {
        const voter = await Voter.findByCredentials(req.body.username, req.body.password)
        if (!voter) {
            return res.status(404).send("Invalid or Expired Credentials")
        }
        const voted = new Voted({username: voter.username, boy: voter.boy})
        await voted.save()
        voter.voted = true
        await voter.save()
        req.boy = voter.boy
        next()
    } catch(e) {
        res.status(401).send({
            "text": "Invalid or Expired Credentials."
        })
    }
}

module.exports = auth