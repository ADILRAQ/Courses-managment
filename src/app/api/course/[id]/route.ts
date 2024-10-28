import { deleteCourse, updateCourse } from "@/services/courseServices";
import { NextResponse } from "next/server";

export async function PUT(req :Request) {
  
  // const { id } = await params;
  const {title, description} = await req.json();
  const userId = Number(req.headers.get('X-User-Id'));
  const splits = req.url.split('/api/course/');
  const id = splits[1];

  const data = await updateCourse(Number(id), userId, title, description);

  return (
    data ?
      NextResponse.json({message: 'Updated !'}, {status: 201})
    :
      NextResponse.json({message: "Didn't update !"}, {status: 401})
  );
}

export async function DELETE(req :Request) {
  
  // const { id } = await params;
  const userId = Number(req.headers.get('X-User-Id'));
  const splits = req.url.split('/api/course/');
  const id = splits[1];

  const data = await deleteCourse(Number(id), userId);

  return (
    data ?
      NextResponse.json({message: 'Deleted !'}, {status: 201})
    :
      NextResponse.json({message: "Didn't delete !"}, {status: 401})
  );
}
