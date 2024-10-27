import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createToken, verifyToken } from './lib/tokenSecurity';
import { decodeJwt } from 'jose';

export async function middleware(req: NextRequest) {

  const authToken = (await cookies()).get('authToken')?.value as string;
  const { pathname } = req.nextUrl;
  const unprotected = ['/api/login', '/api/signup'];

  if (unprotected.includes(pathname))
      return NextResponse.next();

  if (!authToken && !unprotected.includes(pathname)) {
    return NextResponse.json({}, {status: 400});
  }

  const verify = await verifyToken(authToken);

  if (!verify.valid) {
    if (verify.expired) {
      const { id, username } = decodeJwt(authToken) as { id: number; username: string };
      const token = await createToken({ id, username });
      (await cookies()).set({
          name: 'authToken',
          value: token,
          httpOnly: true,
          secure: false,
          sameSite: 'strict',
          path: '/',
          maxAge: 60 * 60 * 24,
      });
    }
    else {
      (await cookies()).delete('authToken');
      return NextResponse.json({}, {status: 400});
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*'
  ],
};