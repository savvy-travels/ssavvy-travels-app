import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { newSearch } from '../../Redux/searchReducer'
import ReactMapGL, { Marker } from 'react-map-gl'
import './map.css'
import SearchField from './Search Field/SearchField'

function Map(props) {
    //Map State
    const [viewport, setViewport] = useState({
        latitude: props.lat,
        longitude: props.long,
        width: '100%',
        height: '100%',
        zoom: 4
    })
    const [selectedCity, setSelectedCity] = useState(null)

    console.log(props.lat, props.long)
    const useSetViewport = () => {
        setViewport({
            latitude: props.lat,
            longitude: props.long,
            width: '100%',
            height: '100%',
            zoom: 3
        })
    }

    React.useEffect(() => {
        window.addEventListener('resize', useSetViewport)
        return () => {
            window.removeEventListener('resize', useSetViewport)
        }
    }, [])


    return (
        <div className='map-view'>
            <div className='lower-map-view'>
                <div className='controllers-container'>
                    {/* <div className='filter-container'>

                    </div> */}
                    <div className='results-search-container'>
                        <SearchField />
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
        arrivalDate: reduxState.searchReducer.arrivalDate,
        long: +reduxState.searchReducer.long,
        lat: +reduxState.searchReducer.lat
    }
}


export default withRouter(connect(mapStateToProps, { newSearch })(Map))