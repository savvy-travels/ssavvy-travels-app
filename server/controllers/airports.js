module.exports = {
    saveAirports: async(req,res) => {
    const db = req.app.get('db')
    const {id} = req.session.user
    const {airport_one, airport_two} = req.body

    const [hasAirports] = await db.airports.getAirports(id)

    if(!hasAirports){
        await db.airports.saveAirport([id, airport_one, airport_two])
        return res.status(200).send([`${airport_one}, ${airport_two}`])    
    } 
    if(hasAirports){
        await db.airports.updateAirport([id, airport_one, airport_two])
        return res.status(200).send([`${airport_one}, ${airport_two}`])
    }


    },
    getAirports: async(req,res) => {
        const db = req.app.get('db')
        const {id} = req.session.user

        const grabAirports = await db.airports.getAirports([id])

        res.status(200).send(grabAirports)
    }
}