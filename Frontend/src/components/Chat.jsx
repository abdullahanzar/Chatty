import React, { useEffect, useState, useRef } from "react";
import "./Chat.css";
import chattyParrot from '../assets/parrot.png'
import beaver from "../assets/beaver.png";
import dolphin from "../assets/dolphin.png";
import eagle from "../assets/eagle.png";
import parrotAvatar from "../assets/parrotAvatar.png";
import turtle from "../assets/turtle.png";

export default function Chat(props) {
  const [chat, setChat] = useState(()=>{
    const retrieved = localStorage.getItem("previousChatData");
    return retrieved ? JSON.parse(retrieved) : []
});
  const avatar = getAvatar();
  const scrollable = useRef(null);
  useEffect(()=>{
    if(!props.prompt && !props.response)
    return;
    const chatObject = {
      user: props.prompt,
      chatGPT: props.response
    }
    setChat([...chat, chatObject])
  }, [props.response])
  useEffect(()=>{
    scrollToBottom();
  }, [chat, props.generate])
  useEffect(()=>{
    props.setPrompt("");
    const serializedChat = JSON.stringify(chat);
    localStorage.setItem("previousChatData", serializedChat);
  }, [chat])
  const scrollToBottom = () => {
    if (scrollable.current) 
      scrollable.current.scrollTo(
        {
          top: scrollable.current.scrollHeight,
          behaviour: "smooth"
        }
      )
  }
  return <div className="chat" ref={scrollable}>
    {
      chat.map((convo, key)=>(
        <div className="conversation" key={key}>
        <div className="user">
          <img src={avatar} alt="" />
          <p>{convo.user}</p>
        </div>
        <div className="gpt">
          <img src={chattyParrot} alt="" />
          <p>{convo.chatGPT}</p>
        </div>
        </div>
      ))  
    }
    {
      props.generate && <div className="generating">
        <p>Generating</p> <span className="loader-generator"></span>
      </div>
    }
  </div>
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