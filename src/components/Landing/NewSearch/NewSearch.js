import React, { useState, useContext, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { newSearch } from '../../../Redux/searchReducer'
import allAirports from '../../airports.json'
import AsyncSelect from 'react-select/async'
import './newSearch.css'
import { Context } from '../../../context/context'

//Functions used to filter through the airport results
//First we grab all the airports from the data.json file and map them to a new variable
const options = allAirports.map(airport => { return { value: airport.code, label: `${airport.code}-${airport.name}-${airport.city}` } })

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
//Styles
const customStyles = {
    option: (provided, state) => ({
        ...provided,
        fontFamily: 'Montserrat',
        fontWeight: 200
    }),
    control: () => ({
        position: 'relative',
        zIndex: 10000,
        height: '2rem',
        borderRadius: 3,
        border: '2px solid transparent',
        backgroundColor: '#fcfffd',
        display: 'flex',
        width: '95=8%',
        color: '#fcfffd'
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1
        const transition = 'opacity 300ms'
        return { ...provided, opacity, transition }
    }
}


function NewSearch(props) {
    const [input, setInput] = useState('')
    const [budget, setBudget] = useState('')
    const [departureDate, setDepartureDate] = useState(undefined)
    const [arrivalDate, setArrivalDate] = useState(undefined)
    const [location, setLocation] = useState(undefined)
    const [next, setNext] = useState(false)
    const [myAirportsFiltered, setMyAirportsFiltered] = useState([])

    const context = useContext(Context)


    //This function handles the input change that is used in the filter function above. //
    function handleInputChange(newValue) {
        const inputValue = newValue.replace(/\W/g, '')
        setInput(inputValue)
    }
    function search() {
        props.newSearch({ budget, location, departureDate, arrivalDate })
        props.history.push('/map')
    }


    const myAirports = context.airports.map(airport => {
        let airportId = allAirports.findIndex(ap => ap.code == airport.iata)
        return { ...airport, ...allAirports[airportId] }
    })
    console.log(myAirports)

    useEffect(() => {
        myAirports.forEach(airport => {
            allAirports.forEach(ap => {
                if (ap.code === airport.code) {
                    setMyAirportsFiltered(previousState => [...previousState, airport])
                }
            }
            )
        })
    }, [])

    console.log(myAirportsFiltered)



    const myOptions = myAirportsFiltered.map(airport => { return { value: airport.iata, label: `${airport.name} ${airport.iata}-${airport.city}` } })

    // console.log(myOptions)



    return (
        <span className='search-field'>
            <div className='slogan-container'>
                <h1>You tell us the budget.<br></br>We'll tell you where.</h1>
            </div>

            <div className='input-field'>
                <input onChange={(e) => setBudget(e.target.value)} onFocus={() => setNext(true)} className='budget-input' type='text' placeholder='Whats Your Budget?' />
                {next ?
                    <div className='where-when-inputs'>
                        {!context.loading &&
                            <AsyncSelect
                                onChange={(e) => !e ? null : setLocation(e.value)}
                                className='airport-select'
                                loadOptions={loadOptions}
                                isClearable={true}
                                onInputChange={handleInputChange}
                                placeholder={'Select departure airport...'}
                                styles={customStyles}
                                theme={theme => ({ ...theme, colors: { ...theme.colors, primary25: '#cae00d', primary: '#cae00d', color: '#000' } })}
                                defaultValue={myOptions[0]}
                                defaultOptions={input ? input : myOptions} />
                        }

                        <div className='vert-line-a'></div>
                        <div className='depart-arrive-container'>
                            <input style={{ outline: 'none' }} onChange={(e) => setDepartureDate(e.target.value)} type='date' placeholder='When?' />
                            <div className='between-arrow-left'></div>
                            <div className='between-arrow-right'></div>
                            <input style={{ outline: 'none' }} onChange={(e) => setArrivalDate(e.target.value)} type='date' placeholder='When?' />
                        </div>
                    </div>
                    :
                    null
                }
            </div>
            <button onClick={() => search()} className='search-button'>Let's Go!</button>
        </span >

    )
}



export default withRouter(connect(null, { newSearch })(NewSearch))