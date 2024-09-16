import { upper } from "@/services/react_query/functions/mutations";
import { NODE_URL } from "@/settings/fe_config";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const filter = async (req: NextRequest, actor: 'guest' | 'owner' | 'admin') : Promise<NextResponse> => {
    // Get refresh token in cookies
    const url = req.nextUrl.clone()
    url.pathname = `/${actor}`
    const refreshTokenCookie = req.cookies.get(`refreshTokenFor${upper(actor)}`)
    if (!refreshTokenCookie) return NextResponse.redirect(url)

    // Get refresh token
    const refreshToken = refreshTokenCookie.value

    // Get payload, check if it expired
    try {
        const payload = await axios.post(`${NODE_URL}/api/auth/verify`, { refreshToken })
        if (!payload.data.tokenValid) {
            const response = NextResponse.redirect(url)
            response.cookies.delete(`tokenFor${upper(actor)}`)
            response.cookies.delete(`refreshTokenFor${upper(actor)}`)
            return response
        }
    } catch (e: any) {       
        return NextResponse.redirect(url)
    }
    
    return NextResponse.next()
}

export default filter