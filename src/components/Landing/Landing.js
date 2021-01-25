
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { withRouter } from 'react-router-dom'
import { useIpCoords } from 'use-ipcoords'

function Landing (){
    
    const { REACT_APP_IPSTACK_KEY } = process.env
    const [lat, setLat] = useState('')
    const [lon, setLon] = useState('')
    const [cities, setCities] = useState([])

    useEffect(() => 
        axios.get(`http://api.ipstack.com/check?access_key=2c90293abbf7af47c07b492a4538d0fb`).then(res => {
        setLat(res.data.latitude.toFixed(6))
        setLon(res.data.longitude.toFixed(6))
        console.log(lat, lon)
    }, [cities]))

    useEffect(() => 
        axios.get(`http://geodb-free-service.wirefreethought.com/v1/geo/locations/32.938931-96.445427/nearbyCities?minPopulation=500000&limit=5&offset=0&radius=100`).then(res => setCities(res.data.data))
    , [])

    const metro = cities.filter((place) => place.type === 'CITY')

    console.log(metro)





    return(
        <h1>Landing</h1>
    )
}

export default withRouter(Landing)