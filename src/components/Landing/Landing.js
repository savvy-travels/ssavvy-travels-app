
import React from 'react'
import {Switch, Route, withRouter } from 'react-router-dom'
// import { connect } from 'react-redux'
import Header from './Header/Header'
import './landing.css'
import NewSearch from './NewSearch/NewSearch'
import Signup from './Auth/Signup'
import Login from './Auth/Login'

function Landing (){
    return(
        <div className='landing'>
            <Header/>
            <div className='hero-video'>
            <Switch>
                <Route exact path='/' component={NewSearch} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/signup' component={Signup} />
            </Switch>
            </div>
            <div className='triangle'>
            </div>
        </div>

    )
}

export default withRouter(Landing)