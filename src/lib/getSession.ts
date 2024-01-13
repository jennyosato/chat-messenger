import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";

const getSession = async () => {
  const session = await getServerSession(authOptions);
  return { session };
};
export default getSession;
