import { upper } from "@/services/react_query/functions/mutations";
import { NODE_URL } from "@/settings/fe_config";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const checkOwner = async (req: NextRequest) : Promise<NextResponse> => {
    // Get refresh token in cookies
    const urlApp = req.nextUrl.clone()
    urlApp.pathname = `/owner/app/listings`
    const refreshTokenCookie = req.cookies.get(`refreshTokenForOwner`)
    if (!refreshTokenCookie) return NextResponse.next()

    // Get refresh token
    const refreshToken = refreshTokenCookie.value

    // Get payload, check if it expired
    try {
        const payload = await axios.post(`${NODE_URL}/api/auth/verify`, { refreshToken })
        if (payload.data.tokenValid) {
            return NextResponse.redirect(urlApp)
        }
        return NextResponse.next()
    } catch (e: any) {       
        return NextResponse.next()
    }
}

export default checkOwner