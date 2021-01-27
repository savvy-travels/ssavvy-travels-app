module.exports = {
    saveLocation: async(req, res) => {
        const db = req.app.get('db')
        const {location} = req.body
        const {id} = req.session.user
        const [save] = await db.locations.save_locations([location, id])
        res.status(200).send(save)
    },
    getLocation: async(req,res) => {
        const db = req.app.get('db')
        const {id} = req.session.user
        const locations = await db.locations.get_locations(id)
        res.status(200).send(locations)
    }
}