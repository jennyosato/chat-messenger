import React from "react";
import FriendRequest from "@/components/FriendRequest";
import { fetchRedis } from "@/lib/redisFetch";
import getSession from "@/lib/getSession";

const page = async () => {
  const { session } = await getSession();

  const friendRequest = (await fetchRedis(
    "smembers",
    `user:${session?.user.id}:friend_request`
  )) as string[];
 
  const requests = await Promise.all(
    friendRequest.map(async (id) => {
      const request = (await fetchRedis("get", `user:${id}`));
      const req = JSON.parse(request)
      return <FriendRequest key={id} user={req} />;
    })
  );


  return (
    <div>
      <div className="bg-blue-100 w-4/5 min-h-[440px]">{requests}</div>
    </div>
  );
};

export default page;
