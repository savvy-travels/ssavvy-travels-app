import React from 'react'
import { withRouter } from 'react-router-dom'
import './auth.css'

function Signup(props){
    return(
        <span className='search-field'>
            <div className='input-field'>
                <div className='register-header'>
                    <h2>Register</h2>
                    <h4>Already a member?<h4>Login</h4></h4>
                </div>
                <input className='register-inputs' type='email' placeholder='email'/>
                <input className='register-inputs' type='text' placeholder='Preferred Airport'/>
                <input className='register-inputs' type='password' placeholder='Password'/>
                <input className='register-inputs' type='password' placeholder='Confirm Password'/>
            <button className='search-button'>Signup</button>
            </div>
        </span>
    )
}
export default withRouter(Signup)