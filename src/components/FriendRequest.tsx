"use client";
import { FC } from "react";
import Image from "next/image";
// import { Check } from 'lucide-react';
import { XCircle } from 'lucide-react';
import { CheckCircle2 } from 'lucide-react';
import axios from "axios";

interface FriendRequestProps {
  user: User;
}

const FriendRequest: FC<FriendRequestProps> = ({ user }) => {
  const addFriend = async(id: string) => {
    try{
      const res = await axios.post('/api/friends/accept', {id})
      console.log(res)
    }catch(err){
      console.log(err)
    }
    
  }

  const denyFriend = async(id: string) => {

    try{
      const res = await axios.post('/api/friends/deny', {id})
      console.log(res)
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="flex items-center gap-1 bg-white py-3 px-2">
      <div>
        <Image
          src={user.image}
          alt="Your profile picture"
          width={40}
          height={40}
          className="border rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-0">
        <h2 className="text-black font-semibold leading-4 ">{user.name}</h2>
        <span className="text-xs">{user.email}</span>
      </div>
      <div className="flex ">
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-check"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg> */}
        {/* <Check className="border-2 p-1 border-black rounded-full" /> */}
        <button onClick={() => denyFriend(user.id)} className="text-4xl">
        <XCircle size={48} color="#df0707" strokeWidth={1.25} />
        </button>
       <button onClick={() => addFriend(user.id)}>
       <CheckCircle2 size={48} color="#025a18" strokeWidth={1.25} />
       </button>
      
      </div>
    </div>
  );
};

export default FriendRequest;
