import React, { useState, useMemo, useEffect, useContext } from 'react'
import { withRouter } from 'react-router-dom'
import ReactMapGL, { Marker, GeolocateControl } from 'react-map-gl'
import moment from 'moment'
import './minimap.css'
import { Context } from '../../../context/context'
const photos = require('../../../photos.json')

function MiniMap(props) {
  const context = useContext(Context)
  
const [suggestedCards, setSuggestedCards] = useState([])
  //Map State
  const { lat, long, flights } = props
  const [selectedCity, setSelectedCity] = useState(null)
  const [viewport, setViewport] = useState({
    latitude: context.lat,
    longitude: context.long,
    width: "100%",
    height: "100%",
    zoom: 3,
  })

  //Liked Trip//



  const suggested = flights.slice(0, 10)

  // console.log(photos[Math.floor(Math.random() * photos.length)])
  
useEffect(()=>{
  setSuggestedCards(suggested.map(flight => {
    flight['photo'] = photos[Math.floor(Math.random() * photos.length)].url
    return (
    <div key={flight.QuoteId} className='miniMap-flight-card'>
      <span className='image-container'>
        <img className='flight-card-image' src={flight.photo} alt='preview'/>
      </span>
      <span className='info-container'>
        <span>
          <h1>{flight.CityName}</h1>
          <h4>{moment(flight.OutboundLeg.DepartureDate).format('MMM Do YYYY')}</h4>
        </span>
          <h4>{`${flight.Direct ? 'Nonstop' : 'Multiple Stops'} - ${flight.name}`}</h4>
          <h4>{flight.Name}</h4>
          <h1><h6>From</h6> ${flight.MinPrice}</h1>
        </span>
      </div>
     )
    }
  )
)},[flights])

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
                console.log(selectedCity)
              }}
              className='marker-btn'>
              <p className='price'>${city.MinPrice}</p>
              <img className='marker-icon' src='https://cdn4.iconfinder.com/data/icons/basic-ui-pack-flat-s94-1/64/Basic_UI_Icon_Pack_-_Flat_map_pointer-512.png'/>
            </button>
          </div>
        </Marker> : null}
      </div>
    )
  ), [flights]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setViewport({
        latitude: lat,
        longitude: long,
        width: "100%",
        height: "100%",
        zoom: 3,
      })
    })
    return () => {
      window.removeEventListener("resize", setViewport)
    }
  }, [])

  const geolocateControlStyle = {
    right: 10,
    top: 10
  };

  return (
    <div className='mini-map-container'>
      <div className='mini-map-side-bar'>
        <div className='suggestion-title'>

          {selectedCity ? (
            <div className='popup'>

              <img className='popup-img' src='https://assets.cairo360.com/app/uploads/2019/01/getty_583734066_335273.jpg' />

              <h2>City: {selectedCity.CityName}</h2>
              <h3>Price: ${selectedCity.MinPrice}</h3>
              <h4>{(selectedCity.Direct) ? 'Direct' : 'Multiple-stops'
              }</h4>
              <button className='search-button'>Go to Flight</button>
            </div>
          ) : null}
          <h1 className='suggested-header'>Suggested Trips</h1>
          {<div>{suggestedCards}</div>}
        </div>
      </div>

      <div className='mini-map'>
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle='mapbox://styles/nickloverde/ckkew55if03e817o5o2je6rkp'
          //allows us to drag map around and zoom in/out
          onViewportChange={(viewport) => {
            setViewport({ ...viewport })
          }}
        >
          {/* Markers */}
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


  )
}
export default withRouter(MiniMap)
