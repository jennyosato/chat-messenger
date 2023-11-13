"use client";
import { FC } from "react";
import Image from "next/image";

interface FriendRequestProps {
  user: User;
}

const FriendRequest: FC<FriendRequestProps> = ({ user }) => {
  return (
    <div>
      <div>
        <Image
          src={user.image}
          alt="Your profile picture"
          width={400}
          height={400}
        />
      </div>
      <div>
        <h2>{user.name}</h2>
        <span>{user.email}</span>
      </div>
      <div>
        <svg
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
        </svg>
        
      </div>
    </div>
  );
};

export default FriendRequest;
