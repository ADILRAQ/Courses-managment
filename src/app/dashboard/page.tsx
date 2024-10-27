'use client'
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

const Dashboard = () => {

  const userContext = useContext(UserContext);

  return (
    <div>
      Dashboard
    </div>
  )
}

export default Dashboard;
