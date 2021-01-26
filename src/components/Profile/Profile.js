import axios from 'axios'
import React, {useState, useEffect, } from 'react'
import { withRouter } from 'react-router-dom'

const Profile = (props) => {
    const [locations, setLocations] = useState([])

    useEffect (()=> {
        axios
        .get('/api/locations/')
        .then((res) => {
            setLocations(res.data)
        })
    }, [])

    const locationsMapped =  locations.map((location) => {
        return (
            <div className='locs-container'>
                <p>{location.location}</p>
            </div>
        )
    })
    return (
        <div>
            <p>profile</p>
            <div>
                {locationsMapped}
            </div>

        </div>
    )
}

export default withRouter(Profile)