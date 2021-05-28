const Admin = require('./models/admin')

const admin = new Admin({
    username: process.env.USERNAME,
    password: process.env.PASSWORD
})
admin.save()
