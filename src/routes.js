import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Landing from './components/Landing/Landing'
import Map from './components/Map/Map'
import Profile from './components/Profile/Profile'



export default (
    <Switch>
        <Route exact path='/map/:budget/:selectedDate/:where' component={Map} />
        <Route exact path='/profile' component={Profile} />
<<<<<<< HEAD
        {/* <Route exact path='/api' component={Apisetup} /> */}
        // 885e71b28d33436eb32b48ffe7e45cee91e29ef3
=======
>>>>>>> bd456675c07a7658c5bf5d9354096c77fdc5e293
        <Route path='/' component={Landing} />
        <Route />
    </Switch>
)