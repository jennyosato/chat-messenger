import React from "react";
import { getServerSession } from "next-auth/next";
import { signOut } from "next-auth/react";
import { authOptions } from "@/lib/auth";
import SignOutButton from "@/components/SignOut";


export default async function Page() {
 const session = await getServerSession(authOptions)

  // console.log(session);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="text-red-500 text-3xl font-bold container bg-green-500">
      Hello World
      {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
    
    </div>
  );
}
