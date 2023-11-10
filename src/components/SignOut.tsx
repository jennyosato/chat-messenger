'use client'

import { signOut } from "next-auth/react"
import { ButtonHTMLAttributes, FC } from "react"

interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{}
 
const SignOutButton: FC<SignOutButtonProps> = () => {
    const handleSignOut = async() => {
        try {
            await signOut()
            
        } catch (error) {
            console.log(error)
        }
    }
    return ( 
        <div>
            <button className="bg-red-500 px-4 py-2 text-sm text-white" onClick={handleSignOut}>Sign Out</button>
        </div>
     );
}
 
export default SignOutButton;