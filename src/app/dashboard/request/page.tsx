import React from "react";
import FriendRequest from "@/components/FriendRequest";

const page = () => {
  return (
    <div>
      page
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#121212"
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-x-circle"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m15 9-6 6" />
        <path d="m9 9 6 6" />
      </svg>
    </div>
  );
};

export default page;
