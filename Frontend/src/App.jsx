import { useEffect, useState } from "react";
import ChattyContext from "./ChattyContext.js";
import "./App.css";
import Navbar from "./components/Navbar";
import ChatArea from "./components/ChatArea";
import Home from "./components/Home";
import axios from "axios";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const verify = verifyToken(localStorage.getItem("token"));
      verify
        .then((verification) => {
          if (verification) setLoggedIn(true);
        })
        .catch((value) => console.log(value));
    } else setLoggedIn(false);
  }, []);
  return (
    <ChattyContext.Provider value={{ loggedIn, setLoggedIn }}>
      <>
        <Navbar />
        {loggedIn ? <ChatArea /> : <Home />}
      </>
    </ChattyContext.Provider>
  );
}

async function verifyToken(token) {
  try {
    const response = await axios.post(
      "https://chatty-server-2xu5.onrender.com/verify-token",
      {},
      {
        headers: {
          token: token,
        },
      }
    );
    if (response.data.verification) return true;
    else return false;
  } catch (e) {
    console.log(e);
  }
}
export default App;
