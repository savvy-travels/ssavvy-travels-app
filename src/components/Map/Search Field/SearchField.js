import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { newSearch } from '../../../Redux/searchReducer'
import { withRouter } from 'react-router-dom'
import './searchField.css'

const SearchField = (props) => {
    //Details Filter//
    const [round, setRound] = useState(true)
    //Search Fields//
    const [budget, setBudget] = useState(props.budget)
    const [location, setLocation] = useState(props.location)
    const [departureDate, setDepartureDate] = useState(props.departureDate)
    const [arrivalDate, setArrivalDate] = useState(props.arrivalDate)

    function searchUpdate() {
        props.newSearch({ budget, location, departureDate, arrivalDate })
    }

    return (
        <form className='search-fields'>
            <div className='flight-details'>
                <div className='round-oneWay'>
                    <h5>Round</h5>
                    <div className='slide-bar'>
                        <div onClick={() => setRound(!round)} className={round ? 'slider-ball-left' : 'slider-ball-right'}></div>
                    </div>
                    <h5>One Way</h5>
                </div>
                <div>Passengers</div>
                <div>OneWay/Round</div>
            </div>
            <input onChange={(e) => setBudget(e.target.value)}
                className='map-budget-input'
                value={budget}
                type='text'
                placeholder='Whats Your Budget?' />
            <input onChange={(e) => setLocation(e.target.value)}
                value={location}
                className='airport-date-inputs'
                type111
                placeholder='From Where?' />
            <div className='when-map-inputs'>
                <input onChange={(e) => setDepartureDate(e.target.value)}
                    value={departureDate}
                    id='depart-date-input'
                    type='Date'
                    placeholder='When' />
                <div className='vert-line'></div>
                <input onChange={(e) => setArrivalDate(e.target.value)}
                    value={arrivalDate}
                    id='arrive-date-input'
                    type='Date'
                    placeholder='When' />
            </div>
            <button onClick={() => searchUpdate()}>Search</button>
        </form >
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

export default withRouter(connect(mapStateToProps, { newSearch })(SearchField))