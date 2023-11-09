import { fetchRedis } from "@/lib/redisFetch"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export default async function POST(req:Request){
    const sessionData = await getServerSession(authOptions)
    console.log(sessionData)
try{
    const {email} = req.body
    const userIdToAdd = (await fetchRedis('get', `user:email:${email}`)) as string
    if(!userIdToAdd){
        return new Response('This user doesn\'t exist', {status: 400})
    }
    if(!sessionData){
        return new Response('Unauthorized', {status: 401})
    }
    if(userIdToAdd === sessionData.user.id){
        return new Response('You can\'t send a friend request to yourself', {status: 400})
    }
    const isSent = (await fetchRedis('sismember', `user:${userIdToAdd}:friend_request`, sessionData.user.id)) as 0 | 1
    if(isSent){
        return new Response('You already sent a friend request to this user', {status: 400})
    }
    const isAlreadyFriends = (await fetchRedis('sismember', `user:${sessionData.user.id}`, userIdToAdd)) as 0 | 1

    if(isAlreadyFriends){
        return new Response('You are already friends with this user', {status: 400})
    }

    db.sadd(`user:${userIdToAdd}:friend_request`, sessionData)
}catch(error){
    console.log(error)

}
}