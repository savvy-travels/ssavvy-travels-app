import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { newSearch } from '../../../Redux/searchReducer'
import allAirports from './airports.json'
import AsyncSelect from 'react-select/async'
import './newSearch.css'

//Functions used to filter through the airport results
//First we grab all the airports from the data.json file and map them to a new variable
const options = allAirports.map(airport => { return { value: airport.code, label: `${airport.code}-${airport.name}` } })

//We are then able to filter through these results only loading the specified airports saving rendering time. 
const filterAirports = (inputValue) => {
    return options.filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase()))
}
//This is the 'asynchronous' function that sets the loading. 
const loadOptions = (inputValue, cb) => {
    setTimeout(() => {
        cb(filterAirports(inputValue))
    }, 1000)
}


function NewSearch(props) {
    const [input, setInput] = useState('')
    const [budget, setBudget] = useState('')
    const [departureDate, setDepartureDate] = useState(undefined)
    const [arrivalDate, setArrivalDate] = useState(undefined)
    const [location, setLocation] = useState(undefined)
    const [next, setNext] = useState(false)

    //This function handles the input change that is used in the filter function above. //
    function handleInputChange(newValue) {
        const inputValue = newValue.replace(/\W/g, '')
        setInput(inputValue)
    }
    function search() {
        console.log(location)
        // props.newSearch({ budget, location, departureDate, arrivalDate })
        // props.history.push('/map')
    }

    // const airports = props.airports.map(airport => { return <option value={airport.code} key={airport.code} >{airport.code} - {airport.name}</option> })
    const airports = props.airports.map(airport => { return { value: airport.code, label: `${airport.code}-${airport.name}` } })

    return (
        <span className='search-field'>
            <div className='slogan-container'>
                <h1>You tell us the budget.<br></br>We'll tell you where.</h1>
            </div>

            <div className='input-field'>
                <input onChange={(e) => setBudget(e.target.value)} onFocus={() => setNext(true)} className='budget-input' type='text' placeholder='Whats Your Budget?' />
                {next ?
                    <div className='where-when-inputs'>
                        <AsyncSelect
                            onChange={(e) => !e ? null : setLocation(e.value)}
                            className='airport-select'
                            loadOptions={loadOptions}
                            isClearable={true}
                            onInputChange={handleInputChange}
                            defaultValue={airports[0]}
                            defaultOptions={input ? input : airports} />
                        {/* <select type='select' onChange={(e) => setLocation(e.target.value)} placeholder='From Where?'><option value='null' unselectable={true} >Choose your departure airport</option>{airports}</select> */}
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

function mapStateToProps(reduxState) {
    return {
        airports: reduxState.searchReducer.airports
    }
}

export default withRouter(connect(mapStateToProps, { newSearch })(NewSearch))