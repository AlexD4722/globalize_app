import RefreshToken from '@/models/RefreshToken'
import { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from 'cookie'
import TokenManager, { TokenPayload, UserType } from '@/services/jwt/token'
import { upper } from '@/services/react_query/functions/mutations'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }
    try {
        //Get the refresh token from the request body
        const refreshToken = req.body.refreshToken
        if (!refreshToken)
            return res.status(400).json({ message: 'Invalid request' })

        //Revoke the refresh token
        const payload = TokenManager.verifyRefreshToken(refreshToken) as TokenPayload
        RefreshToken.update({ status: 0 }, { where: { token: refreshToken } })

        //Return a success message
        const userType = payload.type as UserType
        const tokenCookie = serialize(`tokenFor${upper(userType.actor)}`, 'deleted', {
            path: '/',
            expires: new Date('Thu, 01 Jan 1970 00:00:00')
        })
        const refreshTokenCookie = serialize(`refreshTokenFor${upper(userType.actor)}`, 'deleted', {
            path: '/',
            expires: new Date('Thu, 01 Jan 1970 00:00:00')
        })
        res.setHeader('Set-Cookie', [tokenCookie, refreshTokenCookie])
        res.status(200).json({ message: 'Logout' })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}
