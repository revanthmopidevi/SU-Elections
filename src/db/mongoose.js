const mongoose = require('mongoose')

const mongo_url = 'mongodb://ec:democracyisscam@dev-cluster-shard-00-00.pxkzq.mongodb.net:27017,dev-cluster-shard-00-01.pxkzq.mongodb.net:27017,dev-cluster-shard-00-02.pxkzq.mongodb.net:27017/election?ssl=true&replicaSet=atlas-kafbzu-shard-0&authSource=admin&retryWrites=true&w=majority'

mongoose.connect(mongo_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})