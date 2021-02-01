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

  const markers = useMemo(() => flights.map(
    city => (
        <div>{city.lon ? <Marker key={city.CityName} longitude={+city.lon} latitude={+city.lat} >
             <button
                onClick={e => {
                    e.preventDefault()
                    setSelectedCity(city.CityName)
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
          <h1>Suggested Trips</h1>
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
            <Popup 
                latitude={selectedCity.city.lat} 
                longitude={selectedCity.city.lon}
            >
                <div>
                    {/* <img src=''/>
                    <h1>{selectedCity.}</h1>
                    <h2>{selectedCity.MinPrice}</h2> */}
                    <button>Go to Flight</button>
                    <button
                        // onClick= {isLoggedIn ? saveLocation to profile : Link to register page>Add to favorites}
                    >
                        {/* <img src='plus-icon'/> */}
                    </button>
                </div>
            </Popup>
            ) : null}
        </ReactMapGL>
      </div>




    </div>


    )
}
export default withRouter(MiniMap)
