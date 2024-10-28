import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/tokenSecurity';

declare module 'next/server' {
  interface NextResponse {
      user?: { id: number; username: string }; // Extend the NextResponse interface
  }
}

export async function middleware(req: NextRequest) {

  const authToken = (await cookies()).get('authToken')?.value as string;
  const { pathname } = req.nextUrl;
  const unprotected = ['/api/login', '/api/signup'];
  const res = NextResponse.next();

  if (unprotected.includes(pathname))
      return res;

  if (!authToken && !unprotected.includes(pathname)) {
    return NextResponse.json({}, {status: 400});
  }

  const verify = await verifyToken(authToken);

  if (!verify.valid) {
    // if (verify.expired) {
    //   const { id, username } = decodeJwt(authToken) as { id: number; username: string };
    //   const token = await createToken({ id, username });
    //   (await cookies()).set({
    //       name: 'authToken',
    //       value: token,
    //       httpOnly: true,
    //       secure: false,
    //       sameSite: 'strict',
    //       path: '/',
    //       maxAge: 60 * 60 * 24,
    //   });
    //   res.user = {id, username} as {id: number, username: string};
    // }
    // else {
      (await cookies()).delete('authToken');
      return NextResponse.json({}, {status: 400});
    // }
  }
  
  const { id } = verify.decoded as {id: number};
  // res.user = {id, username} as {id: number, username: string};
  res.headers.set('X-User-Id', id.toString());

  return res;
}

export const config = {
  matcher: [
    '/api/:path*'
  ],
};