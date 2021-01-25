
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useIpCoords } from 'use-ipcoords'
import {Switch, Route, withRouter } from 'react-router-dom'
// import { connect } from 'react-redux'
import Header from './Header/Header'
import './landing.css'
import NewSearch from './NewSearch/NewSearch'
import heroVideo from './DevMtn-Air.mp4'
import Signup from './Auth/Signup'
import Login from './Auth/Login'

function Landing (){
    
    const { REACT_APP_IPSTACK_KEY } = process.env
    const [lat, setLat] = useState('')
    const [lon, setLon] = useState('')
    const [cities, setCities] = useState([])

    useEffect(() =>  //gets the latitude and longitude of the user based on their IP address with an api call
        axios.get(`http://api.ipstack.com/check?access_key=${REACT_APP_IPSTACK_KEY}`).then(res => {
        setLat(res.data.latitude.toFixed(6))
        setLon(res.data.longitude.toFixed(6))
        console.log(lat, lon)
    }, [cities]))

    useEffect(() => //searches for the nearest cities from the latitude and longitude from the first useEffect.  Filters within 100 miles and population of at least 500,000, limits to 5.
        axios.get(`http://geodb-free-service.wirefreethought.com/v1/geo/locations/32.938931-96.445427/nearbyCities?minPopulation=500000&limit=5&offset=0&radius=100`).then(res => setCities(res.data.data)) //includes counties
    , [])

    const metro = cities.filter((place) => place.type === 'CITY').map((city) => city.city) //filters the results of the second useEffect to only include cities, maps those results to return the nearest city.

    //still need to find a way to get the nearest airports - there are some apis, but they are difficult to work with or cost $.  will keep researching.

    return(
        <div className='landing'>
                <Header/>
                <video className="video" src={heroVideo} 
                type='video/mp4'
                autoPlay loop muted
                ></video>

                <Switch>
                    <Route exact path='/' component={NewSearch} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/signup' component={Signup} />
                </Switch>
        
            </div>
            <div className='triangle'>
            </div>
        </div>

    )
}

export default withRouter(Landing)