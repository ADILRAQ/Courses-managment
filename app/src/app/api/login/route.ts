import { comparePasswords } from "@/lib/pswdSecurity";
import { getUser } from "@/services/userServices";
import { NextResponse } from "next/server";
import { createToken } from "@/lib/tokenSecurity";
import { cookies } from "next/headers";

export async function POST(req: Request) {

  const {username, password} = await req.json();

  // console.log(username, password);

  const user = await getUser(username);

  if (user) {
    const isCorrect = await comparePasswords(password, user.password);
    if (isCorrect) {

      const token = await createToken({id: user.id, username});

      (await cookies()).set({
        name: 'authToken',
        value: token,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24,
      });

      return NextResponse.json({ user }, { status: 201 });
    }
  }

  return NextResponse.json({message: 'Invalid username or password !'}, {status: 401});
} 