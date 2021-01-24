import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Landing from './components/Landing/Landing'
import Map from './components/Map/Map'
import Profile from './components/Profile/Profile'
import Apisetup from './components/Apisetup'



export default (
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/map' component={Map} />
        <Route exact path='/Profile' component={Profile} />
        <Route exact path='/api' component={Apisetup}/>
    </Switch>
)