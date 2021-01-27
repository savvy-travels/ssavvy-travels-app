import axios from 'axios'
import React, {useState, useEffect, } from 'react'
import { withRouter } from 'react-router-dom'
import "./profile.css"
import Header from "../Landing/Header/Header"


const Profile = (props) => {
    const [locations, setLocations] = useState([])
    
    useEffect (()=> {
        axios.get('/api/locations')
        .then((res) => {
            setLocations(res.data)
        })
    }, [])

<<<<<<< HEAD
    console.log(locations)


    const locationsMapped =  locations.map((location) => {
=======
    const locationsMapped =  locations.map(location => {
>>>>>>> 885e71b28d33436eb32b48ffe7e45cee91e29ef3
        return (
            <div className='locs-container'>
                <p>{location.location}</p>
            </div>
        )
    })
    console.log(locations)
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