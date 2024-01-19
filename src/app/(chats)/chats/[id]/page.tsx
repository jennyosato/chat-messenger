import React from "react";
import getSession from "@/lib/getSession";
import { fetchRedis } from "@/lib/redisFetch";
import ChatForm from "@/components/ChatForm";
import Image from "next/image";

interface Props {
  params: {
    id: string;
  }
  
}

const page = async ({ params }: Props) => {
  const { id } = params;

  const [sender, receiver] = id.split("_");
 
  const { session } = await getSession();
  const partner = await fetchRedis("get", `user:${receiver}`);
  const chatPartner: User = JSON.parse(partner);
  const chats: string[] = (await fetchRedis(
    "smembers",
    `user:${sender}:chats:${receiver}`
  )) ;
  const chat = chats.map((i) => JSON.parse(i)) as Message[];
  const sortedChats = chat.sort((c1: Message, c2: Message) =>
    c1.time > c2.time ? 1 : c1.time < c2.time ? -1 : 0
  );
  const msg = sortedChats.map((i: Message) => {
    return (
      <div
        className={` rounded-lg p-3 relative ${
          i.sender === session?.user.id
            ? "self-end bg-gray-500"
            : "self-start bg-gray-400"
        } `}
      >
        <h2>{i.message}</h2>
        <sub className="absolute bottom-0 text-[10px] font-light text-black/50 right-0">
          {i.time}
        </sub>
      </div>
    );
  });
  return (
    <div className="w-full bg-white">
      <div className="relative flex flex-col justify-between w-9/12  max-h-screen ">
        <div className="sticky top-0 left-0 w-full bg-white h-[80px] py-1 flex gap-2 item-center">
          <div>
            <Image
              src={chatPartner.image}
              alt={chatPartner.name}
              width={50}
              height={50}
              referrerPolicy="no-referrer"
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <h2>{chatPartner.name}</h2>
            <p className="text-xs font-medium ">{chatPartner.email}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 max-h-[600px] overflow-auto bg-[url('../../public/bgd.jpg')] bg-blend-overlay bg-gray-200 px-2 py-1" >
        {msg}
        </div>
        <div className="bg-red-500 w-full ">
        <ChatForm id={receiver} session={session?.user} />
      </div>
      </div>

     
    </div>
  );
};

export default page;
