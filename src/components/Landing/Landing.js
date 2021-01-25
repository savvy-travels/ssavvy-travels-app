
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useIpCoords } from 'use-ipcoords'
import {Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {loginUser} from '../../Redux/userReducer'
import Header from './Header/Header'
import './landing.css'
import NewSearch from './NewSearch/NewSearch'
import Signup from './Auth/Signup'
import Login from './Auth/Login'

function Landing (props){

    const { REACT_APP_IPSTACK_KEY } = process.env
    const [lat, setLat] = useState('')
    const [lon, setLon] = useState('')
    const [cities, setCities] = useState([])

    // useEffect(() =>  //gets the latitude and longitude of the user based on their IP address with an api call
    //     axios.get('http://api.ipstack.com/check?access_key=2c90293abbf7af47c07b492a4538d0fb').then(res => {
    //     setLat(res.data.latitude.toFixed(6))
    //     setLon(res.data.longitude.toFixed(6))
    //     axios.get(`http://geodb-free-service.wirefreethought.com/v1/geo/locations/${lat}${lon}/nearbyCities?minPopulation=500000&limit=5&offset=0&radius=100`).then(res=>{
    //     })
    // }, [cities]))
//Get user info//

    useEffect(()=>{
        axios.get('/api/auth/user').then(res=>{
            props.loginUser(res.data)
            }
        ).catch(err=>{
            console.log(err.response.data)
    })
    },[])

    const metro = cities.filter((place) => place.type === 'CITY').map((city) => city.city) //filters the results of the second useEffect to only include cities, maps those results to return the nearest city.

    //still need to find a way to get the nearest airports - there are some apis, but they are difficult to work with or cost $.  will keep researching.

    return(
        <div className='landing'>
            <Header/>
            <div className='hero-video'>
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

function mapStateToProps (reduxState){
    return
}


export default withRouter(connect(mapStateToProps,{loginUser})(Landing))