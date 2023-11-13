
import { ReactNode } from "react";
import SignOutButton from "@/components/SignOut";
import Link from "next/link";

interface LayoutProps {
    children : ReactNode
}

const Layout =  async({children}:LayoutProps) => {
    return(
        <div className="flex h-screen w-full ">
            <div className="hidden md:flex h-full w-full max-w-xs grow flex-col gap-y-5 overflow-y-auto border-r bg-white px-12 border-gray-100">
            <div className='text-4xl font-bold bg-clip-text'>Zonnes</div>
            <nav>
                <ul>
                    <li>
                        <Link href='/dashboard'>Profile</Link>
                    </li>
                    <li><Link href='/dashboard/friends'>Friends List</Link></li>
                    <li>
                        <Link href='/dashboard/groups'>Groups</Link>
                    </li>
                </ul>
            </nav>
            <SignOutButton />
            </div>
            <aside className="container max-h-screen w-full">
            {children}
            </aside>
           
        </div>
    )
}
export default Layout