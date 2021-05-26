const express = require('express')
const path = require('path')

// routers
const adminRouter = require('./routers/admin')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use('/admin', adminRouter)

app.listen(port, () => {
    console.log(`server running on port ${port}.`)
})