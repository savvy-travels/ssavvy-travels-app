import axios from 'axios'
import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginUser } from '../../../Redux/userReducer'

function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    function userLogin() {
        axios.post('/api/auth/login', { email, password }).then(res => [
            console.log(res.data)
        ])
    }
    return (
        <form className='login-field'>
            <div className='register-input-field'>
                <div className='register-header'>
                    <h2>Welcome Back</h2>
                    <h4>Not a member yet?<h4><Link style={{ textDecoration: 'none', color: '#cae00d' }} to='/signup'>Signup</Link></h4></h4>
                </div>
                <input onChange={(e) => setEmail(e.target.value)}
                    className='register-inputs'
                    type='email'
                    placeholder='Email' />
                <input onChange={(e) => setPassword(e.target.value)}
                    className='register-inputs'
                    type='password'
                    placeholder='Password' />
                <button onClick={() => userLogin()} className='register-button'>Signup</button>
            </div>
        </form>
    )
}

export default withRouter(Login)