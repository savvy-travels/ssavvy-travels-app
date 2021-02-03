import axios from 'axios'
import React, { useState, useEffect, } from 'react'
import { withRouter } from 'react-router-dom'
import "./profile.css"


const Profile = (props) => {
    const [locations, setLocations] = useState([])
    const [email, setEmail] = useState('')
    const [preferred, setPreferred] = useState('')
    
    useEffect(() => {
        axios.get('/api/auth/user')
        .then((res) => {
            setPreferred(res.data.preferred)
            setEmail(res.data.email)
        })
    }, [])
 
    useEffect (()=> {
        axios.get('/api/locations')
        .then((res) => {
            setLocations(res.data)
        })
    }, [])
    
    const locationsMapped =  locations.map(location => {

        return (
            <div className='locs-container'>
                <p>{location.location}</p>
            </div>
        )
    })
    console.log(preferred)
    console.log(locations)
    return (
        <div>
            <p>profile</p>
            
            <div>
                <h1>{email}</h1>
                <h2>{preferred}</h2>
                {locationsMapped}
            </div>


        </div>
    )
}

export default withRouter(Profile)