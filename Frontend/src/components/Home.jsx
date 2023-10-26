import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import beaver from "../assets/beaver.png";
import dolphin from "../assets/dolphin.png";
import eagle from "../assets/eagle.png";
import parrotAvatar from "../assets/parrotAvatar.png";
import turtle from "../assets/turtle.png";
import ChattyContext from "../ChattyContext";
import axios from "axios";

export default function Home() {
  const { loggedIn, setLoggedIn } = useContext(ChattyContext);
  const [formData, setFormData] = useState({});
  const [avatar, setAvatar] = useState("beaver");
  const [showRegister, setShowRegister] = useState(true);
  const [requestComplete, setRequestComplete] = useState(false);
  const [loader, setLoader] = useState(false);
  const handleRegister = async (e) => {
    e.preventDefault();
    if(!formData.username || !formData.password) {
        return setRequestComplete("Details not filled.")
    }
    setLoader(true);
    try {
      const response = await axios.post(
        "https://chatty-server-2xu5.onrender.com/register/",
        formData,
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        }
      );
      setLoader(false);
      if (response.data.success) setRequestComplete("Registered Successfully");
      else if (response.data.error)
        setRequestComplete(`Error. ${response.data.error}`);
    } catch (e) {
      console.log(e);
    }
  };
  const handleLogIn = async (e) => {
    e.preventDefault();
    setLoader(true);
    if(!formData.username || !formData.password) {
        return setRequestComplete("Details not filled.")
    }
    try {
      const response = await axios.post(
        "https://chatty-server-2xu5.onrender.com/login/",
        formData,
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        }
      );
      setLoader(false);
      if (response.data.login) {
        setRequestComplete("Authentication Successful");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("avatar", response.data.avatar);
        setLoggedIn(true);
      }
      else
        setRequestComplete(`Incorrect username or password.`);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    setFormData({ ...formData, avatar: avatar });
  }, [avatar]);
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  return (
    <div className="home">
      {showRegister
        ? Register(
            avatar,
            setAvatar,
            setShowRegister,
            formData,
            setFormData,
            handleRegister,
            requestComplete,
            loader
          )
        : LogIn(
            setShowRegister,
            formData,
            setFormData,
            requestComplete,
            handleLogIn,
            loader
          )}
    </div>
  );
}

function Register(
  avatar,
  setAvatar,
  setShowRegister,
  formData,
  setFormData,
  handleRegister,
  requestComplete,
  loader
) {
  return (
    <div className="register">
      <h2>REGISTER</h2>
      <form
        method="POST"
        onChange={(e) =>
          setFormData({ ...formData, [e.target.name]: e.target.value })
        }
        onSubmit={(e) => handleRegister(e)}
      >
        <input
          type="text"
          placeholder="Username"
          name="username"
          id="username"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          id="password"
        />
        {avatars(avatar, setAvatar)}
        <button type="submit">Submit</button>
      </form>
      {requestComplete != false && <p className="request">{requestComplete}</p>}
      {loader && requestComplete!="Details not filled." && <div className="loader"></div>}
      <p>
        Already have an account?{" "}
        <span
          style={{ color: "#EC5454", cursor: "pointer" }}
          onClick={() => setShowRegister(false)}
        >
          Login?
        </span>
      </p>
    </div>
  );
}

function LogIn(
  setShowRegister,
  formData,
  setFormData,
  requestComplete,
  handleLogIn,
  loader
) {
  return (
    <div className="register">
      <h2>Log In</h2>
      <form
        method="POST"
        onChange={(e) =>
          setFormData({ ...formData, [e.target.name]: e.target.value })
        }
        onSubmit={(e) => {
          handleLogIn(e);
        }}
      >
        <input
          type="text"
          placeholder="Username"
          name="username"
          id="username"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          id="password"
        />
        <button type="submit">Log In</button>
      </form>
      {requestComplete != false && <p className="request">{requestComplete}</p>}
      {loader && requestComplete!="Details not filled." && <div className="loader"></div>}
      <p>
        Don't have an account?{" "}
        <span
          style={{ color: "#EC5454", cursor: "pointer" }}
          onClick={() => setShowRegister(true)}
        >
          Register here.
        </span>
      </p>
    </div>
  );
}

function avatars(avatar, setAvatar) {
  return (
    <div className="avatars">
      <p>Choose your Avatar: </p>
      {
        <div className="avatar">
          <img
            src={beaver}
            className={avatar == "beaver" && "selected-avatar"}
            onClick={() => setAvatar("beaver")}
          />
          <img
            src={dolphin}
            className={avatar == "dolphin" && "selected-avatar"}
            onClick={() => setAvatar("dolphin")}
          />
          <img
            src={eagle}
            className={avatar == "eagle" && "selected-avatar"}
            onClick={() => setAvatar("eagle")}
          />
          <img
            src={turtle}
            className={avatar == "turtle" && "selected-avatar"}
            onClick={() => setAvatar("turtle")}
          />
          <img
            src={parrotAvatar}
            className={avatar == "parrotAvatar" && "selected-avatar"}
            onClick={() => setAvatar("parrotAvatar")}
          />
        </div>
      }
    </div>
  );
}
