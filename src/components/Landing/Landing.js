
import React from 'react'
import {Switch, Route, withRouter } from 'react-router-dom'
// import { connect } from 'react-redux'
import Header from './Header/Header'
import './landing.css'
import NewSearch from './NewSearch/NewSearch'
import heroVideo from './DevMtn-Air.mp4'

function Landing (){
    return(
        <div className='landing'>
            {/* <section className='hero-video'> */}
                <Header/>
                <video className="video" src={heroVideo} 
                type='video/mp4'
                autoPlay loop muted
                ></video>

                <Switch>
                    <Route exact path='/' component={NewSearch} />
                    <Route exact path='/login' component={{}} />
                    <Route exact path='/signup' component={{}} />
                </Switch>
            {/* </section> */}

            <div className='triangle'>
            </div>
        </div>

    )
}

export default withRouter(Landing)