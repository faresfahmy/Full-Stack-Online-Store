import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { respnseUser, userTypes } from "../../types/types";
import { useDetailsUser, useLoginUser } from "../lib/user.query";


const UserContext = createContext<respnseUser | null>(null);


export const useUserContext = () => useContext(UserContext);
export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useDetailsUser();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted((prev) => !prev)
    return () => {
      setIsMounted(false);
    }
  }, [])
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#080d1a] flex items-center space-x-3 justify-center text-slate-400">
        <span className="w-10 h-10 bg-transparent border-b-[#34d399] border-r-[#34d399]  border-t-[#28ad7c] border-l-[#1b7252]  border-2  rounded-full animate-spin "></span>
        <span>Loading page ...</span>
      </div>
    );
  }
  if (isMounted) {
    return (
      <UserContext.Provider value={user?.data}>
        {children}
      </UserContext.Provider>
    );
  }
};