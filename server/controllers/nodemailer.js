module.exports = {
    sendEmail: async(req,res) => {
        const {message, title, email} = req.body
                const transporter = await req.app.get('transporter')
                transporter.sendMail({
                    from: 'savvytravels11@gmail.com',
                    to: email,
                    subject: title,
                    text: message
                },
                function(err, info){
                    if(err){
                        console.log(err)
                    }else {
                        console.log('email sent:' + info.response)
                    }
                })
                res.sendStatus(200)
    }

}