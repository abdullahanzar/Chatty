import React from 'react'
import './Navbar.css'
import chattyParrot from '../assets/parrot.png'


export default function Navbar() {
  return (
    <div className='navbar'>
        <div className="chatty-logo">
        <img src={chattyParrot} alt="" />
        <h2>Chatty</h2>
        </div>
        <p>A place to have heartwarming conversations.</p>
    </div>
  )
}
