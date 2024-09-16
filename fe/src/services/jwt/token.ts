import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from '@/settings/be_config'
import jwt, { JwtPayload } from 'jsonwebtoken'

export default class TokenManager {
    private static accessSecret: string = JWT_ACCESS_SECRET
    private static refreshSecret: string = JWT_REFRESH_SECRET

    // Generate tokens
    static generateAccessToken(userId: string, type: UserType) {
        return jwt.sign(
            { sub: userId, iat: Math.floor(Date.now() / 1000), type },
            TokenManager.accessSecret,
            {
                expiresIn: '12h',
            }
        )
    }
    static generateRefreshToken(userId: string, type: UserType) {
        return jwt.sign(
            { sub: userId, iat: Math.floor(Date.now() / 1000), type },
            TokenManager.refreshSecret,
            {
                expiresIn: '24 days',
            }
        )
    }
    // Regenerate tokens with new iat
    static regenerateAccessToken(payload: TokenPayload | string) {
        if (isTokenPayload(payload)) {
            payload.iat = Math.floor(Date.now() / 1000)
        }
        return jwt.sign(payload, TokenManager.accessSecret)
    }
    static regenerateRefreshToken(payload: TokenPayload | string) {
        if (isTokenPayload(payload)) {
            payload.iat = Math.floor(Date.now() / 1000)
        }
        return jwt.sign(payload, TokenManager.refreshSecret)
    }
    // Verify tokens
    static verifyAccessToken(token: string): TokenPayload | string {
        return jwt.verify(token, TokenManager.accessSecret)
    }
    static verifyRefreshToken(token: string): TokenPayload | string {
        return jwt.verify(token, TokenManager.refreshSecret)
    }
}

export function isTokenPayload(payload: any): payload is TokenPayload {
    return payload && typeof payload.sub === 'string'
}

export function isUserType(type: any): type is UserType {
    return (
        type &&
        (type.actor === 'guest' ||
            type.actor === 'owner' ||
            type.actor === 'admin')
    )
}

export type TokenPayload = JwtPayload & {
    sub?: string
    type?: UserType
}

export type UserType = {
    actor: 'guest' | 'owner' | 'admin'
    role?: string
}
