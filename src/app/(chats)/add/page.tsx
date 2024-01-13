"use client";
import { FC, FormEvent, useState, useEffect } from "react";
import axios from "axios";
import { Loader } from "lucide-react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [err, setErr] = useState<string>(" ");

  // useEffect(() => {
  //   setErr("");
  // }, [email]);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("/api/friends/add", { email });
      // console.log(res);
    } catch (error: any) {
      setErr(error.response.data);
    } finally {
      setEmail("");
      setIsLoading(false);
    }
  };
  return (
    <div className="py-8 flex flex-col gap-6 px-4 w-full">
      <h1 className="text-center text-2xl md:text-4xl text-black/70 font-semibold">
        Send Friend Request
      </h1>
      <form
        onSubmit={handleSubmit}
        className="md:w-8/12 relative rounded-md shadow-md bg-gray-200 mx-auto flex items-end py-8 px-4 border border-gray-300"
      >
        <div className="w-3/4">
          <label className="font-semibold text-black text-sm">Email</label>
          <input
            type="email"
            placeholder="Enter friend's email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="placeholder:text-gray-500 placeholder:text-xs w-full py-2 px-3 outline-none"
          />
        </div>
        <button
          disabled={isLoading}
          className="flex items-center justify-center md:min-w-[120px] bg-blue-900 px-6 py-2 text-white font-semibold disabled:opacity-80"
        >
          {isLoading && <Loader className="animate-spin text-sm" />}
          Add
        </button>
        <p className="absolute bottom-2 text-sm font-light text-red-600 italic">{err}</p>
        <p>{!err && 'Friend request sent'}</p>
      </form>
    </div>
  );
};

export default page;
