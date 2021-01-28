import React, { useState } from 'react'
import { connect } from 'react-redux'
import { newSearch } from '../../../Redux/searchReducer'
import { withRouter } from 'react-router-dom'

const SearchField = (props) => {
    const [budget, setBudget] = useState(props.budget)
    const [location, setLocation] = useState(props.location)
    const [departureDate, setDepartureDate] = useState(props.departureDate)
    const [arrivalDate, setArrivalDate] = useState(props.arrivalDate)

    return (
        <div className='search-fields'>
            <input className='map-budget-input' contentEditable={false} onChange={(e) => setBudget(e.target.value)} value={budget} type='text' placeholder='Whats Your Budget?' />
            <div className='where-when-map-inputs'>
                <input onChange={(e) => setLocation(e.target.value)} value={location} className='airport-date-inputs' type='text' placeholder='From Where?' />
                <input onChange={(e) => setDepartureDate(e.target.value)} value={departureDate} className='airport-date-inputs' type='Date' placeholder='When' />
                <input onChange={(e) => setArrivalDate(e.target.value)} value={arrivalDate} className='airport-date-inputs' type='Date' placeholder='When' />
            </div>
        </div>
    )
}

function mapStateToProps(reduxState) {
    return {
        budget: reduxState.searchReducer.budget,
        location: reduxState.searchReducer.location,
        departureDate: reduxState.searchReducer.departureDate,
        arrivalDate: reduxState.searchReducer.arrivalDate
    }
}

export default withRouter(connect(mapStateToProps, { newSearch })(SearchField))