import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import beaver from '../assets/beaver.png'
import dolphin from '../assets/dolphin.png'
import eagle from '../assets/eagle.png'
import parrotAvatar from '../assets/parrotAvatar.png'
import turtle from '../assets/turtle.png'
import ChattyContext from '../ChattyContext';

export default function Home() {
    const {LoggedIn, setLoggedIn} = useContext(ChattyContext);
    const [formData, setFormData] = useState({});
    const [avatar, setAvatar] = useState('beaver');
    const [showRegister, setShowRegister] = useState(true);
    const handleRegister = async () => {

    }
    useEffect(()=>{
        setFormData({...formData, avatar: avatar})
    }, [avatar])
    useEffect(()=>{
        console.log(formData)
    }, [formData])
  return (
    <div className='home'>
        {showRegister ? Register(avatar, setAvatar, setShowRegister, formData, setFormData) : LogIn(setShowRegister, formData, setFormData)}
    </div>
  )
}


function Register(avatar, setAvatar, setShowRegister, formData, setFormData) {
    return (
        <div className="register">
            <h2>REGISTER</h2>
            <form method='POST' onChange={(e)=>setFormData({...formData, [e.target.name] : e.target.value})}>
                <input type="text" placeholder='Username' name="username" id="username"/>
                <input type="password" placeholder='Password' name="password" id="password"/>
                {avatars(avatar, setAvatar)}
                <button type="submit">Submit</button>
            </form>
            <p>Already have an account? <span style={{color: "#EC5454", cursor: "pointer"}} onClick={()=>setShowRegister(false)}>Login?</span></p>
        </div>
    )
}

function LogIn(setShowRegister, formData, setFormData) {
    return (
        <div className="register">
            <h2>Log In</h2>
            <form method='POST' onChange={(e)=>setFormData({...formData, [e.target.name] : e.target.value})}>
                <input type="text" placeholder='Username'/>
                <input type="password" placeholder='Password'/>
                <button type="submit">Log In</button>
            </form>
            <p>Don't have an account? <span style={{color: "#EC5454", cursor: "pointer"}} onClick={()=>setShowRegister(true)}>Register here.</span></p>
        </div>
    )
}

function avatars(avatar, setAvatar) {
    return (
        <div className="avatars">
            <p>Choose your Avatar: </p>
            {
                <div className="avatar">
                    <img src={beaver} className={avatar=='beaver' && "selected-avatar"} onClick={()=>setAvatar('beaver')}/>
                    <img src={dolphin} className={avatar=='dolphin' && "selected-avatar"} onClick={()=>setAvatar('dolphin')}/>
                    <img src={eagle} className={avatar=='eagle' && "selected-avatar"} onClick={()=>setAvatar('eagle')}/>
                    <img src={turtle} className={avatar=='turtle' && "selected-avatar"} onClick={()=>setAvatar('turtle')} />
                    <img src={parrotAvatar} className={avatar=='parrotAvatar' && "selected-avatar"} onClick={()=>setAvatar('parrotAvatar')} />
                </div>
            }
        </div>
    )
}