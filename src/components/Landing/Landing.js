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

  console.log(context.allAirports)

  const flights = context.quotes.map((quote) => {
    let destinationId = context.places.findIndex(place => place.PlaceId === quote.OutboundLeg.DestinationId)
    let carrierId = context.carriers.findIndex(carrier => carrier.CarrierId === quote.OutboundLeg.CarrierIds)
    return { ...quote, ...context.places[destinationId], ...context.carriers[carrierId] }
  }).map((flight) => {
    let airportId = context.allAirports.findIndex(airport => airport.code == flight.IataCode)
    return { ...flight, ...context.allAirports[airportId] }
  })
  console.log(flights)


  const flightCards = flights.map((flight) => {
    return (
      <div key={flight.QuoteId} className='flight-card'>
        <h3>{flight.CityName}</h3>
        <h1>${flight.MinPrice}</h1>
      </div>
    )
  })


  const under200 = flights.filter(flight => flight.MinPrice >= 100 && flight.MinPrice <= 200).map((flight) => {
    return (
      <div key={flight.QuoteId} className='flight-card'>
        <h3>{flight.CityName}</h3>
        <h1>${flight.MinPrice}</h1>
      </div>
    )
  }).slice(0, 7)

  const under400 = flights.filter(flight => flight.MinPrice > 375 && flight.MinPrice <= 400).map((flight) => {
    return (
      <div key={flight.QuoteId} className='flight-card'>
        <h3>{flight.CityName}</h3>
        <h1>${flight.MinPrice}</h1>
      </div>
    )
  }).slice(0, 7)

  const under600 = flights.filter(flight => flight.MinPrice > 500 && flight.MinPrice <= 600).map((flight) => {
    return (
      <div key={flight.QuoteId} className='flight-card'>
        <h3>{flight.CityName}</h3>
        <h1>${flight.MinPrice}</h1>
      </div>
    )
  }).slice(0, 7)

  const under800 = flights.filter(flight => flight.MinPrice > 700 && flight.MinPrice <= 800).map((flight) => {

    return (
      <div key={flight.QuoteId} className='flight-card'>
        <h3>{flight.CityName}</h3>
        <h1>${flight.MinPrice}</h1>
      </div>
    )
  }).slice(0, 7)

  const under1000 = flights.filter(flight => flight.MinPrice > 800 & flight.MinPrice <= 1000).map((flight) => {
    return (
      <div key={flight.QuoteId} className='flight-card'>
        <h3>{flight.CityName}</h3>
        <h1>${flight.MinPrice}</h1>
      </div>
    )
  }).slice(0, 7)

  console.log(under200)

  return (
    <div className='landing'>
      <video
        className='video'
        src='https://colab-image-assets.s3-us-west-1.amazonaws.com/DevMtn-Air.mp4'
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

      <div className='deals-container'>
        <div className='suggestions'>
          <div className='banner'>
            <h1 className='banner-price'>$200</h1>
            <div className='banner-flight'> {under200[0]}</div>
          </div>
          <div className='flights'>
            <div className='flights-1'>{under200.slice(1, 3)}</div>
            <div className='flights-1'>{under200.slice(3, 5)}</div>
            <div className='flights-1'>{under200.slice(5, 7)}</div>
          </div>
        </div>
      </div>

      <div className='deals-container'>
        <div className='suggestions'>
          <div className='flights'>
            <div className='flights-1'>{under400.slice(1, 3)}</div>
            <div className='flights-1'>{under400.slice(3, 5)}</div>
            <div className='flights-1'>{under400.slice(5, 7)}</div>
          </div>
          <div className='banner'>
            <h1 className='banner-price'>$400</h1>
            <div className='banner-flight'> {under400[0]}</div>
          </div>
        </div>
      </div>

      <div className='deals-container'>
        <div className='suggestions'>
          <div className='banner'>
            <h1 className='banner-price'>$600</h1>
            <div className='banner-flight'> {under600[0]}</div>
          </div>
          <div className='flights'>
            <div className='flights-1'>{under600.slice(1, 3)}</div>
            <div className='flights-1'>{under600.slice(3, 5)}</div>
            <div className='flights-1'>{under600.slice(5, 7)}</div>
          </div>
        </div>
      </div>

      <div className='deals-container'>
        <div className='suggestions'>
          <div className='flights'>
            <div className='flights-1'>{under800.slice(1, 3)}</div>
            <div className='flights-1'>{under800.slice(3, 5)}</div>
            <div className='flights-1'>{under800.slice(5, 7)}</div>
          </div>
          <div className='banner'>
            <h1 className='banner-price'>$800</h1>
            <div className='banner-flight'> {under800[0]}</div>
          </div>
        </div>
      </div>

      <div className='deals-container'>
        <div className='suggestions'>
          <div className='banner'>
            <h1 className='banner-price'>$1000</h1>
            <div className='banner-flight'> {under1000[0]}</div>
          </div>
          <div className='flights'>
            <div className='flights-1'>{under1000.slice(1, 3)}</div>
            <div className='flights-1'>{under1000.slice(3, 5)}</div>
            <div className='flights-1'>{under1000.slice(5, 7)}</div>
          </div>
        </div>
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
