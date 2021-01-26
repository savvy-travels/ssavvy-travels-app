import axios from 'axios'
import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './auth.css'

function Signup(props) {
    //Loading//
    const [loading, setLoading] = useState(false)
    //Auth//
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [airport, setAirport] = useState('SLC')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    //Errors//
    const [errorMessage, setErrorMessage] = useState('')
    const [error, setError] = useState(false)


    function registerUser() {
        if (email === '' || username === '' || password === '' || confirmPass === '') {
            setError(true)
            return setErrorMessage('Missing required fields')
        }
        if (password !== confirmPass) {
            setError(true)
            return setErrorMessage('Passwords do not match.')
        }
        setLoading(true)
        axios.post('/api/auth/register', { email, username, password }).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err.response.data)
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
                <input onChange={(e) => setUsername(e.target.value)}
                    className='register-inputs'
                    type='email'
                    placeholder='Username' />
                <input onChange={(e) => setAirport(e.target.value)}
                    className='register-inputs'
                    type='text'
                    placeholder='Preferred Airport' />
                <input onChange={(e) => setPassword(e.target.value)}
                    className='register-inputs'
                    type='password'
                    placeholder='Password' />
                <input onChange={(e) => setConfirmPass(e.target.value)}
                    className='register-inputs'
                    type='password'
                    placeholder='Confirm Password' />
                <button onClick={() => registerUser()} className='search-button'>Signup</button>
            </div>
        </span>
    )
}
export default withRouter(Signup)