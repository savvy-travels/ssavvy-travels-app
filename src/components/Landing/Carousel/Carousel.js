import React, { useState } from 'react'
import Carousel, { Dots } from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'
import './carousel.css'
import { CanvasOverlay } from 'react-map-gl'
const photos = require('../../../photos.json')


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

    const under100 = flights.filter(flight => flight.MinPrice <= 100).map((flight) => {
        return (
            <div key={flight.QuoteId} 
            className='flight-card' 
            style={{
                backgroundImage: `url(${photos[Math.floor(Math.random() * photos.length)].url})`,
                backgroundSize: 'cover'
            }}
            >
                <div className='carrier-container'>
                    <h2>{flight.Name}</h2>
                </div>
                <div className='name-price-container'>
                    <h2>{flight.CityName}</h2>
                    <h1>${flight.MinPrice}</h1>
                </div>
            </div>
        )
    }).reverse().slice(0, 7)

    const under200 = flights.filter(flight => flight.MinPrice > 100 && flight.MinPrice <= 200).map((flight) => {
        return (
            <div key={flight.QuoteId} 
            className='flight-card' 
            style={{
                backgroundImage: `url(${photos[Math.floor(Math.random() * photos.length)].url})`,
                backgroundSize: 'cover'
            }}
            >

                <div className='carrier-container'>
                    <h2>{flight.Name}</h2>
                </div>
                <div className='name-price-container'>
                    <h2>{flight.CityName}</h2>
                    <h1>${flight.MinPrice}</h1>
                </div>
            </div>
        )
    }).reverse().slice(0, 7)

    const under400 = flights.filter(flight => flight.MinPrice > 200 && flight.MinPrice <= 400).map((flight) => {
        return (
            <div key={flight.QuoteId} 
            className='flight-card' 
            style={{
                backgroundImage: `url(${photos[Math.floor(Math.random() * photos.length)].url})`,
                backgroundSize: 'cover'
            }}
            >

                <div className='carrier-container'>
                    <h2>{flight.Name}</h2>
                </div>
                <div className='name-price-container'>
                    <h2>{flight.CityName}</h2>
                    <h1>${flight.MinPrice}</h1>
                </div>
            </div>
        )
    }).reverse().slice(0, 7)

    const under600 = flights.filter(flight => flight.MinPrice > 400 && flight.MinPrice <= 600).map((flight) => {
        return (
            <div key={flight.QuoteId} 
            className='flight-card' 
            style={{
                backgroundImage: `url(${photos[Math.floor(Math.random() * photos.length)].url})`,
                backgroundSize: 'cover'
            }}
            >

                <div className='carrier-container'>
                    <h2>{flight.Name}</h2>
                </div>
                <div className='name-price-container'>
                    <h2>{flight.CityName}</h2>
                    <h1>${flight.MinPrice}</h1>
                </div>
            </div>
        )
    }).reverse().slice(0, 7)

    const under800 = flights.filter(flight => flight.MinPrice > 600 && flight.MinPrice <= 800).map((flight) => {
        return (
            <div key={flight.QuoteId} 
            className='flight-card' 
            style={{
                backgroundImage: `url(${photos[Math.floor(Math.random() * photos.length)].url})`,
                backgroundSize: 'cover'
            }}
            >
                <div className='carrier-container'>
                    <h2>{flight.Name}</h2>
                </div>
                <div className='name-price-container'>
                    <h2>{flight.CityName}</h2>
                    <h1>${flight.MinPrice}</h1>
                </div>
            </div>
        )
    }).reverse().slice(0, 7)

  

    return (
        <>
            <div className='carousel-view'>
                <div className='arrow-container'>
                    {value === 0 ? null : <div onClick={() => setNegativeValue()} className={'carousel-arrow left'}></div>}
                </div>
                <Carousel value={value} onChange={onChange} >
                <div className='suggestions'>
                        <div className='banner'>
                            <h1 className='banner-price'>Flights under $100</h1>
                            {under100[0]}
                        </div>
                        <div className='flights'>
                            <div className='flights-1'>{under100.slice(1, 4)}</div>
                            <div className='flights-1'>{under100.slice(4, 7)}</div>
                        </div>
                    </div>
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