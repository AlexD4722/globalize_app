
import { NodeClient, JavaClient } from '@/services/httpRequest'
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

// Create a property as an owner
export const createProperty = async (propertyData: FormData) => {
    const response = await JavaClient.postMultipart(
        `api/owners/properties`,
        propertyData,
        { actor: 'owner' }
    )
    return response.data
}

// Disable a property as an owner
export const disableProperty = async (id: string) => {
    const response = await JavaClient.put(
        `api/owners/properties/${id}/disable`,
        {
            actor: 'owner',
        }
    )
    return response.data
}

// Enable a property as an owner
export const enableProperty = async (id: string) => {
    const response = await JavaClient.put(
        `api/owners/properties/${id}/enable`,
        {
            actor: 'owner',
        }
    )
    return response.data
}

// Request reservation cancel as a guest
export const requestCancelReservation = async (id: string) => {
    const response = await JavaClient.put(
        `api/guests/reservations/${id}/cancel`,
        {},
        { actor: 'guest' }
    )
    return response.data
}

// Accept reservation cancel as an owner
export const acceptCancelRequest = async (id: string) => {
    const response = await JavaClient.put(
        `api/owners/reservations/${id}/responseCancelRequest?response=accept`,
        {},
        { actor: 'owner' }
    )
    return response.data
}

// Reject reservation cancel as an owner
export const rejectCancelRequest = async (id: string) => {
    const response = await JavaClient.put(
        `api/owners/reservations/${id}/responseCancelRequest?response=reject`,
        {},
        { actor: 'owner' }
    )
    return response.data
}

// Remove property created temporarily
export const removeReservation = async (id: string) => {
    const response = await JavaClient.delete(`api/reservation/${id}`, {
        actor: 'guest',
    })
    return response.data
}

// Save token
const saveToken = (
    payload: TokenResponse,
    actor: 'guest' | 'owner' | 'admin'
) => {
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

export type UserRegister = {
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    password: String,
    idNumber: String,
    phoneNumber: String
}
// Register logic    
export const register = async (actor: String, UserRegister: UserRegister) => {
    // Call the login API
    const response = await JavaClient.post(`api/auth/register/${actor}`, UserRegister)
    return response.data
}
// AuthEmail    
export const authEmail = async (actor: String, id: String, code: String) => {
    // Call the login API
    const response = await JavaClient.post(`api/auth/verify/${actor}/${id}/${code}`);
    return response.data
}
