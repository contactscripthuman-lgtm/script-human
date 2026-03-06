import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Session check logic for Firebase will be implemented here later.
    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Only match dashboard routes for protection.
         * Exclude static files, images, and API routes.
         */
        '/dashboard/:path*',
    ],
}
