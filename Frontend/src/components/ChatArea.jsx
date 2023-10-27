import React, { useState } from 'react'
import './ChatArea.css'
import Chat from './Chat'
import InputArea from './InputArea'

export default function ChatArea() {
  const [prompt, setPrompt] = useState("");
  const [generate, setGenerate] = useState(false);
  const [response, setResponse] = useState("");
  return (
    <div className='chatArea'>
        <Chat prompt={prompt} response={response} generate={generate} setPrompt={setPrompt}></Chat>
        <InputArea prompt={prompt} setPrompt={setPrompt} setResponse={setResponse} setGenerate={setGenerate}></InputArea>
    </div>
  )
}
