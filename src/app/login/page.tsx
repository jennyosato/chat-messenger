"use client";
import { signIn } from "next-auth/react";
import React, { useState } from "react";


const Login = () => {

  const [isLoading, setIsLoading] = useState(false);
  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    <div>
      <button onClick={signInWithGoogle}>sign In</button>
    </div>
  );
};

export default Login;

