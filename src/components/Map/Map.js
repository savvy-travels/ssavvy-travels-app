import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { newSearch } from '../../Redux/searchReducer'
import ReactMapGL, { Marker } from 'react-map-gl'
import './map.css'

function Map(props) {
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
    const [budget, setBudget] = useState(props.budget)
    const [location, setLocation] = useState(props.location)
    const [departureDate, setDepartureDate] = useState(props.departureDate)
    const [arrivalDate, setArrivalDate] = useState(props.arrivalDate)

    return (
        <div className='map-view'>
            <div className='lower-map-view'>
                <div className='controllers-container'>
                    <div className='filter-container'>

                    </div>
                    <div className='results-search-container'>
                        <div className='search-fields'>
                            <input className='map-budget-input' contentEditable={false} onChange={(e) => setBudget(e.target.value)} value={budget} type='text' placeholder='Whats Your Budget?' />
                            <div className='where-when-map-inputs'>
                                <input onChange={(e) => setLocation(e.target.value)} value={location} className='airport-date-inputs' type='text' placeholder='From Where?' />
                                <input onChange={(e) => setDepartureDate(e.target.value)} value={departureDate} className='airport-date-inputs' type='Date' placeholder='When' />
                                <input onChange={(e) => setArrivalDate(e.target.value)} value={arrivalDate} className='airport-date-inputs' type='Date' placeholder='When' />
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

function mapStateToProps(reduxState) {
    return {
        budget: reduxState.searchReducer.budget,
        location: reduxState.searchReducer.location,
        departureDate: reduxState.searchReducer.departureDate,
        arrivalDate: reduxState.searchReducer.arrivalDate
    }
}


export default withRouter(connect(mapStateToProps, { newSearch })(Map))