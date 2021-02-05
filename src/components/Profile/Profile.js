import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { withRouter, Link } from "react-router-dom";
import "./profile.css";
import moment from "moment";
import { Context } from "../../context/context";
import Header from "../Landing/Header/Header";
const photos = require("../../photos.json");

const Profile = (props) => {
    const context = useContext(Context)
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

  const flights = context.quotes
    .map((quote) => {
      let destinationId = context.places.findIndex(
        (place) => place.PlaceId === quote.OutboundLeg.DestinationId
      );
      let carrierId = context.carriers.findIndex(
        (carrier) => carrier.CarrierId === quote.OutboundLeg.CarrierIds[0]
      );
      return {
        ...quote,
        ...context.places[destinationId],
        ...context.carriers[carrierId],
      };
    })
    .map((flight) => {

      let airportId = context.allAirports.findIndex((airport) => airport.code == flight.IataCode)
      return { ...flight, ...context.allAirports[airportId] }})
    
    const suggested = flights.slice(0, 10)
    
    const suggestedCards = suggested.map(flight => {
        flight['photo'] = photos[Math.floor(Math.random() * photos.length)].url
        return (
        <div key={flight.QuoteId} className='profile-flight-card'>
          <span className='profile-image-container'>
            <img className='profile-card-image' src={flight.photo} alt='preview'/>
          </span>
          <span className='mini-info-container'>
            <div className='mini-info-div'>
              <h1>{flight.CityName}</h1>
              <h4>{moment(flight.OutboundLeg.DepartureDate).format('MMM Do YYYY')}</h4>
              {/* <h4>{`${flight.Direct ? 'Nonstop' : 'Multiple Stops'} - ${flight.name}`}</h4> */}
              <h4>{flight.Name}</h4>
              <button onClick={()=> context.goToCarrier(flight.Name)} className='book-button'>Book Flight</button>
            </div>
            <div className='mini-price'>
              <h6 className='profile-from'>From</h6>
              <h1> ${flight.MinPrice}</h1>
            </div>
            </span>
          </div>
          <h1>
            <h6>From</h6> ${flight.MinPrice}
          </h1>
        </span>
      </div>
    );
  });

  // function updatePreferred(id, preferred) {
  //     axios.post('/api/updatePreferred')
  //     .then(axios.get('/api/getPreferred'))
  //     .catch(err => console.log(err))
  // }

  const locationsMapped = locations.map((location) => {
    return (
      <div
        className="locs-container"
        style={{
          backgroundImage: `url(${
            photos[Math.floor(Math.random() * photos.length)].url
          })`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="locations">{location.location}</h1>
        <div className="information-container">
          <h2 className="airport">{location.airport}</h2>
          <h2>{location.dates}</h2>
          <h3>Saved: {moment(location.created).fromNow()}</h3>
        </div>
      </div>
    );
  });

  return (
    <div className="background-container">
      <Header />
            <div className='profile-container'>
                <div className='sidebar-container'>
                <div className='user-container'>
                    <div className='pro-container'>
                    <h1>Profile</h1>
                    </div>
                    <h2><h2 className='email'>Email:</h2>{email}</h2>
                    <h2><h2 className='pref'>Preferred Airport:</h2>{preferred}</h2>
                </div>
                <div className='suggested-container'>
                    <Link to='/map'>
                        <h3 className='links-profile'>View Map</h3>
                    </Link>
                    <Link to='/'>
                        <h3 className='home'>Home</h3>
                    </Link>
                    <div className='line'></div>
                    <h3>Suggested Trips</h3>
                    {suggestedCards}
                </div> 
                </div>
                <div className='locations-container'>
                    <div className='input-container'>
                        <h1>My Trips</h1>
                        {/* <input className='search-trips-input' placeholder='Search My Trips'/> */}
                    </div>
                        <div className='locations-mapped'>
                            {locationsMapped}
                        </div>
                </div>
            </div>
            <h2>
              <h2 className="email">Email:</h2>
              {email}
            </h2>
            <h2>
              <h2 className="pref">Preferred Airport:</h2>
              {preferred}
            </h2>
          </div>
          <div className="suggested-container">
            <Link to="/map">
              <h3 className="links-profile">View Map</h3>
            </Link>
            <Link to="/">
              <h3 className="home">Home</h3>
            </Link>
            <div className="line"></div>
            <h3>Suggested Trips</h3>
            {suggestedCards}
          </div>
        </div>
        <div className="locations-container">
          <div className="input-container">
            <h1>My Trips</h1>
            {/* <input className='search-trips-input' placeholder='Search My Trips'/> */}
          </div>
          <div className="locations-mapped">{locationsMapped}</div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Profile);
