import React from 'react'
import './AppNavbar.css'
import { FaHome } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';

const AppNavbar = () => {
  return (
    <div className='appnavbar-wrapper'>
      <h5>HAYAT MART</h5>
      <h6>Ai Face Recognition gallery</h6>
      <section className='appbar-right-side-icons'>
        <p>
          <span style={{backgroundColor: '#1f282f'}} className='appbar-home-icon'><FaHome /></span>
        </p>
        <p>
          <span className='appbar-hamburger-icon'><GiHamburgerMenu /></span>
        </p>
      </section>
    </div>
  )
}

export default AppNavbar