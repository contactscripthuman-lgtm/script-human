import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const next = searchParams.get('next') ?? '/writing-room'

    // Temporary passthrough route since Supabase auth is removed
    // This will just immediately redirect the user to the requested`next` route
    return NextResponse.redirect(new URL(next, request.url))
}
