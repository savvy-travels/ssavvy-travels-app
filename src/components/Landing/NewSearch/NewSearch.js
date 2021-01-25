import React, { useState } from 'react'
import {DateRangePicker} from 'rsuite'
import { withRouter } from 'react-router-dom'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import './newSearch.css'

function NewSearch(props){
    const [budget, setBudget] = useState('')
    const [dateRange, setDateRange] = useState('')

    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }

    return(
        <form className='search-field'>
        <div className='input-field'>
            <input onChange={(e)=>setBudget(e.target.value)} className='budget-input' type='text' placeholder='Whats Your Budget?'/>
            {budget ?
            <div className='where-when-inputs'>
                <input type='select'/>
                <DateRangePicker className='date-range'/>
            </div>
            :
            null
            }
        </div>
        <button className='search-button'>Let's Go!</button>
        </form>

    )
}

export default withRouter(NewSearch)