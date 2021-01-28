import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import ReactMapGL, { Marker } from 'react-map-gl'
import './minimap.css'

function MiniMap(props) {
    //Map State
    const {lat, long} = props
    const [viewport, setViewport] = useState({
        latitude: lat,
        longitude: long,
        width: '100%',
        height: '100%',
        zoom: 3
    })
    const [selectedCity, setSelectedCity] = useState(null)

    //Search State//
    // const [budget, setBudget] = useState(`$${props.match.params.budget}`)
    // const [where, setWhere] = useState(props.match.params.where)
    // const [when, setWhen] = useState(props.match.params.selectedDate)

    return (
                <div className='mini-map-container'>

                    <div className='mini-map-side-bar'>
                        Suggested routes
                    </div>
                
                    <div className='mini-map'>
                        <ReactMapGL
                            {...viewport}
                            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                            mapStyle='mapbox://styles/nickloverde/ckkew55if03e817o5o2je6rkp'
                            //allows us to drag map around and zoom in/out
                            onViewportChange={(viewport) => { setViewport(viewport) }}>
                        </ReactMapGL>
                    </div>
                        
                        {/* {apicall.map((city) => (
                <Marker 
                key={{}} 
                latitude={{}} 
                longitude={{}}>
                    <button
                    onClick={e => {
                        e.preventDefault()
                        setSelectedCity(city)
                    }}
                    className='marker-btn'>
                        <img src='locIcon' alt='location-icon'/>
                    </button>
                </Marker>
            ))} */}
                </div>
            
       

    )
}

export default withRouter(MiniMap)