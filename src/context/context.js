import axios from 'axios'
import { createContext, useEffect, useState } from 'react'


export const Context = createContext(null)

export function LatProvider(props) {
    const geoDbKey = process.env.REACT_APP_GEODB_KEY;
    const skyscannerKey = process.env.REACT_APP_SKYSCANNER_KEY
    const googleKey = process.env.REACT_APP_GOOGLEMAPS_KEY

    const [latLong, setLatLong] = useState({ lat: undefined, long: undefined })
    const [location, setLocation] = useState('')
    const [cities, setCities] = useState([])
    const [airports, setAirports] = useState([])
    const [quotes, setQuotes] = useState([])
    const [places, setPlaces] = useState([])
    const [carriers, setCarriers] = useState([])
    const [airport, setAirport] = useState([])
    const [allAirports, setAllAirports] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${googleKey}`)
            .then(res => {
                setLatLong({ lat: res.data.location.lat, long: res.data.location.lng })
                axios.get(`https://wft-geo-db.p.rapidapi.com/v1/geo/locations/${res.data.location.lat.toFixed(4)}${res.data.location.lng.toFixed(4)}/nearbyCities?minPopulation=100000&limit=5&offset=0&radius=100&sort=-population`,
                    {
                        headers: {
                            "x-rapidapi-key": `${geoDbKey}`,
                        },
                    }).then(res => {
                        console.log(res.data.data)
                        setCities((res.data.data).filter((place) => place.type === 'CITY').map((city) => city.city))
                        const city = res.data.data.filter((place) => place.type === 'CITY').map((city) => city.city)
                        axios.get(`https://aerodatabox.p.rapidapi.com/airports/search/term?q=${city}&limit=5`,
                            {
                                headers: {
                                    'x-rapidapi-key': '293c8f1306mshd1179b84f5495fdp1624a6jsn253fcf20a6a7',
                                    'x-rapidapi-host': 'aerodatabox.p.rapidapi.com'
                                }
                            }).then(res => {
                                console.log(res.data.items)
                                setAirports(res.data.items)
                                setAirport(res.data.items.map(airport => airport.iata))
                                axios.get(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/${res.data.items.map(airport => airport.iata)}-iata/anywhere/anytime/`, {
                                    headers: {
                                        'x-rapidapi-key': `${skyscannerKey}`
                                    }
                                }).then((res) => {
                                    setQuotes(res.data.Quotes)
                                    setPlaces(res.data.Places)
                                    setCarriers(res.data.Carriers)
                                    setLoading(false)
                                })

                            }).catch(err => {
                                console.log(err)
                            })
                    }).catch(err => {
                        console.log(err)
                    })
            }).catch(err => [
                console.log(err)
            ])
    }, [])

    // runs getCities function if the location is defined
    // useEffect(() => {
    //     if (location.length > 0) {
    //         getCities(location)
    //     }
    // }, [location]);

    // //gets airports if cities is defined
    // useEffect(() => {
    //     if (cities.length > 0) {
    //         getAirports(cities[0])
    //     }
    // }, [cities])

    // useEffect(() => {
    //     if (airport.length > 0) {
    //         getFlights(airports)
    //         axios.get('/api/airports').then(res => setAllAirports(res.data))
    //     }
    // }, [airport])


    // const getCities = () => {
    //     axios.get(`https://wft-geo-db.p.rapidapi.com/v1/geo/locations/${location}/nearbyCities?minPopulation=100000&limit=5&offset=0&radius=100&sort=-population`,
    //         {
    //             headers: {
    //                 "x-rapidapi-key": `${geoDbKey}`,
    //             },
    //         }).then(res => {
    // setCities((res.data.data).filter((place) => place.type === 'CITY').map((city) => city.city))
    //             getAirports(cities[0])
    //         })
    //     //sets the value of cities to be only the city name, filters out results of non-cities
    // };

    //gets airports from an api call that searches nearest the cities defined in getCities
    // const getAirports = (city) => {
    //     axios.get(`https://aerodatabox.p.rapidapi.com/airports/search/term?q=${city}&limit=5`,
    //         {
    //             headers: {
    //                 'x-rapidapi-key': '293c8f1306mshd1179b84f5495fdp1624a6jsn253fcf20a6a7',
    //                 'x-rapidapi-host': 'aerodatabox.p.rapidapi.com'
    //             }
    //         }).then(res => {
    //             setAirports(res.data.items)
    //             setAirport(res.data.items.map(airport => airport.iata))
    //         })
    // }

    // const getFlights = () => {
    //     axios.get(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/${airport[0]}-iata/anywhere/anytime/`, {
    //         headers: {
    //             'x-rapidapi-key': `${skyscannerKey}`
    //         }
    //     }).then((res) => {
    //         setQuotes(res.data.Quotes)
    //         setPlaces(res.data.Places)
    //         setCarriers(res.data.Carriers)
    //     })
    // }


    const flights = quotes.map((quote) => {
        let destinationId = places.findIndex(place => place.PlaceId === quote.OutboundLeg.DestinationId)
        let carrierId = carriers.findIndex(carrier => carrier.CarrierId === quote.OutboundLeg.CarrierIds)
        return { ...quote, ...places[destinationId], ...carriers[carrierId] }
    }).map((flight) => {
        let airportId = allAirports.findIndex(airport => airport.code == flight.IataCode)
        return { ...flight, ...allAirports[airportId] }
    })


    return (
        <Context.Provider value={{ ...latLong, location, quotes, places, carriers, airports, allAirports, airport, flights, cities, loading }}>{props.children}</Context.Provider>
    )
}