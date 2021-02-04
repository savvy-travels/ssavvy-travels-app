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
    const [suggestedCards, setSuggestedCards] = useState([])
    const {flights} = props
    const suggested = flights.slice(0, 10)

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

    useEffect(()=>{
        setSuggestedCards(suggested.map(flight => {
          flight['photo'] = photos[Math.floor(Math.random() * photos.length)].url
          return (
          <div key={flight.QuoteId} className='miniMap-flight-card'>
            <span className='image-container'>
              <img className='flight-card-image' src={flight.photo} alt='preview'/>
            </span>
            <span className='info-container'>
              <div>
                <h1>{flight.CityName}</h1>
                <h4>{moment(flight.OutboundLeg.DepartureDate).format('MMM Do YYYY')}</h4>
                <h4>{`${flight.Direct ? 'Nonstop' : 'Multiple Stops'} - ${flight.name}`}</h4>
                <h4>{flight.Name}</h4>
              </div>
                <h1><h6>From</h6> ${flight.MinPrice}</h1>
              </span>
            </div>
           )
          }
        )
      )},[flights])

    function updatePreferred(id, preferred) {
        axios.post('/api/updatePreferred')
        .then(axios.get('/api/getPreferred'))
        .catch(err => console.log(err))
    }
    
    const locationsMapped =  locations.map(location => {
        return (
            <div className='locs-container'
            style={{
                backgroundImage: `url(${photos[Math.floor(Math.random() * photos.length)].url})`,
                backgroundSize: '50%',
                backgroundRepeat: 'no-repeat'
                
            }}>
                    <h1 className='locations'>{location.location}</h1>
                <div className='information-container'>
                    <h2 className='airport'>{location.airport}</h2>
                    <h2>{location.dates}</h2>              
                    <h3>{location.created}</h3>
                </div>
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