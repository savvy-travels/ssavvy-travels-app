import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { newSearch } from '../../Redux/searchReducer'
import ReactMapGL, { Marker } from 'react-map-gl'
import './map.css'
import SearchField from './Search Field/SearchField'
import axios from 'axios'

function Map(props) {

    const skyscannerKey = process.env.REACT_APP_SKYSCANNER_KEY
    const [airports, setAirports] = useState([])
    const [quotes, setQuotes] = useState([])
    const [places, setPlaces] = useState([])
    const [allAirports, setAllAirports] = useState([])
    const [carriers, setCarriers] = useState([])

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
    //Search State//
    const { budget, location, departureDate, arrivalDate } = props

    useEffect(() => {
        axios.get(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${location}-iata/anywhere/${departureDate}/${arrivalDate}`, {
            headers: {
                'x-rapidapi-key': `${skyscannerKey}`
            }
        }).then((res) => {
            setQuotes(res.data.Quotes)
            setPlaces(res.data.Places)
            setCarriers(res.data.Carriers)
        })
        axios.get('/api/airports').then(res => setAllAirports(res.data))

    }, [])



    const flights = quotes.map((quote) => {
        let destinationId = places.findIndex(place => place.PlaceId === quote.OutboundLeg.DestinationId)
        let carrierId = carriers.findIndex(carrier => carrier.CarrierId === quote.OutboundLeg.CarrierIds)

        return { ...quote, ...places[destinationId], ...carriers[carrierId] }
    }).filter(flight => flight.MinPrice < budget)

    //   

    const flightCards = flights.map((flight) => {
        return (
            <div key={flight.QuoteId} className='flight-card'>
                <h3>{flight.CityName}</h3>
                <h1>${flight.MinPrice}</h1>
            </div>
        )
    })

    const markers = flights.map((flight) => {
        let airportId = allAirports.findIndex(airport => airport.code == flight.IataCode)

        return { ...flight, ...allAirports[airportId] }
    })

    const geoJson = markers.map((marker) => {
        return (
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [marker.lat, marker.lon]
                },
                "properties": {
                    "name": marker.city
                }
            }
        )
    })

    console.log(geoJson)


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
                            <h1>Mapped Results</h1>
                            <div>{flightCards}</div>
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
        long: +reduxState.locationReducer.long,
        lat: +reduxState.locationReducer.lat
    }
}


export default withRouter(connect(mapStateToProps, { newSearch })(Map))