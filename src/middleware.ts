import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {

  const authToken = (await cookies()).get('authToken')?.value;
  const { pathname } = req.nextUrl;
  const unprotected = ['login', 'signup'];

  // console.log("---> Authtoken:", authToken);
  console.log("---> path:", pathname);

  if (!authToken && !unprotected.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next(); // Allow the request if token exists
}

export const config = {
  matcher: [
    '/:path*'
  ],
};