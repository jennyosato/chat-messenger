'use client'
import { FC, FormEvent, useState } from 'react'
import axios from 'axios'

interface pageProps {
  
}

const page: FC<pageProps> = ({}) => {
    const [email, setEmail] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSubmit = async(e:FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try{
         await axios.post('/api/friends/add',{email})
         console.log('sent')
        }catch(error){
        console.log(error)
        }finally{
            setIsLoading(false)
        }
    }
  return <div>
    <h1>Send Friend Request</h1>
    <form onSubmit={handleSubmit}>
        <div>
            <label>Email</label>
            <input  type='email' placeholder="Enter friend's email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button>Add</button>
        {isLoading && <div>Loading ...</div>}
    </form>
  </div>
}

export default page