import React from 'react';
import logo from './covid_logo.png'
import {NavLink} from 'react-router-dom';

export default function navbar() {
    return (
        <nav className='navbar'>

            <ul>
                <div className='nav_logo'>
                    <NavLink to='/'><img src={logo} /></NavLink>
                </div>
                <div className='navlinks'>
                    <li><NavLink className='td_none white f20' to='/'>Home</NavLink></li>
                    {/* <li><NavLink className='td_none white f20' to='/how-it-works'>How It Works</NavLink></li> */}
                    {/* <li><NavLink className='td_none white f20' to='/about'>About Us</NavLink></li> */}
                    <li><NavLink className='td_none white f20' to='//selfregistration.cowin.gov.in/' target="_blank">Download Certificate</NavLink></li>

                </div>
            </ul>
        </nav>
    )
}
