import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import './header.css'


function Header(props) {
    return (
        <header>
            <Link to='/'><img className='header-logo' src='https://images.vexels.com/media/users/3/144290/isolated/preview/c48f8a4d4694861b7961c16e0ff565de-arrow-wing-travel-logo-by-vexels.png' alt='logo' /></Link>
            <form>
                <Link to='/signup'><button className=' auth-button'>signup</button></Link>
                <Link to='/login'><button className='auth-button'>login</button></Link>
            </form>
        </header>
    )
}

export default withRouter(Header)