import RefreshToken from '@/models/RefreshToken'
import TokenManager, { TokenPayload, UserType } from '@/services/jwt/token'
import { JsonWebTokenError } from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from 'cookie'
import { upper } from '@/services/react_query/functions/mutations'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }
    try {
        //Check if the refresh token is valid
        const refreshToken = req.body.refreshToken
        if (!refreshToken) {
            return res.status(400).json({ message: 'Invalid request' })
        }
        TokenManager.verifyRefreshToken(refreshToken)

        //Compare refresh token in the database
        const token = await RefreshToken.findOne({
            where: { token: refreshToken, status: 'active' },
        })

        //If the refresh token is not found, return an error message
        if (!token) {
            return res.status(400).json({ message: 'Invalid refresh token' })
        }

        //Generate a new access token
        const payload = TokenManager.verifyRefreshToken(refreshToken) as TokenPayload
        const newAccessToken = TokenManager.regenerateAccessToken(payload)
        const newRefreshToken = TokenManager.regenerateRefreshToken(payload)

        //Update the refresh token in the database
        RefreshToken.update({ status: 0 }, { where: { id: token.id } })
        RefreshToken.create({ token: newRefreshToken, status: 1 })

        //Return the new tokens
        const userType = payload.type as UserType
        const tokenCookie = serialize(`tokenFor${upper(userType.actor)}`, newAccessToken, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 24, // 24 days
            path: '/', 
        })
        const refreshTokenCookie = serialize(`refreshTokenFor${upper(userType.actor)}`, newRefreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 24, // 24 days
            path: '/'
        })
        res.setHeader('Set-Cookie', [tokenCookie, refreshTokenCookie])
        res.status(200).json({
            token: newAccessToken,
            refreshToken: newRefreshToken,
        })
    } catch (error: JsonWebTokenError | any) {
        if (error instanceof JsonWebTokenError) {
            return res.status(401).json({ message: 'Invalid  refresh token' })
        }
        res.status(500).json({ message: error.message })
    }
}
