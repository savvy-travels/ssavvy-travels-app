import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import './newSearch.css'

function NewSearch(props) {
    const [budget, setBudget] = useState('')
    const [next, setNext] = useState(false)
    const [selectedDate, setSelectedDate] = useState(undefined)
    const [where, setWhere] = useState(undefined)



    function search() {
        props.history.push(`/map/${budget}/${selectedDate}/${where}`)
    }
    return (
        <span className='search-field'>
            <div className='slogan-container'>
                <h1>You tell us the budget.<br></br>We'll tell you where.</h1>
            </div>

            <div className='input-field'>
                <input onChange={(e) => setBudget(e.target.value)} onFocus={() => setNext(true)} className='budget-input' type='text' placeholder='Whats Your Budget?' />
                {next ?
                    <div className='where-when-inputs'>
                        <input onChange={(e) => setWhere(e.target.value)} type='select' placeholder='From Where?' />
                        <input onChange={(e) => setSelectedDate(e.target.value)} type='date' placeholder='When?' />
                    </div>
                    :
                    null
                }
            </div>
            <button onClick={() => search()} className='search-button'>Let's Go!</button>
        </span>

    )
}

export default withRouter(NewSearch)