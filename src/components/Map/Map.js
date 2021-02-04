import React, { useContext, useEffect, useState, useMemo } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { newSearch } from '../../Redux/searchReducer'
import ReactMapGL, { Marker, GeolocateControl } from 'react-map-gl'
import { ClipLoader } from 'react-spinners'
import './map.css'
import SearchField from './Search Field/SearchField'
import moment from 'moment'
import axios from 'axios'
import { Context } from '../../context/context'
const photos = require('../../photos.json')

function Map(props) {
  const context = useContext(Context)

  const skyscannerKey = process.env.REACT_APP_SKYSCANNER_KEY
  const [airports, setAirports] = useState([])
  const [quotes, setQuotes] = useState([])
  const [places, setPlaces] = useState([])
  const [allAirports, setAllAirports] = useState([])
  const [carriers, setCarriers] = useState([])
 

  const [loading, setLoading] = useState(true)

  //Map State
  const [viewport, setViewport] = useState({
    latitude: +localStorage.getItem('lat'),
    longitude: +localStorage.getItem('long'),
    width: '100%',
    height: '100%',
    zoom: 4
  })
  const [selectedCity, setSelectedCity] = useState(null)

  const useSetViewport = () => {
    setViewport({
      latitude: +localStorage.getItem('lat'),
      longitude: +localStorage.getItem('long'),
      width: '100%',
      height: '100%',
      zoom: 3
    })
  }

  const geolocateControlStyle = {
    right: 10,
    top: 10
  };

  React.useEffect(() => {
    window.addEventListener('resize', useSetViewport)
    return () => {
      window.removeEventListener('resize', useSetViewport)
    }
  }, [])
  //Search State//

  const { budget, location, departureDate, returnDate } = props

  useEffect(() => {
    axios.get(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${location}-iata/anywhere/${departureDate ? departureDate : 'anytime'}/${returnDate ? returnDate : 'anytime'}`, {
      headers: {
        'x-rapidapi-key': `${skyscannerKey}`
      }
    }).then((res) => {
      setQuotes(res.data.Quotes)
      setPlaces(res.data.Places)
      setCarriers(res.data.Carriers)
      setLoading(false)
    }).catch(err=>{
      setLoading(false)
      console.log(err)
    })
    axios.get('/api/airports').then(res => setAllAirports(res.data))

  }, [budget, location, departureDate, returnDate])

  
  const flights = quotes.map((quote) => {
    let destinationId = places.findIndex(place => place.PlaceId === quote.OutboundLeg.DestinationId)
    let carrierId = carriers.findIndex(carrier => carrier.CarrierId === quote.OutboundLeg.CarrierIds[0])
    return { ...quote, ...places[destinationId], ...carriers[carrierId] }
  }).map((flight) => {
    let airportId = allAirports.findIndex(airport => airport.code == flight.IataCode)
    return { ...flight, ...allAirports[airportId] }
  }).filter(flight => flight.MinPrice < budget)

  function goToCarrier(){
    switch(carriers.Name){
      case 'Gulf Air':
        window.location.href = 'https://www.gulfair.com/'
        break;
      case 'Frontier Airlines': 
        window.location.href = 'https://www.flyfrontier.com/'
        break;
      default:
        window.location.href = 'https://www.kayak.com/'
    }
  }




  const flightCards = flights.map(flight => {
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
  )})



  const markers = useMemo(() => flights.map(
    city => (
      <div>{city.lon ?
        <Marker
          key={city.CityName}
          longitude={+city.lon}
          latitude={+city.lat}
          className='marker'>
          <div className='marker-container'>
            <button
              onClick={e => {
                e.preventDefault()
                setSelectedCity(city)
              }}
              className='marker-btn'>
              <p className='price'>${city.MinPrice}</p>
              <img className='marker-icon' src="https://cdn4.iconfinder.com/data/icons/basic-ui-pack-flat-s94-1/64/Basic_UI_Icon_Pack_-_Flat_map_pointer-512.png" />
            </button>
          </div>
        </Marker> : null}
      </div>
    )
  ), [flights]);



  return (
    <div className='map-view'>
      <div className='lower-map-view'>
        <div className='controllers-container'>
          {/* <div className='filter-container'>

                    </div> */}
          <div className='results-search-container'>
            <SearchField />
            <div className='line'></div>
            <div className='results'>
              {loading ?
                <>
                  <h1 className='loading-text'>Finding your results...</h1>
                  <ClipLoader style={{ marginTop: '3rem' }} />
                </>
                :
                <>
                  <div className='suggested-header'>Trips in Your Budget</div>
                  {selectedCity ? (
                    <div>
                      <div key={selectedCity.QuoteId} className='miniMap-flight-card'
                        style={{ border: "solid 5px #f6615c" }}>
                        <span className='image-container'>
                          <img className='flight-card-image' src='https://i.pinimg.com/originals/08/1f/0a/081f0a864808d6efc0883014e802bc25.jpg' />
                        </span>
                        <span className='info-container'>
                          <span>
                            <h1>{selectedCity.CityName}</h1>
                            <h4>{moment(selectedCity.OutboundLeg.DepartureDate).format('MMM Do YYYY')}</h4>
                          </span>
                          <h4>{`${selectedCity.Direct ? 'Nonstop' : 'Multiple Stops'} - ${selectedCity.name}`}</h4>
                          <h1><h6>From</h6> ${selectedCity.MinPrice}</h1>
                        </span>
                      </div>
                      <div className='line' style={{ marginBottom: '20px', marginTop: '20px' }}></div>
                    </div>
                  ) : null}
                  <div>{flightCards}</div>
                </>}
            </div>
          </div>
        </div>


        <div className='map-container'>
          <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            mapStyle='mapbox://styles/nickloverde/ckkew55if03e817o5o2je6rkp'
            //allows us to drag map around and zoom in/out
            onViewportChange={(viewport) => {
              setViewport(viewport)
            }}
          >
         {markers}
         <GeolocateControl
            style={geolocateControlStyle}
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
            fitBoundsOptions= {{linear: true, maxZoom: 3}}
            auto
          />
          </ReactMapGL>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(reduxState) {
  return {
    budget: reduxState.searchReducer.budget,
    location: reduxState.searchReducer.location,
    departureDate: reduxState.searchReducer.departureDate,
    returnDate: reduxState.searchReducer.returnDate,
    long: +reduxState.locationReducer.long,
    lat: +reduxState.locationReducer.lat
  }
}


export default withRouter(connect(mapStateToProps, { newSearch })(Map))