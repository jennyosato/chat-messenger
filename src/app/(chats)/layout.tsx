import React, { ReactNode } from "react";
import { getServerSession } from "next-auth/next";
import { signOut } from "next-auth/react";
import { authOptions } from "@/lib/auth";
import SignOutButton from "@/components/SignOut";
import Link from "next/link";
import { fetchRedis } from "@/lib/redisFetch";
import Image from "next/image";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession(authOptions);

  const friends = (await fetchRedis(
    "smembers",
    `user:${session?.user.id}:friends`
  )) as string[];

  const friendsList = await Promise.all(
    friends.map(async (id) => {
      const req = await fetchRedis("get", `user:${id}`);
      const friend = JSON.parse(req) as User;
      return (
        <Link href={`/chats/${session?.user.id}_${id}`} key={id} className="">
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
  return (
    <div className="flex">
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
        <div>{friendsList}</div>
      </div>
      {children}
    </div>
  );
};

export default layout;
