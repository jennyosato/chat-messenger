import { db } from "@/lib/db";
import getSessions from "@/lib/getSession";
import { fetchRedis } from "@/lib/redisFetch";

export default async function POST(req: Request) {
  const { id: idToAdd } = await req.json();
  const { session } = await getSessions();
  try {
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
    const isSentRequest = await fetchRedis(
      "sismember",
      `user:${session.user.id}:friend_request`,
      idToAdd
    );
    if (isSentRequest) {
      return new Response("Already sent a request to this user", {
        status: 400,
      });
    }
    await db.sadd(`user:${session.user.id}:friends`, idToAdd);
    await db.sadd(`user:${idToAdd}:friends`, session.user.id);
    await db.srem(`user${session.user.id}:friend_request`, idToAdd);
    return new Response("Friend request accepted", { status: 200 });
  } catch (error) {}
}
