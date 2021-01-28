import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Landing from './components/Landing/Landing'
import Map from './components/Map/Map'
import Profile from './components/Profile/Profile'



export default (
    <Switch>
        <Route exact path='/map' component={Map} />
        <Route exact path='/profile' component={Profile} />
        <Route path='/' component={Landing} />
        <Route />
    </Switch>
)