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

    function updatePreferred(id, preferred) {
        axios.post('/api/updatePreferred')
        .then(axios.get('/api/getPreferred'))
        .catch(err => console.log(err))
    }
    
    const locationsMapped =  locations.map(location => {
        return (
            <div className='locs-container'>
                <p>{location.location}</p>
            </div>
        )
    })

    return (
        <div>
            <div>
                <div className='user-container'>
                    <h1>{email}</h1>
                    <h2>{preferred}</h2>
                </div>
                <div className='locations-container'>
                    {locationsMapped}
                </div>
                <div className='suggested-container'>

                </div>
            </div>


        </div>
    )
}

export default withRouter(Profile)