require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, EMAIL_USER, EMAIL_PASSWORD} = process.env
const userCtrl = require('./controllers/user')
const locationCtrl = require('./controllers/location')
const prefAirportCtrl = require('./controllers/preferredAirport')
const airportCtrl = require('./controllers/airports')
const authMiddleware = require('./middleware/verifyUser')
const nodemailer = require('nodemailer')


const app = express()
app.use(express.json())

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}))

app.post('/api/auth/register', userCtrl.register)
app.post('/api/auth/login', userCtrl.login)
app.post('/api/auth/logout', userCtrl.logout)

app.use(authMiddleware.isAuthenticated)
app.get('/api/auth/user', userCtrl.getUser)

app.post('/api/saveLocation', locationCtrl.saveLocation)
app.get('/api/locations', locationCtrl.getLocation)

app.post('/api/savePreferred', prefAirportCtrl.savePreferred)
app.post('/api/updatePreferred', prefAirportCtrl.updatePreferred)
app.get('/api/getPreferred', prefAirportCtrl.getPreferred)

app.post('/api/saveAirports', airportCtrl.saveAirports)
app.get('/api/getAirports', airportCtrl.getAirports)

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD
    }
})



massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(dbInstance => {
    app.set('db', dbInstance)
    console.log('DB Ready')
    app.listen(SERVER_PORT, () => console.log(`Running on ${SERVER_PORT}`))
})