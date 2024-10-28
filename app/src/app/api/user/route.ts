import { getUserById } from "@/services/userServices";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

  const userId = Number(req.headers.get('X-User-Id'));

  const user = await getUserById(userId);

  if (!user)
    return NextResponse.json({}, {status: 400});

  const {id, username} = user;

  return NextResponse.json({id, username}, {status: 200});
}
