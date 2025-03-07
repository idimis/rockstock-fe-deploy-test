import { useSession, signOut } from "next-auth/react";

export const useAuth = () => {
  const { data: session, status } = useSession();

  const logout = async () => {
    await signOut({ redirect: false });
  };

  return { 
    session, 
    status, 
    logout, 
    accessToken: session?.accessToken || null, 
  };
};
