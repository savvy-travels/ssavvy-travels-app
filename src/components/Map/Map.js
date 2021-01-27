import React, {useState } from 'react'
import { withRouter } from 'react-router-dom'
import ReactMapGL, {Marker} from 'react-map-gl'
import locIcon from './loc-icon.png'

function Map (props){
    const {lat, long} = props
    console.log(props)
    const [viewport, setViewport] = useState({
        latitude: lat,
        longitude: long,
        width: '100vw',
        height: '100vh',
        zoom: 4
    })

    const [selectedCity, setSelectedCity] = useState(null)

    return(
        <div>
            <ReactMapGL 
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            mapStyle='mapbox://styles/nickloverde/ckkew55if03e817o5o2je6rkp'
            //allows us to drag map around and zoom in/out
            onViewportChange={(viewport) => {setViewport(viewport)}}
            >
            {/* {apicall.map((city) => (
                <Marker 
                key={{}} 
                latitude={{}} 
                longitude={{}}>
                    <button
                    onClick={e => {
                        e.preventDefault()
                        setSelectedCity(city)
                    }}
                    className='marker-btn'>
                        <img src='locIcon' alt='location-icon'/>
                    </button>
                </Marker>
            ))} */}


            </ReactMapGL>
        </div>

    )
}

export default withRouter(Map)