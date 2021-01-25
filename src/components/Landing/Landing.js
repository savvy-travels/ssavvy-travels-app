
import React from 'react'
import { withRouter } from 'react-router-dom'
// import { connect } from 'react-redux'
import Header from './Header/Header'
import './landing.css'

function Landing (){
    return(
        <div className='landing'>
            <Header/>
        </div>

    )
}

export default withRouter(Landing)