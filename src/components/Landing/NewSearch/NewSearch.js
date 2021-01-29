import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { newSearch } from '../../../Redux/searchReducer'
import './newSearch.css'
const allAirports = require('../server/controllers/airports.json')

function NewSearch(props) {
    const [budget, setBudget] = useState('')
    const [departureDate, setDepartureDate] = useState(undefined)
    const [arrivalDate, setArrivalDate] = useState(undefined)
    const [location, setLocation] = useState(undefined)
    const [next, setNext] = useState(false)
    
    console.log(props.airports)

    console.log(allAirports)

    function search() {
        props.newSearch({ budget, location, departureDate, arrivalDate })
        props.history.push('/map')
    }

    const airports = props.airports.map(airport => {return <option value={airport.code}>{airport.code} - {airport.name}</option>})
    
    return (
        <span className='search-field'>
            <div className='slogan-container'>
                <h1>You tell us the budget.<br></br>We'll tell you where.</h1>
            </div>

            <div className='input-field'>
                <input onChange={(e) => setBudget(e.target.value)} onFocus={() => setNext(true)} className='budget-input' type='text' placeholder='Whats Your Budget?' />
                {next ?
                    <div className='where-when-inputs'>
                        <select type='select' onChange={(e) => setLocation(e.target.value)} placeholder='From Where?'><option value='null' unselectable >Choose your departure airport</option>{airports}</select>
                        <input onChange={(e) => setDepartureDate(e.target.value)} type='date' placeholder='When?' />
                        <input onChange={(e) => setArrivalDate(e.target.value)} type='date' placeholder='When?' />
                    </div>
                    :
                    null
                }
            </div>
            <button onClick={() => search()} className='search-button'>Let's Go!</button>
        </span>

    )
}

function mapStateToProps(reduxState){
    return{
        airports: reduxState.searchReducer.airports
    }
}

export default withRouter(connect(mapStateToProps, { newSearch })(NewSearch))