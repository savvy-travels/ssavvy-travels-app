import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { newSearch } from '../../../Redux/searchReducer'
import './newSearch.css'

function NewSearch(props) {
    const [budget, setBudget] = useState('')
    const [departureDate, setDepartureDate] = useState(undefined)
    const [arrivalDate, setArrivalDate] = useState(undefined)
    const [location, setLocation] = useState(undefined)
    const [next, setNext] = useState(false)



    function search() {
        props.newSearch({ budget, location, departureDate, arrivalDate })
        props.history.push('/map')
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
                        <input onChange={(e) => setLocation(e.target.value)} type='select' placeholder='From Where?' />
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

export default withRouter(connect(null, { newSearch })(NewSearch))