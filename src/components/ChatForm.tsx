"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { SendHorizontal } from "lucide-react";
import axios from "axios";
import {io} from 'socket.io-client'

interface ChatFormProps {
  id: string,
  session: User
}

const ChatForm = ({ id, session }: ChatFormProps) => {
  // const socket = io()
  const initialMsg = {
    sender: session.id,
    message: '',
    time: ''
  }
  const [msg, setMsg] = useState<Message>(initialMsg);
  const [chatMessages, setChatMessages] = useState<Message[]>([])

//  useEffect(() => {
//   socket.on('dbMessages', (messages) =>{
//     setChatMessages(messages)
//   })
//   socket.on('message', (message: Message) =>{
//     setChatMessages(prev => [...prev, message])
//   })
//   return () =>{
//     socket.disconnect()
//   }
//  },[])
  const handleSubmit = (e:FormEvent) => {
    e.preventDefault()
    // socket.emit('message', msg)
    setMsg(initialMsg);
    console.log(chatMessages)
    // try {
    //   const res = await axios.post("/api/chats/send", { id, msg });
    //   setMsg(initialMsg);
    // } catch (error) {
    //   console.log(error);
    // }
    
  };
  return (
    <>
    <div>
      <h2>Hello World</h2>
      {chatMessages.map((msg, index) => (<div key={index}>{msg.message}</div>))}
    </div>
      <form onSubmit={handleSubmit} className="w-full border border-red-500">
      <div className="flex items-center w-full">
        <textarea
          className="py-2 px-3 text-xs rounded-md outline-none border border-gray-200 h-auto w-full"
          placeholder="Enter message"
          autoFocus
          onChange={(e) => setMsg((prev) => ({...prev, message: e.target.value, time: new Date().toLocaleTimeString()}))}
        />
        <button>
          <SendHorizontal size={48} color="#070128" strokeWidth={1.25} />
        </button>
      </div>
    </form>
    </>
  
  );
};

export default ChatForm;
