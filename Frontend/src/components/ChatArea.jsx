import React, { useEffect, useState } from 'react'
import './ChatArea.css'
import Chat from './Chat'
import InputArea from './InputArea'
import beaver from "../assets/beaver.png";
import dolphin from "../assets/dolphin.png";
import eagle from "../assets/eagle.png";
import parrotAvatar from "../assets/parrotAvatar.png";
import turtle from "../assets/turtle.png";
import ChattyContext from "../ChattyContext";

export default function ChatArea() {
  const [prompt, setPrompt] = useState("");
  const [generate, setGenerate] = useState(false);
  const [response, setResponse] = useState("");
  useEffect(()=>{
    console.log(response)
  }, [response])
  return (
    <div className='chatArea'>
        <Chat prompt={prompt} response={response} generate={generate} setPrompt={setPrompt}></Chat>
        <InputArea prompt={prompt} setPrompt={setPrompt} setResponse={setResponse} setGenerate={setGenerate}></InputArea>
    </div>
  )
}
