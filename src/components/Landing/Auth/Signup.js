import axios from 'axios'
import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { loginUser } from '../../../Redux/userReducer'
import { connect } from 'react-redux'

import './auth.css'

function Signup(props) {
    //Loading//
    const [loading, setLoading] = useState(false)
    //Auth//
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [airport, setAirport] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    //Errors//
    const [errorMessage, setErrorMessage] = useState('')
    const [emptyError, setEmptyError] = useState(false)
    const [passError, setPassError] = useState(false)
    const [error, setError] = useState(false)


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
        axios.post('/api/auth/register', { email, username, password }).then(res => {
            setLoading(false)
            setError(false)
            props.loginUser(res.data)
            props.history.push('/')
        }).catch(err => {
            setErrorMessage(err.response.data)
        })
    }

    return (
        <span className='register-field'>
            <div className='register-input-field'>
                <div className='register-header'>
                    <h2>Register</h2>
                    <h4>Already a member?<h4><Link style={{ textDecoration: 'none' }} to='/login'>Login</Link></h4></h4>
                </div>
                <input onChange={(e) => setEmail(e.target.value)}
                    className='register-inputs'
                    type='email'
                    placeholder='Email' />
                {emptyError && <h6 className='required-field'>*</h6>}
                <input onChange={(e) => setUsername(e.target.value)}
                    className='register-inputs'
                    type='email'
                    placeholder='Username' />
                {emptyError && <h6 className='required-field'>*</h6>}
                <input onChange={(e) => setAirport(e.target.value)}
                    className='register-inputs'
                    type='text'
                    placeholder='Preferred Airport' />
                <input onChange={(e) => setPassword(e.target.value)}
                    className='register-inputs'
                    type='password'
                    placeholder='Password' />
                {emptyError && <h6 className='required-field'>*</h6>}
                {passError && <h6 className='required-field'>*</h6>}
                <input onChange={(e) => setConfirmPass(e.target.value)}
                    className='register-inputs'
                    type='password'
                    placeholder='Confirm Password' />
                {emptyError && <h6 className='required-field'>*</h6>}
                {passError && <h6 className='required-field'>*</h6>}
                {errorMessage && <h6 className='error-message'>{errorMessage}</h6>}
                <button onClick={() => registerUser()} className='search-button'>Signup</button>
            </div>
        </span>
    )
}
export default withRouter(connect(null, { loginUser })(Signup))