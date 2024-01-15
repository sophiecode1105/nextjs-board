import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === '/list') {
        console.log('HIIIII')
        const response = NextResponse.redirect(new URL('/list', request.url))
        response.headers.set('x-middleware-cache', 'no-cache') // Disables middleware caching
        return response;
    }
}