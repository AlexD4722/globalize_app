import Admin from '@/models/Admin'
import Guest from '@/models/Guest'
import Owner from '@/models/Owner'
import RefreshToken from '@/models/RefreshToken'
import Role from '@/models/Role'
import TokenManager, { TokenPayload } from '@/services/jwt/token'
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
        //Get the username and password from the request body
        const { username, password, type } = req.body

        if (!username || !password || !type) {
            return res.status(400).json({ message: 'Invalid request' })
        }

        //Find the user with the given username and password
        let id: string
        switch (type?.actor) {
            case 'guest':
                const guest = await Guest.findOne({
                    where: { user_name: username, password },
                    attributes: ['id'],
                })
                if (!guest)
                    return res.status(404).json({ message: 'User not found' })
                id = guest.id
                break
            case 'owner':
                const owner = await Owner.findOne({
                    where: { user_name: username, password },
                    attributes: ['id'],
                })
                if (!owner)
                    return res.status(404).json({ message: 'User not found' })
                id = owner.id
                break
            case 'admin':
                const admin = await Admin.findOne({
                    where: { user_name: username, password },
                    attributes: ['id'],
                    include: Role,
                })
                if (!admin)
                    return res.status(404).json({ message: 'User not found' })
                id = admin.id
                break
            default:
                return res.status(400).json({ message: 'Invalid user type' })
        }

        //Generate access token and refresh token
        const token = TokenManager.generateAccessToken(id, type)
        const refreshToken = TokenManager.generateRefreshToken(id, type)

        //Save the refresh token in the database
        RefreshToken.create({ token: refreshToken, status: 1 })

        //Return the tokens
        const tokenCookie = serialize(`tokenFor${upper(type.actor)}`, token, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 24, // 24 days
            path: '/', 
        })
        const refreshTokenCookie = serialize(`refreshTokenFor${upper(type.actor)}`, refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 24, // 24 days
            path: '/'
        })
        res.setHeader('Set-Cookie', [tokenCookie, refreshTokenCookie])
        res.status(200).json({ token, refreshToken })
    } catch (error) {
        res.status(500).json(error)
    }
}
