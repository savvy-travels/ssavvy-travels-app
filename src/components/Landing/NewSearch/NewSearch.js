import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { newSearch, airportSearch } from '../../../Redux/searchReducer'
import axios from 'axios'
import './newSearch.css'
// const allAirports = require('../server/controllers/airports.json')

function NewSearch(props) {
    const [budget, setBudget] = useState('')
    const [departureDate, setDepartureDate] = useState(undefined)
    const [arrivalDate, setArrivalDate] = useState(undefined)
    const [location, setLocation] = useState(undefined)
    const [next, setNext] = useState(false)
    const [all, setAll] = useState(false)
    const [allAirports, setAllAirports] = useState([])
    let airports = [] 

    useEffect(()=> {
        axios.get('/api/airports/all').then(res => setAllAirports(res.data))
    }, [])


    function search() {
        props.newSearch({ budget, location, departureDate, arrivalDate })
        props.history.push('/map')
    }

    const toggleAll = () => {
        setAll(!all)
    }

    if (!all) {
        airports = props.airports.map(airport => {return <option value={airport.code}>{airport.code} - {airport.name}</option>})
    } else  {
        airports = allAirports.map(airport => {return <option value={airport.code}>{airport.code} - {airport.name}</option>})
    }
    
    return (
        <span className='search-field'>
            <div className='slogan-container'>
                <h1>You tell us the budget.<br></br>We'll tell you where.</h1>
            </div>

            <div className='input-field'>
                <input onChange={(e) => setBudget(e.target.value)} onFocus={() => setNext(true)} className='budget-input' type='text' placeholder='Whats Your Budget?' />
                {next ?
                    <div className='where-when-inputs'>
                        
                        <span>All airports<input type='checkbox' onChange={toggleAll}/></span>
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