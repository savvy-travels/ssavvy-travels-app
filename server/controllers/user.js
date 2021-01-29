const bcrypt = require('bcryptjs')
// const img = require('../../public/dm-air.jpg')

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db')
        console.log(req.body)
        const { email, username, password, preferred, message, title} = req.body
        const [existingUser] = await db.users.find_user([username])
        const [existingEmail] = await db.savvy_travels_users.find({email})
        if(existingUser && existingEmail){
            return res.status(409).send('Username and Email are in use')
        }
        if (existingUser) {
            return res.status(409).send('Username is in use')
        }
        if (existingEmail){
            return res.status(409).send('Email is already in use')
        }
        try {
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)
            const [newUser] = await db.users.create_user([email, username, hash, preferred])
            req.session.user = newUser
            
            const transporter = await req.app.get('transporter')
            transporter.sendMail({
                from: 'savvytravels11@gmail.com',
                to: email,
                subject: title,
                text: message,
                html: `<div>${message}</div>
                        <img src='https://colab-image-assets.s3-us-west-1.amazonaws.com/Savvy-Travels-logo.png'/>` 
            },
            function(err, info){
                if(err){
                    console.log(err)
                }else {
                    console.log('email sent:' + info.response)
                }
            })

            res.status(200).send(newUser)
        } catch (err) {
            console.log(err)
        }
    },
    login: async (req, res) => {
        const db = req.app.get('db')
        const { email, password } = req.body
        const [existingUser] = await db.users.find_user([email])

        if (!existingUser) {
            return res.status(404).send('User does not exist')
        }

        const isAuthenticated = bcrypt.compareSync(password, existingUser.password)
        if (!isAuthenticated) {
            return res.status(403).send('Incorrect username or password')
        }
        delete existingUser.password
        req.session.user = existingUser
        res.status(200).send(existingUser)
    },
    getUser: (req, res) => {
        if (req.session.user) {
            res.status(200).send(req.session.user)
        } else {
            res.status(404).send('No session found')
        }
    },
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }
}