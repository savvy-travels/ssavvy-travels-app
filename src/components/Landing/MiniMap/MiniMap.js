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


  
useEffect(()=>{
  setSuggestedCards(suggested.map(flight => {
    flight['photo'] = photos[Math.floor(Math.random() * photos.length)].url
    return (
    <div key={flight.QuoteId} className='miniMap-flight-card'>
      <span className='image-container'>
        <img className='flight-card-image' src={flight.photo} alt='preview'/>
      </span>
      <span className='mini-info-container'>
        <div className='mini-info-div'>
          <h1>{flight.CityName}</h1>
          <h4>{moment(flight.OutboundLeg.DepartureDate).format('MMM Do YYYY')}</h4>
          <h4>{`${flight.Direct ? 'Nonstop' : 'Multiple Stops'} - ${flight.name}`}</h4>
          <h4>{flight.Name}</h4>
        </div>
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


  const goToCarrier = (carrier) => {
    switch(carrier) {
      case 'Gulf Air':
        window.location.href='https://www.gulfair.com/'
      break;
      case 'Oman Air':
        window.location.href='https://www.omanair.com/cn/en'
      break;
      case 'Qatar Airways':
        window.location.href='https://www.qatarairways.com/en-us/homepage.html'
      break;
      case 'Sun Country Airlines':
        window.location.href='https://suncountry.com/'
      break;
      case 'Qantas':
        window.location.href='https://www.qantas.com/us/en.html'
      break;
      case 'Volaris':
        window.location.href='https://www.volaris.com/'
      break;
      case 'French Bee':
        window.location.href='https://www.frenchbee.com/'
      break;
      case 'GOL Linhas Aéreas':
        window.location.href='https://www.voegol.com.br/en'
      break;
      case 'Spirit Airlines':
        window.location.href='https://www.spirit.com/'
      break;
      case 'Alaska Airlines':
        window.location.href='https://www.alaskaair.com/'
      break;
      case 'Lufthansa':
        window.location.href='https://www.lufthansa.com/us/en/homepage'
      break;
      case 'Avianca':
        window.location.href='https://www.avianca.com/us/en/'
      break;
      case 'Emirates':
        window.location.href='https://www.emirates.com/us/english/'
      break;
      case 'Aeromexico':
        window.location.href='https://aeromexico.com/en-us'
      break;
      case 'SAS':
        window.location.href='https://www.flysas.com/us-en/'
      break;
      case 'Iberia':
        window.location.href='https://www.iberia.com/us/'
      break;
      case 'Brussels Airlines':
        window.location.href='https://www.brusselsairlines.com/'
      break;
      case 'British Airways':
        window.location.href='https://www.britishairways.com/travel/home/public/en_us'
      break;
      case 'Frontier Airlines':
        window.location.href='https://www.flyfrontier.com/'
      break;
      case 'United':
        window.location.href='https://www.united.com/en/us'
      break;
      case 'jetBlue':
        window.location.href='https://www.jetblue.com/'
      break;
      case 'Turkish Airlines':
        window.location.href='https://www.turkishairlines.com/'
      break;
      case 'Air Canada':
        window.location.href='https://www.aircanada.com/us/en/aco/home.html'
      break;
      case 'Japan Airlines':
        window.location.href='https://www.jal.co.jp/ar/en/'
      break;
      case 'China Air':
        window.location.href='https://www.china-airlines.com/us/en'
      break;
      case 'Finnair':
        window.location.href='https://www.finnair.com/'
      break;
      case 'Korean Air':
        window.location.href='https://www.koreanair.com/us/en'
      break;
      case 'Air France':
        window.location.href='https://www.airfrance.com/indexCom_en.html'
      break; 
      case 'Ethiopian Airlines':
        window.location.href='https://www.ethiopianairlines.com/us'
      break; 
      case 'Copa':
        window.location.href='https://www.copaair.com/en/web/us'
      break; 
      case 'Iceland Air':
        window.location.href='https://www.icelandair.com/'
      break; 
      default:
       window.location.href='/'
    }
  }

  return (
    <div className='mini-map-container'>
      <div className='mini-map-side-bar'>
        <div className='suggestion-title'>
          {selectedCity ? (
            <div className='popup'>

              <img className='popup-img' src='https://assets.cairo360.com/app/uploads/2019/01/getty_583734066_335273.jpg' alt='' />

              <h2>City: {selectedCity.CityName}</h2>
              <h3>Price: ${selectedCity.MinPrice}</h3>
              <h4>{(selectedCity.Direct) ? 'Direct' : 'Multiple-stops'
              }</h4>
              <button className='search-button' onClick={() => goToCarrier(selectedCity.Name)}>Go to Flight</button>
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
