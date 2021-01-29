const airPorts = require('./airports.json')

module.exports = {
    getAirportList: async (req, res) => {
        const { cities } = req.params
        const closestAirports = await airPorts.filter(airport => airport.city === cities)
        res.status(200).send(closestAirports)
    }
}