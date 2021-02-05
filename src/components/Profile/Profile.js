import axios from 'axios'
import React, { useState, useEffect, } from 'react'
import { withRouter, Link } from 'react-router-dom'
import "./profile.css"
import moment from 'moment'
const photos = require('../../photos.json')


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


    // function updatePreferred(id, preferred) {
    //     axios.post('/api/updatePreferred')
    //     .then(axios.get('/api/getPreferred'))
    //     .catch(err => console.log(err))
    // }
    
    const locationsMapped =  locations.map(location => {
        return (
            <div className='locs-container'
            style={{
                backgroundImage: `url(${photos[Math.floor(Math.random() * photos.length)].url})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
                
            }}>
                    <h1 className='locations'>{location.location}</h1>
                <div className='information-container'>
                    <h2 className='airport'>{location.airport}</h2>
                    <h2>{location.dates}</h2>              
                    <h3>Saved: {moment(location.created).fromNow()}</h3>
                </div>
            </div>
        )
    })

    return (
        <div className='background-container'>
                {/* <h1 className='profile'>My Trips</h1> */}
            <div className='profile-container'>
                <div className='sidebar-container'>
                <div className='user-container'>
                    <div className='pro-container'>
                    <h1>Profile</h1>
                    </div>
                    <h2><h2 className='email'>Email:</h2>{email}</h2>
                    <h2><h2 className='pref'>Preferred Airport:</h2>{preferred}</h2>
                </div>
                <div className='suggested-container'>
                    <Link to='/map'>
                        <h3 className='links-profile'>View Map</h3>
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
                        <h1>My Trips</h1>
                        {/* <input className='search-trips-input' placeholder='Search My Trips'/> */}
                    </div>
                        <div className='locations-mapped'>
                            {locationsMapped}
                        </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Profile)