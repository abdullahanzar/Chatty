import React from 'react'
import './ChatArea.css'
import Chat from './Chat'
import InputArea from './InputArea'

export default function ChatArea() {
  return (
    <div className='chatArea'>
        <Chat></Chat>
        <InputArea></InputArea>
    </div>
  )
}
