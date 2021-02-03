import axios from 'axios'
import React, { useState, useEffect, } from 'react'
import { withRouter, Link } from 'react-router-dom'
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

    function updatePreferred(id, preferred) {
        axios.post('/api/updatePreferred')
        .then(axios.get('/api/getPreferred'))
        .catch(err => console.log(err))
    }
    
    const locationsMapped =  locations.map(location => {
        return (
            <div className='locs-container'>
                <p className='locations'>{location.location}</p>
            </div>
        )
    })

    return (
        <div className='background-container'>
                <h1 className='profile'>My Profile</h1>
            <div className='profile-container'>
                <div className='sidebar-container'>
                <div className='user-container'>
                    <h1>{email}</h1>
                    <h2>{preferred}</h2>
                </div>
                <div className='suggested-container'>
                    <Link to='/map'>
                        <h3>View Map</h3>
                    </Link>
                    <Link to='/'>
                        <h3 className='home'>Home</h3>
                    </Link>
                    <div className='line'></div>
                    <h3>Suggested Trips</h3>
                </div>
                </div>
                <div className='locations-container'>
                    <div className='input-container'>
                        <input placeholder='Search My Trips'/>
                        <input className='price' placeholder='Filter by Price'/>
                    </div>
                        <div>
                            {locationsMapped}
                        </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Profile)