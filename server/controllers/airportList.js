const airPorts = require('./airports.json')

module.exports = {
    getAirportList: async (req, res) =>{
        console.log(req.params)
        const {cities} = req.params
        console.log(cities)
        const closestAirports = await airPorts.filter(airport => airport.city === cities)
        console.log(closestAirports)
        res.status(200).send(closestAirports)
    }
}