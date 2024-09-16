import { NodeClient, JavaClient } from '@/services/HttpRequest'
import { TokenPayload } from '@/services/jwt/token'
import jwt from 'jsonwebtoken'

// Login logic
export const login = async (userToken: UserToken) => {
    // Call the login API
    const response = await NodeClient.post('api/auth/login', userToken)
    // Save the token and refreshToken in the local storage, set isLogin to true
    saveToken(response.data, userToken.type.actor)

    // Return the token response
    return response.data
}

// Logout function
export const logout = async (actor: 'admin' | 'owner' | 'guest') => {
    // Get the refreshToken from the local storage
    const refreshToken = localStorage.getItem(`refreshTokenFor${upper(actor)}`)
    // Call the logout API and remove the token, refreshToken, and isLogin from the local storage
    NodeClient.post('api/auth/logout', { refreshToken })
    removeToken(actor)
}

// Refresh token function
export const refreshToken = async (actor: 'admin' | 'owner' | 'guest') => {
    // Get the refreshToken from the local storage
    const refreshToken = localStorage.getItem(`refreshTokenFor${upper(actor)}`)
    // Call the refresh token API and save the new token and refreshToken in the local storage
    const response = await NodeClient.post('api/auth/refresh', {
        refreshToken,
    })
    saveToken(response.data, actor)
    return response.data
}

// Search properties function
export const search = async (queryString: string) => {
    const response = await JavaClient.get(
        `api/property/search?${queryString}`,
        { actor: 'guest' }
    )
    return response.data
}

// Reserve a room as a guest
export const reserveRoom = async (options: ReserveRoomOptions) => {
    const response = await JavaClient.post('api/reservation', options, {
        actor: 'guest',
    })
    return response.data
}

// Remove a property as an owner
export const deleteProperty = async (id: string) => {
    const response = await JavaClient.delete(`api/owner/properties/${id}`, {
        actor: 'owner'
    })
    return response.data
}

// Save token
const saveToken = (
    payload: TokenResponse,
    actor: 'guest' | 'owner' | 'admin'
) => {
    const decodedPayload = jwt.decode(payload.token) as TokenPayload
    localStorage.setItem(`tokenFor${upper(actor)}`, payload.token)
    localStorage.setItem(`refreshTokenFor${upper(actor)}`, payload.refreshToken)
    dispatchEvent(
        new StorageEvent('storage', {
            key: `tokenFor${upper(actor)}`,
            newValue: payload.token,
        })
    )
}

// Remove token
const removeToken = (actor: 'guest' | 'owner' | 'admin') => {
    localStorage.removeItem(`${actor}Id`)
    localStorage.removeItem('tokenForGuest')
    localStorage.removeItem('refreshTokenForGuest')
    dispatchEvent(
        new StorageEvent('storage', {
            key: `tokenFor${upper(actor)}`,
            newValue: null,
        })
    )
}

export type ReserveRoomOptions = {
    roomId: string
    checkInDate: string
    checkOutDate: string
}

export type TokenResponse = {
    token: string
    refreshToken: string
}

export type UserToken = {
    username: string
    password: string
    type: {
        actor: 'guest' | 'owner' | 'admin'
    }
}

export const upper = (actor: 'guest' | 'owner' | 'admin'): string => {
    if (!actor) {
        actor = 'guest'
    }
    return actor.charAt(0).toUpperCase() + actor.slice(1)
}
