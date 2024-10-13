import { NextRequest, NextResponse } from 'next/server'
import authorization from './middlewares/authorization'

export async function middleware(req: NextRequest) {
    let response = NextResponse.next()
    response = await authorization(req)
    return response
}

export const config = {
    matcher: ['/guest/:path+', '/admin/:path+', '/owner/:path+', '/owner'],
}