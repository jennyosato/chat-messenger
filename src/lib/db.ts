import { Redis } from "@upstash/redis";

export const db = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN
})
//NEXTAUTH_SECRET = p41KQHEvMmf1cSpyKEZHT3sVdM/wmTerX58DmMa6hg8=