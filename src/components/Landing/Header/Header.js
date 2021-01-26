import React, { useState } from 'react'
import { NavLink, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../../Redux/userReducer'
import './header.css'
import axios from 'axios'


function Header(props) {
    const [open, setOpen] = useState(false)

    function userLogout() {
        axios.post('/api/auth/logout').then(() => {
            setOpen(false)
            props.logout()
            props.history.push('/')
        })
    }
    return (
        <>
            <header>
                <Link to='/'><img className='header-logo' src='https://images.vexels.com/media/users/3/144290/isolated/preview/c48f8a4d4694861b7961c16e0ff565de-arrow-wing-travel-logo-by-vexels.png' alt='logo' /></Link>
                {props.isLoggedIn ?
                    <div className='user-nav'>
                        <h1>{props.username}</h1>
                        <div onClick={() => setOpen(!open)} className={open ? 'up-triangle' : 'down-triangle'}></div>
                    </div>
                    :
                    <span>
                        <Link to='/signup'><button className=' auth-button'>signup</button></Link>
                        <Link to='/login'><button className='auth-button'>login</button></Link>
                    </span>
                }
            </header>
            <div className={open ? 'pop-menu-visible' : 'pop-menu'} >
                <div className='nav-items'>
                    <NavLink className='list-item' style={{ textDecoration: 'none', color: '#fcfffd' }} to='/profile'>View Profile</NavLink>
                    <NavLink style={{ textDecoration: 'none', color: '#fcfffd' }} className='list-item' to='/map'>View Map</NavLink>
                </div>
                <h3 onClick={() => userLogout()}>Logout</h3>
            </div>
        </>
    )
}

function mapStateToProps(reduxState) {
    return {
        username: reduxState.username,
        preferred: reduxState.preferred,
        isLoggedIn: reduxState.isLoggedIn
    }
}


export default withRouter(connect(mapStateToProps, { logout })(Header))