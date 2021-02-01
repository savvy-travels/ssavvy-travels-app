import React, { useState, useMemo, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import './minimap.css'

function MiniMap(props) {
  //Map State
  const { lat, long, flights } = props
  const [selectedCity, setSelectedCity] = useState(null)
  
  const [viewport, setViewport] = useState({
    latitude: lat,
    longitude: long,
    width: "100%",
    height: "100%",
    zoom: 3,
  })

  const suggested = [flights[0], flights[1], flights[2]]

  const suggestedCards = suggested.map(flight => (
    <div key={flight.QuoteId} className='flight-card'>
      <h3>{flight.CityName}</h3>
      <h1>${flight.MinPrice}</h1>
    </div>
  ))

  const markers = useMemo(() => flights.map(
    city => (
        <div>{city.lon ? <Marker key={city.CityName} longitude={+city.lon} latitude={+city.lat} >
             <button
                onClick={e => {
                    e.preventDefault()
                    setSelectedCity(city)
                    console.log(selectedCity)
                }}
                className='marker-btn'>
                    <p>{city.MinPrice}</p>
                    <img className='marker-icon' src="https://cdn4.iconfinder.com/data/icons/basic-ui-pack-flat-s94-1/64/Basic_UI_Icon_Pack_-_Flat_map_pointer-512.png"/>
            </button>
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
 
  return (
    <div className='mini-map-container'>
      <div className='mini-map-side-bar'>
        <div className='suggestion-title'>
        {selectedCity ? (
                <div className='popup'>
                    <img src='data:image/jpeg;base64,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'/>
                    <button>Go to Flight</button>
                    <button
                        // onClick= {isLoggedIn ? saveLocation to profile : Link to register page>Add to favorites}
                    >
                        {/* <img src='plus-icon'/> */}
                    </button>
                </div>
            // </Popup>
         ) : null}
          <h1>Suggested Trips</h1>
          <div>{suggestedCards}</div>
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
      
        {/* Pop Up */}
        {selectedCity ? (
            // <Popup 
            //     latitude={+selectedCity.lat} 
            //     longitude={+selectedCity.lon}
            // >
                <div className='popup'>
                    <img src=''/>
                    {/* <h1>{selectedCity.}</h1> */}
                    {/* <h2>{selectedCity.MinPrice}</h2> */}
                    <button>Go to Flight</button>
                    <button
                        // onClick= {isLoggedIn ? saveLocation to profile : Link to register page>Add to favorites}
                    >
                        {/* <img src='plus-icon'/> */}
                    </button>
                </div>
            // </Popup>
         ) : null}
        </ReactMapGL>
      </div>


    </div>


    )
}
export default withRouter(MiniMap)
