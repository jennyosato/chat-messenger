"use client";
import React, { useState } from "react";
import { SendHorizontal } from "lucide-react";
import axios from "axios";
interface ChatFormProps {
  id: string,
  session: User
}

const ChatForm = ({ id, session }: ChatFormProps) => {
  const initialMsg = {
    sender: session.id,
    message: '',
    time: ''
  }
  const [msg, setMsg] = useState<Message>(initialMsg);
  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/chats/send", { id, msg });
      setMsg(initialMsg);
    } catch (error) {
      console.log(error);
    }
  };
  return (
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
  );
};

export default ChatForm;
