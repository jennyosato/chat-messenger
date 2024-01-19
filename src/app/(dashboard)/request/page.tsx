import React from "react";
import { fetchRedis } from "@/lib/redisFetch";
import getSession from "@/lib/getSession";
import FriendRequestList from "@/components/FriendRequestList";

const page = async () => {
  const { session } = await getSession();

  const friendRequest = (await fetchRedis(
    "smembers",
    `user:${session?.user.id}:friend_request`
  )) as string[];
 
 // const request = friendRequest.map(friend => JSON.parse(friend))
  const requests = await Promise.all(
    friendRequest.map(async (id) => {
      const request = (await fetchRedis("get", `user:${id}`));
      return JSON.parse(request)
      // return <FriendRequest key={id} user={req} />;
    })
  );


  return (
    <div>
      {/* <div className="bg-blue-100 w-4/5 min-h-[440px]">{requests}</div> */}
    <FriendRequestList sessionId={session.user.id} incomingRequest={requests} />
    </div>
  );
};

export default page;
