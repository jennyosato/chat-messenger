import { db } from "@/lib/db"; 
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { fetchRedis } from "@/lib/redisFetch";

export async function POST (req:Request){
    try{
        const session = await getServerSession(authOptions)
        const {id: idToUnfriend} = await req.json()
        if(!session){
            return new Response('Unauthorised', {status: 401})
        }
        const notFriends = await fetchRedis("sismember", `user:${session.user.id}:friends`, idToUnfriend)
        if(!notFriends){
            return new Response("You are not friends with this user", {status: 400})
        }
        await db.srem(`user:${session.user.id}:friends`, idToUnfriend)
        await db.srem(`user:${idToUnfriend}:friends`, session.user.id)
        return new Response('You are no longer friends with this user', {status: 200})
    }
    catch(err){
        console.log(err)
    }
}