'use client';
import Card from "@/components/Card";
import { UserContext } from "@/context/UserContext";
import _axios from "@/lib/_axios";
import { useContext, useEffect } from "react";

export default function Courses() {

  const userContext = useContext(UserContext);

  useEffect(() => {
    const data = async () => {
      const res = await _axios.get('/course');
      console.log(res);
    }
    data();

  }, []);

  return (
    <div className="min-w-[1000px] w-[60%] min-h-[700px] h-[90%] mx-auto flex flex-col gap-10">
      <h1 className="font-bold text-3xl font-poppins">All skills you need in one place</h1>
      <div className="flex-1">
        <Card />
      </div>
    </div> 
  );
}
