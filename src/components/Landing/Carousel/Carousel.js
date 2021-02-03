import React, { useState } from 'react'
import Carousel, { Dots } from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'
import './carousel.css'


function CarouselComp(props) {
    const [component, setComponent] = useState(1)
    const [value, setValue] = useState(0)


    const { flights } = props

    function onChange(value) {
        setValue(value)
    }
    function setNegativeValue() {
        if (value > 0) {
            setValue(value - 1)
        }
    }

    function setPositiveValue() {
        if (value < 4) {
            setValue(value + 1)
        }
    }
    const under200 = flights.filter(flight => flight.MinPrice >= 175 && flight.MinPrice <= 200).map((flight) => {
        return (
            <div key={flight.QuoteId} className='flight-card'>
                <div className='name-price-container'>
                    <h2>{flight.CityName}</h2>
                    <h1>${flight.MinPrice}</h1>
                </div>
            </div>
        )
    }).slice(0, 7)

    const under400 = flights.filter(flight => flight.MinPrice > 375 && flight.MinPrice <= 400).map((flight) => {
        return (
            <div key={flight.QuoteId} className='flight-card'>
                <div className='name-price-container'>
                    <h2>{flight.CityName}</h2>
                    <h1>${flight.MinPrice}</h1>
                </div>
            </div>
        )
    }).slice(0, 7)

    const under600 = flights.filter(flight => flight.MinPrice > 500 && flight.MinPrice <= 600).map((flight) => {
        return (
            <div key={flight.QuoteId} className='flight-card'>
                <div className='name-price-container'>
                    <h2>{flight.CityName}</h2>
                    <h1>${flight.MinPrice}</h1>
                </div>
            </div>
        )
    }).slice(0, 7)

    const under800 = flights.filter(flight => flight.MinPrice > 700 && flight.MinPrice <= 800).map((flight) => {

        return (
            <div key={flight.QuoteId} className='flight-card'>
                <div className='name-price-container'>
                    <h2>{flight.CityName}</h2>
                    <h1>${flight.MinPrice}</h1>
                </div>
            </div>
        )
    }).slice(0, 7)

    const under1000 = flights.filter(flight => flight.MinPrice > 800 & flight.MinPrice <= 1000).map((flight) => {
        return (
            <div key={flight.QuoteId} className='flight-card'>
                <div className='name-price-container'>
                    <h2>{flight.CityName}</h2>
                    <h1>${flight.MinPrice}</h1>
                </div>
            </div>
        )
    }).slice(0, 7)

    return (
        <>
            <div className='carousel-view'>
                <div className='arrow-container'>
                    {value === 0 ? null : <div onClick={() => setNegativeValue()} className={'carousel-arrow left'}></div>}
                </div>
                <Carousel value={value} onChange={onChange} >
                    <div className='suggestions'>
                        <div className='banner'>
                            <h1 className='banner-price'>Flights under $200</h1>
                            {under200[0]}
                        </div>
                        <div className='flights'>
                            <div className='flights-1'>{under200.slice(1, 4)}</div>
                            <div className='flights-1'>{under200.slice(4, 7)}</div>
                        </div>
                    </div>
                    <div className='suggestions'>
                        <div className='flights'>
                            <div className='flights-1'>{under400.slice(1, 4)}</div>
                            <div className='flights-1'>{under400.slice(4, 7)}</div>
                        </div>
                        <div className='banner'>
                            <h1 className='banner-price'>Flights under $400</h1>
                            {under400[0]}
                        </div>
                    </div>
                    <div className='suggestions'>
                        <div className='banner'>
                            <h1 className='banner-price'>Flights under $600</h1>
                            {under600[0]}
                        </div>
                        <div className='flights'>
                            <div className='flights-1'>{under600.slice(1, 4)}</div>
                            <div className='flights-1'>{under600.slice(4, 7)}</div>
                        </div>
                    </div>
                    <div className='suggestions'>
                        <div className='flights'>
                            <div className='flights-1'>{under800.slice(1, 4)}</div>
                            <div className='flights-1'>{under800.slice(4, 7)}</div>
                        </div>
                        <div className='banner'>
                            <h1 className='banner-price'>Flights under $800</h1>
                            {under800[0]}
                        </div>
                    </div>
                    <div className='suggestions'>
                        <div className='banner'>
                            <h1 className='banner-price'>Flights under $1000</h1>
                            {under1000[0]}
                        </div>
                        <div className='flights'>
                            <div className='flights-1'>{under1000.slice(1, 4)}</div>
                            <div className='flights-1'>{under1000.slice(4, 7)}</div>
                        </div>
                    </div>
                </Carousel>

                <div className='arrow-container right'>
                    {value === 4 ? null : <div onClick={() => setPositiveValue()} className='carousel-arrow'></div>}
                </div>
            </div >
            <Dots className='dots' value={value} onChange={onChange} thumbnails={[
                (<div className='thumbnail' key={0}></div>),
                (<div className='thumbnail' key={1}></div>),
                (<div className='thumbnail' key={2}></div>),
                (<div className='thumbnail' key={3}></div>),
                (<div className='thumbnail' key={4}></div>),
            ]}></Dots>
        </>
    )
}

export default CarouselComp