import { useEffect, useState } from 'react'
import ChattyContext from './ChattyContext.js';
import './App.css'
import Navbar from './components/Navbar'
import ChatArea from './components/ChatArea'
import Home from './components/Home'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(()=>{
    if(!localStorage.getItem("token"))
      setLoggedIn(true);
    else
      setLoggedIn(false);
  }, [])
  return (
    <ChattyContext.Provider value={{loggedIn, setLoggedIn}}>
    <>
    <Navbar />
    {loggedIn ? <ChatArea /> : <Home />}
    </>
    </ChattyContext.Provider>
  )
}

export default App
