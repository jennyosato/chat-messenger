"use client";
import { FC, useState, useEffect } from "react";
import { pusherClient } from "@/lib/pusher";
import axios from "axios";
import Image from "next/image";
import { XCircle } from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { convertPusherKey } from "@/utils/helpers";
interface FriendRequestListProps {
  incomingRequest: User[];
  sessionId: string;
}

const FriendRequestList: FC<FriendRequestListProps> = ({
  incomingRequest,
  sessionId,
}) => {
  const [friendRequests, setFriendRequests] = useState<User[]>(incomingRequest);
  const router = useRouter();
  useEffect(() => {
    pusherClient.subscribe(
      convertPusherKey(`user:${sessionId}:friend_request`)
    );
    const handleFriendRequest = ({id, name, email, image}) => {
        setFriendRequests(prev => [...prev, {id, name, image, email}])
    };
    pusherClient.bind("friend_request", handleFriendRequest);
    return () => {
      pusherClient.unsubscribe(
        convertPusherKey(`user:${sessionId}:friend_request`)
      );
      pusherClient.unbind("sent_friend_request", handleFriendRequest);
    };
  }, []);
  const addFriend = async (id: string) => {
    try {
      await axios.post("/api/friends/accept", { id });
      setFriendRequests((prev) => prev.filter((request) => request.id !== id));
      router.refresh();
    } catch (err) {
      console.log(err);
    }
  };
  const denyFriend = async (id: string) => {
    try {
      await axios.post("/api/friends/deny", { id });
      setFriendRequests((prev) => prev.filter((request) => request.id !== id));
      router.refresh();
    } catch (err) {
      console.log(err);
    }
  };
  const requestList = friendRequests.map((user) => {
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
          <button onClick={() => denyFriend(user.id)} className="text-4xl">
            <XCircle size={48} color="#df0707" strokeWidth={1.25} />
          </button>
          <button onClick={() => addFriend(user.id)}>
            <CheckCircle2 size={48} color="#025a18" strokeWidth={1.25} />
          </button>
        </div>
      </div>
    );
  });

  return <div className="flex flex-col">{requestList}</div>;
};

export default FriendRequestList;
