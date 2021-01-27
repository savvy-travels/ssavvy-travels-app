import axios from 'axios'
import React, {useState, useEffect, } from 'react'
import { withRouter } from 'react-router-dom'
import "./profile.css"
import Header from "../Landing/Header/Header"


const Profile = (props) => {
    const [locations, setLocations] = useState([])

    useEffect (()=> {
        axios
        .get('/api/locations/')
        .then((res) => {
            setLocations(res.data)
        })
    }, [])

    console.log(locations)


    const locationsMapped =  locations.map((location) => {
        return (
            <div className='locs-container'>
                <p>{location.location}</p>
            </div>
        )
    })
    return (
        <div>
            <Header/>
            <p>profile</p>
            <div>
                {locationsMapped}
            </div>


        </div>
    )
}

export default withRouter(Profile)