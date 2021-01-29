const airports = require('./airports')
const airPorts = require('./airports.json')

module.exports = {
    getLocalAirports: async (req, res) =>{
        console.log(req.params)
        const {city} = req.params
        console.log(city)
        const closestAirports = await airPorts.filter(airport => airport.city === city)
        console.log(closestAirports)
        res.status(200).send(closestAirports)
    },

    getAllAirports: async (req, res) => {
        const allAirports = await airPorts.filter(airport => airport.country === 'United States' && airport.name.includes('International'))
        console.log(allAirports)
        res.status(200).send(allAirports)
    }
}