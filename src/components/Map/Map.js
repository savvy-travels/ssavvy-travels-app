import React, { useState, } from 'react'
import { withRouter } from 'react-router-dom'
import ReactMapGL, { Marker } from 'react-map-gl'
import locIcon from './loc-icon.png'
import './map.css'
import Header from '../Landing/Header/Header'

function Map() {
    //Map State
    const [viewport, setViewport] = useState({
        latitude: 39.742043,
        longitude: -104.991531,
        width: '100%',
        height: '100%',
        zoom: 4
    })
    const [selectedCity, setSelectedCity] = useState(null)

    //Search State//
    const [budget, setBudget] = useState(undefined)
    const [where, setWhere] = useState(undefined)
    const [when, setWhen] = useState(undefined)

    return (
        <div className='map-view'>
            <Header />
            <div className='lower-map-view'>
                <div className='controllers-container'>
                    <div className='filter-container'>

                    </div>
                    <div className='results-search-container'>
                        <div className='search-fields'>
                            <input type='text' placeholder='Whats Your Budget?' />
                            <div className='where-when-map-inputs'>
                                <input className='airport-date-inputs' type='text' placeholder='From Where?' />
                                <input className='airport-date-inputs' type='Date' placeholder='When' />
                            </div>
                        </div>
                        <div className='line'></div>
                        <div>
                            <h1>Mapped Results</h1>
                        </div>
                    </div>
                </div>
                <div className='map-container'>
                    <ReactMapGL
                        {...viewport}
                        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                        mapStyle='mapbox://styles/nickloverde/ckkew55if03e817o5o2je6rkp'
                        //allows us to drag map around and zoom in/out
                        onViewportChange={(viewport) => { setViewport(viewport) }}
                    >
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
                    </ReactMapGL>
                </div>
            </div>
        </div>

    )
}

export default withRouter(Map)