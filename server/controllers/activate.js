const jwt = require('jsonwebtoken')
module.exports = {
        verify: async(req,res) => {
            const db = req.app.get('db')
            const {id, token} = req.params
            const tokenV = await jwt.verify(token, process.env.JWT_SECRET_KEY)
            await db.users.activate_user(id)
            if(tokenV) {
                res.status(200).redirect('http://localhost:3000')
            } else {
                res.sendStatus(409)
            }

        }
}