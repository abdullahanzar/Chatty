import React, { useContext, useState } from 'react'
import './Navbar.css'
import chattyParrot from '../assets/parrot.png'
import ChattyContext from '../ChattyContext'
import beaver from "../assets/beaver.png";
import dolphin from "../assets/dolphin.png";
import eagle from "../assets/eagle.png";
import parrotAvatar from "../assets/parrotAvatar.png";
import turtle from "../assets/turtle.png";

export default function Navbar() {
  const {loggedIn, setLoggedIn} = useContext(ChattyContext);
  const [popUp, setPopUp] = useState(false);
  const avatar = getAvatar();
  const logOut = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("avatar");
    localStorage.removeItem("token");
    setPopUp(false);
    setLoggedIn(false);
  }
  return (
    <div className='navbar'>
        <div className="chatty-logo">
        <img src={chattyParrot} alt="" />
        <h2>Chatty</h2>
        </div>
        {!loggedIn ? <p>A place to have heartwarming conversations.</p> : 
        <div className='navbar-user' onClick={()=>popUp ? setPopUp(false) : setPopUp(true)}>
          <p>{localStorage.getItem("username")}</p>
          <img src={avatar} alt={"avatar"} />
        </div>}
        {popUp && <div className='popup'>
            <p>Hello, {localStorage.getItem("username")}</p>
            <button onClick={()=>logOut()}>Log Out</button>
        </div>}
    </div>
  )
}

function getAvatar() {
  const avatar = localStorage.getItem("avatar");
  switch(avatar) {
    case 'beaver' : return beaver;
    case 'parrotAvatar' : return parrotAvatar;
    case 'eagle' : return eagle;
    case 'dolphin' : return dolphin;
    case 'turtle' : return turtle;
  }
}