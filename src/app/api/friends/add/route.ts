import { fetchRedis } from "@/lib/redisFetch";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Response) {
  try {
    const session = await getServerSession(authOptions);
    const { email } = await req.json();
    const userIdToAdd = (await fetchRedis(
      "get",
      `user:email:${email}`
    )) as string;
    if (!session) {
      return new Response("Unauthorized User", { status: 401 });
    }

    if (!userIdToAdd) {
      return new Response("This user doesn't exist", { status: 400 });
    }

    if (userIdToAdd === session.user.id) {
      return new Response("You can't send a friend request to yourself", {
        status: 400,
      });
    }
    const isSent = (await fetchRedis(
      "sismember",
      `user:${session.user.id}:friend_request`,
      userIdToAdd
    )) as 0 | 1;
    if (isSent) {
      return new Response("This User already sent you a friend request", {
        status: 400,
      });
    }
    const isAlreadyFriends = (await fetchRedis(
      "sismember",
      `user:${session.user.id}:friends`,
      userIdToAdd
    )) as 0 | 1;

    if (isAlreadyFriends) {
      return new Response("You are already friends with this user", {
        status: 400,
      });
    }
    const sentRequest = await fetchRedis(
      "sismember",
      `user:${session.user.id}:sent_friend_request`,
      userIdToAdd
    );

    if (sentRequest) {
      return new Response("You already sent a request to this user", {
        status: 400,
      });
    }

    db.sadd(`user:${session.user.id}:sent_friend_request`, userIdToAdd);
    db.sadd(`user:${userIdToAdd}:friend_request`, session.user.id);
    return new Response("Friend request sent successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
}
