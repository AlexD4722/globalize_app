import TokenManager, { TokenPayload } from "@/services/jwt/token";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' })
    const refreshToken = req.body.refreshToken

    const payload = TokenManager.verifyRefreshToken(refreshToken) as TokenPayload
    if (!payload || !payload.exp || payload.exp < Date.now() / 1000) {
        res.status(400).json({ tokenValid: false })
    }
        
    res.status(200).json({ tokenValid: true })
}