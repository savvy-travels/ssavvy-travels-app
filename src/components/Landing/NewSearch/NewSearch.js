import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import './newSearch.css'

function NewSearch(props){
    const [budget, setBudget] = useState('')
    const [next, setNext] = useState(false)
    const [selectedDate, setSelectedDate] = useState(null)

    function setNewBudget(val){
        setBudget(val)
        setNext(true)
    }

    return(
        <span className='search-field'>
        <h1>You tell us your budget<br></br>We'll tell you where.</h1>
        <div className='input-field'>
           <input onChange={(e)=>setNewBudget(e.target.value)} className='budget-input' type='email' placeholder='Whats Your Budget?'/>
            {next ?
            <div className='where-when-inputs'>
                <input type='select' placeholder='From Where?'/>
                <input type='date' placeholder='When?'/>
            </div>
            :
            null
            }
        </div>
        <button className='search-button'>Let's Go!</button>
        </span>

    )
}

export default withRouter(NewSearch)