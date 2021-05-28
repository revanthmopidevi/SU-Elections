const Admin = require('./models/admin')

const exists = Admin.exists({
    username: process.env.USERNAME
})

const admin = new Admin({
    username: process.env.USERNAME,
    password: process.env.PASSWORD
})

if (!exists) {
    admin.save()
}