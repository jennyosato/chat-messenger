import { db } from "@/lib/db";
import { fetchRedis } from "@/lib/redisFetch";
import getSession from "@/lib/getSession";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { id: idToDeny } = await req.json();
    const { session } = await getSession();

    if (!session) {
      return new Response("Unauthorised", { status: 401 });
    }
    db.srem(`user:${session.user.id}:friend_request`, idToDeny);
    // user:467c19d6-18de-4884-aa8a-15e2c9ec334a:friend_request
    db.srem(`user:${idToDeny}:sent_friend_request`, session.user.id);
    return new Response("Friend request denied", { status: 200 });
  } catch (err) {}
}
