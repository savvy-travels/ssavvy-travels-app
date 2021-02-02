import React, { useContext } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { airportSearch } from '../../Redux/searchReducer'
import { updateLocation } from '../../Redux/locationReducer'
import { connect } from "react-redux";
import "./landing.css";
import { Context } from '../../context/context'
import NewSearch from "./NewSearch/NewSearch";
import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
import MiniMap from "./MiniMap/MiniMap"
import Work from "./Works/Works"
import { ClipLoader } from 'react-spinners'
require("dotenv").config();



function Landing(props) {

  const context = useContext(Context)
  console.log(context)

  const flights = context.quotes.map((quote) => {
    let destinationId = context.places.findIndex(place => place.PlaceId === quote.OutboundLeg.DestinationId)
    let carrierId = context.carriers.findIndex(carrier => carrier.CarrierId === quote.OutboundLeg.CarrierIds)
    return { ...quote, ...context.places[destinationId], ...context.carriers[carrierId] }
  }).map((flight) => {
    let airportId = context.allAirports.findIndex(airport => airport.code == flight.IataCode)
    return { ...flight, ...context.allAirports[airportId] }
  })
  // console.log(flights)


  const flightCards = flights.map((flight) => {
    return (
      <div key={flight.QuoteId} className='flight-card'>
        <h3>{flight.CityName}</h3>
        <h1>${flight.MinPrice}</h1>
      </div>
    )
  })
  

  const under200 = flights.filter(flight => flight.MinPrice >= 175 && flight.MinPrice <= 200).map((flight) => {
    return (
      <div key={flight.QuoteId} className='flight-card'>
        <h3>{flight.CityName}</h3>
        <h1>${flight.MinPrice}</h1>
      </div>
    )
  }).slice(0, 4)

  const under400 = flights.filter(flight => flight.MinPrice > 375 && flight.MinPrice <= 400).map((flight) => {
    return (
      <div key={flight.QuoteId} className='flight-card'>
        <h3>{flight.CityName}</h3>
        <h1>${flight.MinPrice}</h1>
      </div>
    )
  }).slice(0, 4)

  const under600 = flights.filter(flight => flight.MinPrice > 500 && flight.MinPrice <= 600).map((flight) => {
    return (
      <div key={flight.QuoteId} className='flight-card'>
        <h3>{flight.CityName}</h3>
        <h1>${flight.MinPrice}</h1>
      </div>
    )
  }).slice(0, 4)

  const under800 = flights.filter(flight => flight.MinPrice > 725 && flight.MinPrice <= 800).map((flight) => {
    return (
      <div key={flight.QuoteId} className='flight-card'>
        <h3>{flight.CityName}</h3>
        <h1>${flight.MinPrice}</h1>
      </div>
    )
  }).slice(0, 4)

  const under1000 = flights.filter(flight => flight.MinPrice > 800 & flight.MinPrice <= 1000).map((flight) => {
    return (
      <div key={flight.QuoteId} className='flight-card'>
        <h3>{flight.CityName}</h3>
        <h1>${flight.MinPrice}</h1>
      </div>
    )
  }).slice(0, 4)

  console.log(under200)

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
        {context.long ?
          <MiniMap
            long={context.long}
            lat={context.lat}
            flights={flights}
          />
          :
          <ClipLoader color={'#cae00d'} />}
      </div>

      <div className='deals-container'>
        <div className='suggestions'>$200{under200}</div>
        <div className='suggestions'>$400{under400}</div>
        <div className='suggestions'>$600{under600}</div>
        <div className='suggestions'>$800{under800}</div>
        <div className='suggestions'>$1000{under1000}</div>        
      </div>
      <Work />
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
