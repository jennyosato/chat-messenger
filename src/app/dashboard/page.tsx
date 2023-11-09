
import { authOptions } from '@/lib/auth'
import React from 'react'
import { getServerSession } from 'next-auth'

const Page = async() => {
   const session  = await getServerSession(authOptions)
   console.log(session)
  return (
    <div className='text-red-500 text-3xl font-bold'>Hello World
    
    </div>
  )
}


export default Page
