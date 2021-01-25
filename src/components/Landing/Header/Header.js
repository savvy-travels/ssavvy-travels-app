import React from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
// import {loginUser} from '../../../redux'
import './header.css'


function Header (props){
    return(
        <header>
            <h1 className='header-logo'>Logo</h1>
            <form>
                <button className='auth-button'>signup</button>
                <button className='auth-button'>login</button>
            </form>
        </header>
    )
}

export default withRouter(Header)