import axios from "axios";
import React, { useEffect, useState } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./Header/Header";
import "./landing.css";
import NewSearch from "./NewSearch/NewSearch";
import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
require("dotenv").config();

function Landing(props) {
  const ipstackKey = process.env.REACT_APP_IPSTACK_KEY;
  const geoDbKey = process.env.REACT_APP_GEODB_KEY;

  const [cities, setCities] = useState([])
  const [location, setLocation] = useState('')
  const [airports, setAirports] = useState([])
  const [lat, setLat] = useState('')
  const [long, setLong] = useState('')
  const [metro, setMetro] = useState('')


  //gets location of user based on IP address
  useEffect(() => {
    async function getLocation() {
      const location = await axios.get(
        `http://api.ipstack.com/check?access_key=${ipstackKey}`
      );
      setLat(`${location.data.latitude.toFixed(4)}`);
      setLong(`${location.data.longitude.toFixed(4)}`)
      setLocation(`${location.data.latitude.toFixed(4)}${location.data.longitude.toFixed(4)}`)
    }
    getLocation();
  }, []);


  //runs getCities function if the location is defined
  useEffect(() => {
    if (location.length > 0) {
      getCities(location)
    }
  }, [location]);


  //gets airports if cities is defined
  useEffect(() => {
    if (cities.length > 0) {
      getAirports(cities[0])
    }
  }, [cities])

  //performs api call to get nearest cities to the latitude and longitude from getLocation useEffect.
  //Filters by cities with minimum population of 250,000 in a radius of 100 miles.
  const getCities = () => {
    axios.get(`https://wft-geo-db.p.rapidapi.com/v1/geo/locations/${location}/nearbyCities?minPopulation=250000&limit=5&offset=0&radius=100&sort=-population`,
      {
        headers: {
          "x-rapidapi-key": `${geoDbKey}`,
        },
      }
    )
      .then(res => setCities((res.data.data).filter((place) => place.type === 'CITY').map((city) => city.city)))
    //sets the value of cities to be only the city name, filters out results of non-cities
  };

  //gets airports from an api call that searches nearest the cities defined in getCities
  const getAirports = (city) => {
    axios.get(`https://aerodatabox.p.rapidapi.com/airports/search/term?q=${city}&limit=5`,
      {
        headers: {
          'x-rapidapi-key': '293c8f1306mshd1179b84f5495fdp1624a6jsn253fcf20a6a7',
          'x-rapidapi-host': 'aerodatabox.p.rapidapi.com'
        }
      }).then(res => setAirports(res.data.items))
  }

  return (
    <div className='landing'>
      <Header />
      <video className="video" src='https://colab-image-assets.s3-us-west-1.amazonaws.com/DevMtn-Air.mp4'
        type='video/mp4'
        autoPlay
        loop
        muted
      ></video>

      <Switch>
        <Route exact path='/' component={NewSearch} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
      </Switch>

      <div className='triangle'>
        {metro}
      </div>
    </div>
  )

}

function mapStateToProps(reduxState) {
  return {
    username: reduxState.username,
    preferred: reduxState.preferred
  }
}

export default withRouter(connect(mapStateToProps)(Landing));
