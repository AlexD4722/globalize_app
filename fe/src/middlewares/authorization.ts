import { NextRequest, NextResponse } from "next/server";
import filter from "./filter";

const authorization = async (req:NextRequest) : Promise<NextResponse> => {
    if (req.nextUrl.pathname.startsWith('/guest')) return filter(req, 'guest')
    if (req.nextUrl.pathname.startsWith('/admin')) return filter(req, 'admin')
    if (req.nextUrl.pathname.startsWith('/owner')) return filter(req, 'owner')
    return NextResponse.next()
}

export default authorization