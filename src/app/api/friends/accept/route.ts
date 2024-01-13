import { db } from "@/lib/db";
import { fetchRedis } from "@/lib/redisFetch";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export async function POST(req: Request) {
  
  try {
    const session = await getServerSession(authOptions);
    const { id: idToAdd } = await req.json();
    if (!session) {
      return new Response("Unauthorised", { status: 401 });
    }
    const isAlreadyFriend = (await fetchRedis(
      "sismember",
      `user:${session.user.id}:friends`,
      idToAdd
    )) as 0 | 1;
    if (isAlreadyFriend) {
      return new Response("Already friends with this user", { status: 400 });
    }
   
    await db.srem(`user:${session.user.id}:friend_request`, idToAdd);
    await db.srem(`user:${idToAdd}:sent_friend_request`, session.user.id);
    await db.sadd(`user:${session.user.id}:friends`, idToAdd);
    await db.sadd(`user:${idToAdd}:friends`, session.user.id);
    
    return new Response("Friend request accepted", { status: 200 });
  } catch (error) {
    console.log(error);
    // user:1df70201-d0c0-4994-8003-1cd0156bd19c:friend_request
  }
}
