import axios from "axios";
import React, { useEffect, useState } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { airportSearch } from '../../Redux/searchReducer'
import { updateLocation } from '../../Redux/locationReducer'
import { connect } from "react-redux";
import "./landing.css";
import NewSearch from "./NewSearch/NewSearch";
import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
import MiniMap from "./MiniMap/MiniMap"
import { CircleLoader, BarLoader, ClipLoader } from 'react-spinners'
require("dotenv").config();

function Landing(props) {
  const geoDbKey = process.env.REACT_APP_GEODB_KEY;
  const skyscannerKey = process.env.REACT_APP_SKYSCANNER_KEY
  const googleKey = process.env.REACT_APP_GOOGLEMAPS_KEY

  const [cities, setCities] = useState([])
  const [lat, setLat] = useState()
  const [long, setLong] = useState()
  const [location, setLocation] = useState('')
  const [airports, setAirports] = useState([])
  const [quotes, setQuotes] = useState([])
  const [places, setPlaces] = useState([])
  const [carriers, setCarriers] = useState([])
  const [airport, setAirport] = useState([])
  const [allAirports, setAllAirports] = useState([])


  //performs api call to get nearest cities to the latitude and longitude from getLocation useEffect.
  //Filters by cities with minimum population of 250,000 in a radius of 100 miles.
  const getCities = () => {
    axios.get(`https://wft-geo-db.p.rapidapi.com/v1/geo/locations/${location}/nearbyCities?minPopulation=100000&limit=5&offset=0&radius=100&sort=-population`,
      {
        headers: {
          "x-rapidapi-key": `${geoDbKey}`,
        },
      }).then(res => {
        setCities((res.data.data).filter((place) => place.type === 'CITY').map((city) => city.city))
      })
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
      }).then(res => {
        setAirports(res.data.items)
        setAirport(res.data.items.map(airport => airport.iata))
      })
  }

  const getClosestAirports = () => {
    axios.get(`/api/airports/${cities[0]}`).then(res => {
      props.airportSearch(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  const getFlights = () => {
    axios.get(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/${airport[0]}-iata/anywhere/anytime/`, {
      headers: {
        'x-rapidapi-key': `${skyscannerKey}`
      }
    }).then((res) => {
      setQuotes(res.data.Quotes)
      setPlaces(res.data.Places)
      setCarriers(res.data.Carriers)
    })
  }

  useEffect(() => {
    async function getLocation() {
      const location = await axios.post(
        `https://www.googleapis.com/geolocation/v1/geolocate?key=${googleKey}`);
      setLat(location.data.location.lat)
      setLong(location.data.location.lng)
      setLocation(`${location.data.location.lat.toFixed(4)}${location.data.location.lng.toFixed(4)}`)
    }
    getLocation();
  }, [])

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
      getClosestAirports(cities[0])
    }
  }, [cities])

  useEffect(() => {
    if (airport.length > 0) {
      props.updateLocation({ long, lat })
      getFlights(airports)
      axios.get('/api/airports').then(res => setAllAirports(res.data))
    }
  }, [airport])


  const flights = quotes.map((quote) => {
    let destinationId = places.findIndex(place => place.PlaceId === quote.OutboundLeg.DestinationId)
    let carrierId = carriers.findIndex(carrier => carrier.CarrierId === quote.OutboundLeg.CarrierIds)

    return { ...quote, ...places[destinationId], ...carriers[carrierId] }
  })


  const flightCards = flights.map((flight) => {
    return (
      <div key={flight.QuoteId} className='flight-card'>
        <h3>{flight.CityName}</h3>
        <h1>${flight.MinPrice}</h1>
      </div>
    )
  })


  const deals = [flightCards[0], flightCards[1], flightCards[2]]

  const markers = flights.map((flight) => {
    let airportId = allAirports.findIndex(airport => airport.code == flight.IataCode)

    return { ...flight, ...allAirports[airportId] }
  })

  const geoJson = markers.map((marker) => {
    return (
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [marker.lat, marker.lon]
        },
        "properties": {
          "name": marker.city
        }
      }
    )
  })

  // console.log(geoJson)

  return (
    <div className='landing'>
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

      <div className='triangle'></div>

      <div className="mini-map-div">
        {long ?
          <MiniMap
            long={long}
            lat={lat}
            // flightMinPrice = {flightMinPrice}
          />
          :
          <ClipLoader color={'#cae00d'} />}
      </div>

      <div className='deals-container'>
        {deals}
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

export default withRouter(connect(mapStateToProps, { airportSearch, updateLocation })(Landing));
