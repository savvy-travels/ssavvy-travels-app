require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const userCtrl = require('./controllers/user')
const locationCtrl = require('./controllers/location')
const authMiddleware = require('./middleware/verifyUser')
const nodeMailer = require('nodemailer')


const app = express()
app.use(express.json())

app.use(session({
    resave:false,
    saveUninitialized:true,
    secret:SESSION_SECRET,
    cookie:{maxAge: 1000 * 60 * 60 * 24}
}))

app.post('/api/auth/register', userCtrl.register)
app.post('/api/auth/login', userCtrl.login)
app.get('/api/auth/user', userCtrl.getUser)
app.post('/api/auth/logout', userCtrl.logout)


app.post('/api/save', authMiddleware.isAuthenticated, locationCtrl.saveLocation)
app.get('/api/locations', authMiddleware.isAuthenticated, locationCtrl.getLocation)




massive({
    connectionString: CONNECTION_STRING,
    ssl:{
        rejectUnauthorized: false
    }
}).then(dbInstance => {
    app.set('db', dbInstance)
    console.log('DB Ready')
    app.listen(SERVER_PORT, () => console.log(`Running on ${SERVER_PORT}`))
})