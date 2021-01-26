module.exports = {
    saveAirports: async(req,res) => {
    const db = req.app.get('db')
    const {id} = req.session.user
    const {airport_one, airport_two} = req.body

    const savedAirports = await db.airports.saveAirport([id, airport_one, airport_two])

    res.status(200).send(savedAirports)
    },
    getAirports: async(req,res) => {
        const db = req.app.get('db')
        const {id} = req.session.user

        const grabAirports = await db.airports.getAirports([id])

        res.status(200).send(grabAirports)
    }
}