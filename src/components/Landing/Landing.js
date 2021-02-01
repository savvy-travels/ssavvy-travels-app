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

  const deals = [flightCards[0], flightCards[1], flightCards[2]]

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
