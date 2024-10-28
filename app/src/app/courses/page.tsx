'use client';
import Card from "@/components/Card";
import { UserContext } from "@/context/UserContext";
import _axios from "@/lib/_axios";
import { useContext, useEffect, useState } from "react";
import { CourseData } from "../dashboard/page";

export default function Courses() {

  const [courses, setCourses] = useState<CourseData[]>([]);

  useEffect(() => {
    const data = async () => {
      const res = await _axios.get('/courses');
      // console.log(res.data.courses);
      setCourses(res.data.courses);
    }
    data();

  }, []);

  return (
    <div className="flex-1 w-[70%] max-w-[1000px] mb-12 mx-auto flex flex-col gap-6">
      <h1 className="font-bold text-3xl font-poppins">All skills you need in one place</h1>
      {/* <div className="relative flex-1 w-[70%] max-w-[1000px] mb-12 mx-auto flex flex-col gap-6"> */}
        <div className="flex-1 w-full grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
          {
            courses.length ? courses?.map(course => <Card key={course.id} id={course.id} title={course.title} description={course.description} />) : <></>
          }
        </div>
      {/* </div> */}
    </div> 
  );
}
