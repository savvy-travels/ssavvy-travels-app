import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { loginUser } from '../../../Redux/userReducer'
import { connect } from 'react-redux'
import { ClipLoader } from 'react-spinners'
import AsyncSelect from 'react-select/async'
import allAirports from '../../airports.json'
import './auth.css'
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
        border: '2px solid #cae00d',
        height: '3.5rem',
        borderRadius: 5,
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


function Signup(props) {
    //Loading//
    const [loading, setLoading] = useState(false)
    //Auth//
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    //Errors//
    const [errorMessage, setErrorMessage] = useState('')
    const [emptyError, setEmptyError] = useState(false)
    const [passError, setPassError] = useState(false)
    const [error, setError] = useState(false)

    //Airport Filter//
    const [input, setInput] = useState('')
    const [preferred, setPreferred] = useState('')
    const [myAirportsFiltered, setMyAirportsFiltered] = useState([])

    const context = useContext(Context)

    function handleInputChange(newValue) {
        const inputValue = newValue.replace(/\W/g, '')
        setInput(inputValue)
    }

    function registerUser() {
        setPassError(false)
        setEmptyError(false)
        if (email === '' || username === '' || password === '' || confirmPass === '') {
            setEmptyError(true)
            
            return setErrorMessage('Missing required fields')
        }
        if (password !== confirmPass) {
            setPassError(true)
            return setErrorMessage('Passwords do not match.')
        }
        setLoading(true)

        const message = `<div>Welcome ${username}, we're happy to have you in our community! You now have access to my trips which allows you save and scan for trips you have saved. Please take a second to confirm your email by clicking the link below.</div>`
        axios.post('/api/auth/register', { email, username, password, preferred, message }).then(res => {
            setLoading(false)
            setError(false)
            props.loginUser(res.data)
            props.history.push('/')
            console.log(error)
        }).catch(err => {
            setLoading(false)
            setErrorMessage(err.response.data)
        })
    }

    ///Airport Filter functions////
    const myAirports = context.airports.map(airport => {
        let airportId = allAirports.findIndex(ap => ap.code.toLocaleLowerCase === airport.iata.toLowerCase)
        return { ...airport, ...allAirports[airportId] }
    })
 

    useEffect(() => {
        myAirports.forEach(airport => {
            allAirports.forEach(ap => {
                if (ap.code === airport.code) {
                    setMyAirportsFiltered(previousState => [...previousState, airport])
                }
            }
            )
        })
    }, )

    const myOptions = myAirportsFiltered.map(airport => { return { value: airport.iata, label: `${airport.name} ${airport.iata}-${airport.city}` } })
    //////////

    return (
        <>
            {loading ?
                <div className='login-field'>
                    <h1 style={{ color: '#cae00d' }}>Creating your profile...</h1>
                    <ClipLoader color={'#cae00d'} />
                </div>
                :
                <form className='register-field'>
                    <div className='register-input-field'>
                        <div className='register-header'>
                            <h2>Register</h2>
                            <h4>Already a member?<h4><Link style={{ textDecoration: 'none', color: '#cae00d' }} to='/login'>Login</Link></h4></h4>
                        </div>
                        <input onChange={(e) => setEmail(e.target.value)}
                            className={emptyError ? 'register-error' : 'register-inputs'}
                            type='email'
                            placeholder='Email' />
                        <input onChange={(e) => setUsername(e.target.value)}
                            className={emptyError ? 'register-error' : 'register-inputs'}
                            type='text'
                            placeholder='First Name' />
                        <AsyncSelect
                            styles={customStyles}
                            onChange={(e) => !e ? null : setPreferred(e.value)}
                            className='signup-airport-select'
                            loadOptions={loadOptions}
                            isClearable={true}
                            theme={theme => ({ ...theme, colors: { ...theme.colors, primary25: '#cae00d' } })}
                            placeholder={'Preferred Airport...'}
                            onInputChange={handleInputChange}
                            defaultValue={myOptions[0]}
                            defaultOptions={input ? input : myOptions}
                        />
                        <input onChange={(e) => setPassword(e.target.value)}
                            className={emptyError || passError ? 'register-error' : 'register-inputs'}
                            type='password'
                            placeholder='Password' />
                        <input onChange={(e) => setConfirmPass(e.target.value)}
                            className={emptyError || passError ? 'register-error' : 'register-inputs'}
                            type='password'
                            placeholder='Confirm Password' />
                        {errorMessage && <h5 className='error-message'>{errorMessage}</h5>}
                        <button onClick={() => registerUser()} className='register-button'>Signup</button>
                    </div>
                </form>
            }
        </>
    )
}

function mapStateToProps(reduxState) {
    return {
        airports: reduxState.searchReducer.airports
    }
}

export default withRouter(connect(mapStateToProps, { loginUser })(Signup))