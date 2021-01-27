import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Landing from './components/Landing/Landing'
import Map from './components/Map/Map'
import Profile from './components/Profile/Profile'



export default (
    <Switch>
        <Route exact path='/map' component={Map} />
        <Route exact path='/profile' component={Profile} />

        // 885e71b28d33436eb32b48ffe7e45cee91e29ef3

        <Route path='/' component={Landing} />
        <Route />
    </Switch>
)