const express = require('express')
const path = require('path')
require('./db/mongoose')
require('./initialise')

//middleware
const maintenance = require('./middleware/maintenance')
// routers
const adminRouter = require('./routers/admin')
const voterRouter = require('./routers/voter')

const app = express()
const port = process.env.PORT

app.use(express.static(path.join(__dirname, 'static', 'vote')))
app.use(maintenance)
app.use(express.json())
app.use('/admin', adminRouter)
app.use('/vote', voterRouter)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'vote', 'error.html'))
})

app.disable('x-powered-by')

app.listen(port, () => {
    console.log(`server running on port ${port}.`)
})
