import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";

const getSession = async () => {
    console.log('Hello world')
  const session = await getServerSession(authOptions);
  return { session };
};
export default getSession;
