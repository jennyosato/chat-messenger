import { db } from "@/lib/db";
import { fetchRedis } from "@/lib/redisFetch";
import getSession from "@/lib/getSession";

// {"sender":"1df70201-d0c0-4994-8003-1cd0156bd19c","message":"hi there","time":"4:00:07 PM"}
export async function POST(req:Request){
    const {session} = await getSession()
    const {msg, id} = await req.json()
    try {
        if(!session){
            return new Response("Unauthorised",{status: 400})
        }
        db.sadd(`user:${session.user.id}:chats:${id}`, msg)
        db.sadd(`user:${id}:chats:${session.user.id}`, msg)
       return new Response('Message sent', {status: 200}) 
    } catch (error) {
       console.log(error) 
    }
}