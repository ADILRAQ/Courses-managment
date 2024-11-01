import { createCourse, getUserCourses } from "@/services/courseServices";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

  const userId = Number(req.headers.get('X-User-Id'));

  const courses = await getUserCourses(userId);
  // console.log('Courses:', courses)

  return NextResponse.json({...courses}, {status: 200});
}

export async function POST(req :Request) {
  
  const {title, description} = await req.json();
  const userId = Number(req.headers.get('X-User-Id'));


  const data = await createCourse(userId, title, description);

  return (
    data ?
      NextResponse.json({}, {status: 201})
    :
      NextResponse.json({}, {status: 401})
  );
}