import {NextAuthOptions} from 'next-auth'
import { db } from './db'
import { UpstashRedisAdapter } from '@next-auth/upstash-redis-adapter'
import GoogleProvider from 'next-auth/providers/google'

const getGoogleCredentials = () => {
    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET
    if(!clientId || clientId.length === 0){
        throw new Error('Missing Client ID')
    }
    if(!clientSecret || clientSecret.length === 0){
        throw new Error('Missing Client Secret')
    }
    return{ clientId, clientSecret}
}
export const authOptions:NextAuthOptions = {
    adapter: UpstashRedisAdapter(db),
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/login'
    },
    providers: [
        GoogleProvider({
       clientId: getGoogleCredentials().clientId,
       clientSecret: getGoogleCredentials().clientSecret
        })

    ],
    callbacks: {
        async jwt({token, user}){
            const dbUser = (await db.get(`user: ${token.id}`)) as User | null
            if(!dbUser){
                token.id = user.id
                return token
            }
            return {
                id: dbUser.id,
                email: dbUser.email,
                image: dbUser.image,
                name : dbUser.name
            }
        },
        async session({token, session}){
            if(token){
                session.user.id = token.id,
                session.user.email = token.email,
                session.user.image = token.picture,
                session.user.name = token.name    
            }
            return session
        },
        redirect(){
            return '/'
        }
        }
    }