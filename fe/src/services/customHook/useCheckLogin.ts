import { useEffect, useState } from 'react'
import { isTokenPayload } from '../jwt/token'
import jwt from 'jsonwebtoken'
import { upper } from '../react_query/functions/mutations'

// Use to check if the user is logged in
const useCheckLogin = (actor: 'guest' | 'owner' | 'admin') : boolean => {
    const [state, setState] = useState(false)

    const handleStorageChange = (e: StorageEvent) => {
        if (e.key === `tokenFor${upper(actor)}`) {
            if (e.newValue === null) {
                setState(false)
            } else {
                setState(true)
            }
        }
    }

    useEffect(() => {
        // Check if both token and refreshToken are spoiled
        const token = localStorage.getItem(`tokenFor${upper(actor)}`)
        const refreshToken = localStorage.getItem(
            `refreshTokenFor${upper(actor)}`
        )
        if (isSpoiled(token) && isSpoiled(refreshToken)) {
            // Remove the tokens and set the login state to 'loggedOut'
            localStorage.removeItem(`tokenFor${upper(actor)}`)
            localStorage.removeItem(`refreshTokenFor${upper(actor)}`)
        } else {
            // Set the login state to 'loggedIn'
            setState(true)
        }
        // Add event listener to listen for changes in localStorage
        addEventListener('storage', handleStorageChange)
        return () => {
            removeEventListener('storage', handleStorageChange)
        }
    }, [])
    return state
}

const isExpired = (token: string): boolean => {
    const payload = jwt.decode(token)
    if (!payload) return true
    if (isTokenPayload(payload) && payload.exp) {
        return new Date() > new Date(payload.exp * 1000)
    }
    return true
}

const isSpoiled = (token: string | null): boolean => {
    return !token || isExpired(token)
}


export default useCheckLogin
