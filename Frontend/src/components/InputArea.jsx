import React from 'react'
import './InputArea.css'
import axios from 'axios';

export default function InputArea(props) {
  return (
    <div className='inputArea'>
      <input type="text" placeholder='Enter your prompt here.'
      value={props.prompt} onChange={e=>props.setPrompt(e.target.value)}/>
      <button className='go-button' onClick={async ()=>props.setResponse(await callToGPT(props.prompt))}></button>
    </div>
  )
}

async function callToGPT(prompt) {
    if(!prompt)
    return "Empty Prompt";
    try {
      const response = await axios.post(
        "https://chatty-server-2xu5.onrender.com/chat",
        {
          prompt: prompt,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      return response.data.output;
    } catch (e) {
      console.log(e);
    }
    
}
