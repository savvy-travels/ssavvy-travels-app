const airPorts = require('./airports.json')

module.exports = {
    getLocalAirports: async (req, res) => {
        const { city } = req.params
        const closestAirports = await airPorts.filter(airport => airport.city === city)
        res.status(200).send(closestAirports)
    },

    getAllAirports: async (req, res) => {
        res.status(200).send(airPorts)
    }
}