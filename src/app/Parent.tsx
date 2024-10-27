'use client'

import { UserContext, UserData } from "@/context/UserContext";
import _axios from "@/lib/_axios";
import { useEffect, useState } from "react";

const Parent :React.FC<{children: React.ReactNode}> = ({children}) => {

  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const res = await _axios.get('/user');

      const {id, username, role} = res.data;

      setUser({
        id, username, role
      })
    }

    if (!user)
      getUser();

  }, []);

  return (
    <>
      <UserContext.Provider value={user}>
      {
        user && children
      }
      </UserContext.Provider>
    </>
  )
}

export default Parent;