import { db } from "@/lib/db"

export default async function Home() {
  await db.set('user', 'Jennifer')
  return (<div>Hello World</div>)
}
