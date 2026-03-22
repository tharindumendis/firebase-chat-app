import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthPage = request.nextUrl.pathname === '/';
  const isChatPage = request.nextUrl.pathname.startsWith('/chat');

  // Allow authenticated users to access auth page (they'll be redirected via client)
  if (isAuthPage) {
    return NextResponse.next();
  }

  // Allow unauthenticated access to non-chat pages
  if (!isChatPage) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
