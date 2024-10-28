import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  
  (await cookies()).delete('authToken');
  return NextResponse.json({}, {status: 400});
}