import { db } from "@/lib/db";
import { fetchRedis } from "@/lib/redisFetch";
import getSession from "@/lib/getSession";



export default async function POST(req:Request) {
  
  const { session } = await getSession();
  const { msg, id } = await req.json();
  const chats: string[] = await fetchRedis(
    "smembers",
    `user:${session?.user.id}:chats:${id}`
  );
  try {
    if (!session) {
      return new Response("Unauthorised", { status: 400 });
    }

    

    db.sadd(`user:${session.user.id}:chats:${id}`, msg)
    db.sadd(`user:${id}:chats:${session.user.id}`, msg)
    return new Response("Message sent", { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
