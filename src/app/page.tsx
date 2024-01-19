import React from "react";
import { getServerSession } from "next-auth/next";
import { signOut } from "next-auth/react";
import { authOptions } from "@/lib/auth";
import SignOutButton from "@/components/SignOut";
import Link from "next/link";
import { fetchRedis } from "@/lib/redisFetch";
import Image from "next/image";
// import img from "../../public/bgd.jpg";

export default async function Page() {
  const session = await getServerSession(authOptions);

  const friends = (await fetchRedis(
    "smembers",
    `user:${session?.user.id}:friends`
  )) as string[];
  const requests = (await fetchRedis(
    "smembers",
    `user:${session?.user.id}:friend_request`
  )) as string[];

  
  const friendsList = await Promise.all(
    friends.map(async (id) => {
      const req = await fetchRedis("get", `user:${id}`);
      const friend = JSON.parse(req) as User;
      return (
        <Link href="/add" key={id} className="">
          <div className="flex items-center gap-3 text-center bg-gray-100 shadow py-2 px-1 w-full">
            <Image
              src={friend.image}
              alt={friend.name}
              width={30}
              height={30}
              className="object-cover rounded-full"
            />
            <h2>{friend.name}</h2>
          </div>
        </Link>
      );
    })
  );

  // console.log(session);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex">
      {/* ChatList section */}
      <div className="w-1/4 border-r border-gray-200 min-h-screen px-2 flex flex-col gap-5 pt-7">
        <div className="flex items-center justify-between px-4">
          <h2 className="text-2xl font-bold">Zonnes</h2>
          <Link className="font-semibold text-2xl" href="/add">
            +
          </Link>
        </div>
        <div className="bg-gray-200 rounded flex items-center shadow-sm py-1 px-2">
          <button
            autoFocus
            className="focus:bg-white focus:shadow-lg py-2 px-4 w-full font-medium outline-none"
          >
            Chats
          </button>
          <button className="focus:bg-white focus:shadow-lg py-2 px-4 w-full font-medium outline-none">
            Groups
          </button>
        </div>
        {/* friendlist */}
        <button className="text-right text-purple-800">Friends List</button>
        <div>{friendsList}</div>
        <div className="flex items-center">
          <p>Requests</p>
          {requests.length ? <span className="flex justify-center items-center w-5 h-5 rounded-full bg-purple-900 text-white font-semibold">{requests.length}</span>: null}
        </div>
      </div>
      {/* Chat section */}
      <div className="p-5 flex flex-col gap-4 w-full ">
        <div className="shadow-md rounded w-full h-[100px] bg-white ">

        </div>
        <div className="rounded-md  min-h-[650px] bg-[url('../../public/bgd.jpg')] bg-blend-overlay bg-gray-200 borde2 shadow-xl  ">

        </div>
      </div>
      <SignOutButton />
    </div>
  );
}
