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
        window.open ('https://www.gulfair.com/', "_blank")
      break;
      case 'Oman Air':
        window.open ('https://www.omanair.com/cn/en', "_blank")
      break;
      case 'Qatar Airways':
        window.open ('https://www.qatarairways.com/en-us/homepage.html', "_blank")
      break;
      case 'Sun Country Airlines':
        window.open ('https://suncountry.com/', "_blank")
      break;
      case 'Qantas':
        window.open ('https://www.qantas.com/us/en.html', "_blank")
      break;
      case 'Volaris':
        window.open ('https://www.volaris.com/', "_blank")
      break;
      case 'French Bee':
        window.open ('https://www.frenchbee.com/', "_blank")
      break;
      case 'GOL Linhas Aéreas':
        window.open ('https://www.voegol.com.br/en', "_blank")
      break;
      case 'Spirit Airlines':
        window.open ('https://www.spirit.com/', "_blank")
      break;
      case 'Alaska Airlines':
        window.open ('https://www.alaskaair.com/', "_blank")
      break;
      case 'Lufthansa':
        window.open ('https://www.lufthansa.com/us/en/homepage', "_blank")
      break;
      case 'Avianca':
        window.open ('https://www.avianca.com/us/en/', "_blank")
      break;
      case 'Emirates':
        window.open ('https://www.emirates.com/us/english/', "_blank")
      break;
      case 'Aeromexico':
        window.open ('https://aeromexico.com/en-us', "_blank")
      break;
      case 'SAS':
        window.open ('https://www.flysas.com/us-en/', "_blank")
      break;
      case 'Iberia':
        window.open ('https://www.iberia.com/us/', "_blank")
      break;
      case 'Brussels Airlines':
        window.open ('https://www.brusselsairlines.com/', "_blank")
      break;
      case 'British Airways':
        window.open ('https://www.britishairways.com/travel/home/public/en_us', "_blank")
      break;
      case 'Frontier Airlines':
        window.open ('https://www.flyfrontier.com/', "_blank")
      break;
      case 'United':
        window.open ('https://www.united.com/en/us', "_blank")
      break;
      case 'jetBlue':
        window.open ('https://www.jetblue.com/', "_blank")
      break;
      case 'Turkish Airlines':
        window.open ('https://www.turkishairlines.com/', "_blank")
      break;
      case 'Air Canada':
        window.open ('https://www.aircanada.com/us/en/aco/home.html', "_blank")
      break;
      case 'Japan Airlines':
        window.open ('https://www.jal.co.jp/ar/en/', "_blank")
      break;
      case 'China Air':
        window.open ('https://www.china-airlines.com/us/en', "_blank")
      break;
      case 'Finnair':
        window.open ('https://www.finnair.com/', "_blank")
      break;
      case 'Korean Air':
        window.open ('https://www.koreanair.com/us/en', "_blank")
      break;
      case 'Air France':
        window.open ('https://www.airfrance.com/indexCom_en.html', "_blank")
      break; 
      case 'Ethiopian Airlines':
        window.open ('https://www.ethiopianairlines.com/us', "_blank")
      break; 
      case 'Copa':
        window.open ('https://www.copaair.com/en/web/us', "_blank")
      break; 
      case 'Iceland Air':
        window.open ('https://www.icelandair.com/', "_blank")
      break; 
      default:
       window.location.href = '/'
    }
  }

  return (
    <div className='mini-map-container'>
      <div className='mini-map-side-bar'>
        <div className='suggestion-title'>
          {selectedCity ? (
            <>
            <div className='sticky-marker'>
              <div
                key={selectedCity.QuoteId}
                className="map-flight-card-selected"
              >
                <span className="map-image-container">
                  <img
                    className="map-flight-card-image"
                    src="https://i.pinimg.com/originals/08/1f/0a/081f0a864808d6efc0883014e802bc25.jpg"
                  />
                </span>
                <span className="map-info-container">
                  <div className="selected-map-info-div">
                    <h1>{selectedCity.CityName}</h1>
                    <h4>
                      {moment(
                        selectedCity.OutboundLeg.DepartureDate
                      ).format("MMM Do YYYY")}
                    </h4>
                    <h4>{`${selectedCity.Direct ? "Direct - " : ""}${
                      selectedCity.name
                    }`}</h4>
                  </div>
                  <h1>
                    <h6>From</h6> ${selectedCity.MinPrice}
                  </h1>
                </span>
              </div>
            </div>
            <div className="mini-map-line"></div>
          </>
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
