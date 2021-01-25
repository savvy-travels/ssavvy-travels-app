import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import './newSearch.css'

function NewSearch(props){
    const [budget, setBudget] = useState('')

    return(
        <form className='search-field'>
        <div className='input-field'>
            <input onChange={(e)=>setBudget(e.target.value)} className='budget-input' type='text' placeholder='Whats Your Budget?'/>
            {budget ?
            <div className='where-when-inputs'>
                <input type='select'/>
                <input type='date' placeholder='When?'/>
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