import { createToken } from "@/lib/tokenSecurity";
import { createUser } from "@/services/userServices";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req :Request) {

  const {username, password, role} = await req.json();

  const data = await createUser(username, password, role);

  if (data.status === 201 && data.user != undefined) {
    const token = await createToken({id: data.user.id, username});

    (await cookies()).set({
      name: 'authToken',
      value: token,
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    return NextResponse.json({...data.user}, {status: data.status});
  }
  else
    return NextResponse.json({message: data.message}, {status: data.status});
}
