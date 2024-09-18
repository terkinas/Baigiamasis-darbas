import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    if (
    request.nextUrl.pathname.startsWith('/profile') ||
    request.nextUrl.pathname.startsWith('/admin')

) {
        // const authToken = request.cookies.get('connect.sid')

        // if (!authToken) {
        //     return NextResponse.redirect(new URL('/', request.url))
        // }
    }

//   return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [ '/admin/:path*', '/profile/:path*',
  '/deposit/:path*'
  ],
}