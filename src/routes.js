import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Landing from './components/Landing/Landing'
import Map from './components/Map/Map'
import Profile from './components/Profile/Profile'



export default (
    <Switch>
        <Route path='/' component={Landing} />
        <Route exact path='/map' component={Map} />
        <Route exact path='/Profile' component={Profile} />
        <Route exact path='/profile' component={Profile} />
        <Route />
    </Switch>
)