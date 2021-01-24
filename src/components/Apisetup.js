import React, {useState, useEffect} from 'react'
import axios from 'axios'


const Apisetup = () => {
    
    const [quotes, setQuotes] = useState([])
    const [places, setPlaces] = useState([])
    const [carriers, setCarriers] = useState([])

    useEffect(() => {
        axios.get(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/DFW-sky/anywhere/2021-02-05/2021-02-08`, {
            headers: {
                'x-rapidapi-key': `293c8f1306mshd1179b84f5495fdp1624a6jsn253fcf20a6a7`
            }
        })
        .then
        ((res) => {
            setQuotes(res.data.Quotes)
            setPlaces(res.data.Places)
            setCarriers(res.data.Carriers)
        })
    }, [])

    const flights = quotes.map((quote) => {
        let destinationId = places.findIndex(place => place.PlaceId === quote.OutboundLeg.DestinationId)
        let carrierId = carriers.findIndex(carrier => carrier.CarrierId === quote.OutboundLeg.CarrierIds)

        return {...quote, ...places[destinationId], ...carriers[carrierId]}
    })

    const flightCards = flights.map((flight) => {
        return (
            <div key={flight.QuoteId} className='flight-card'>
                <h3>{flight.CityName}</h3>
                <h1>${flight.MinPrice}</h1>
            </div>
        )
    })

    return (
        
        <main>
            <h1>Api Results</h1>
            <div className='flight-results'>{flightCards}</div>
           

        </main>
    )
}

export default Apisetup