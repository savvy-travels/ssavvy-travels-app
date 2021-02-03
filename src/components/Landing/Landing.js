import React, { useContext } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { airportSearch } from '../../Redux/searchReducer'
import { connect } from "react-redux";
import "./landing.css";
import { Context } from '../../context/context'
import NewSearch from "./NewSearch/NewSearch";
import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
import MiniMap from "./MiniMap/MiniMap"
import Work from "./Works/Works"
import CarouselComp from "./Carousel/Carousel";
import { ClipLoader } from 'react-spinners'
import axios from "axios";
require("dotenv").config();
const async = require('async')



function Landing(props) {

  const context = useContext(Context)

  // console.log(context.allAirports)

  // Find Flights based off of your airport location 
  const flights = context.quotes.map((quote) => {
    quote['saved'] = false
    let destinationId = context.places.findIndex(place => place.PlaceId === quote.OutboundLeg.DestinationId)
    let carrierId = context.carriers.findIndex(carrier => carrier.CarrierId === quote.OutboundLeg.CarrierIds)
    return { ...quote, ...context.places[destinationId], ...context.carriers[carrierId] }
  }).map((flight) => {
    let airportId = context.allAirports.findIndex(airport => airport.code == flight.IataCode)
    return { ...flight, ...context.allAirports[airportId] }
  })
  // console.log(flights)








  // const images = data.map(place => place.query.pages[0].thumbnail.source)
  // console.log(images)



  return (
    <div className='landing'>
      <video
        className='video'
        src='https://colab-image-assets.s3-us-west-1.amazonaws.com/DevMtn-Air-New.mp4'
        type='video/mp4'
        autoPlay
        loop
        muted
      ></video>
      {!context.loading ?
        <Switch>
          <Route exact path='/' component={NewSearch} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
        </Switch>
        :
        <div className='search-field'>
          <h1>Welcome to Savvy Travels</h1>
        </div>
      }

      <div className='triangle'></div>

      <div className='mini-map-div'>
        {!context.loading ? (
          <MiniMap
            wait={8000}
            long={context.long}
            lat={context.lat}
            flights={flights}
          />
        ) : (
            <>
              <ClipLoader color={"#cae00d"} />
              <br></br>
              <h1>Loading Map...</h1>
            </>
          )}
      </div>
      <div className='landing-line'></div>
      <CarouselComp flights={flights} />
      <div className='landing-line'></div>
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

export default withRouter(connect(mapStateToProps, { airportSearch })(Landing));
