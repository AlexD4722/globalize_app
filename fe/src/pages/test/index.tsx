import { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'
import { JavaClient } from '@/services/HttpRequest'
import {
    login,
    logout,
    refreshToken,
    TokenResponse,
} from '@/services/react_query/functions/mutations'
import { useMutation, useQuery } from '@tanstack/react-query'
import useCheckLogin from '@/services/customHook/useCheckLogin'

const Test = (): ReactNode => {
    const loginMutation = useMutation<TokenResponse, Error, any, unknown>({
        mutationKey: ['login'],
    })
    const logoutMutation = useMutation({ mutationKey: ['logout'] })
    const refreshTokenMutation = useMutation<
        TokenResponse,
        Error,
        any,
        unknown
    >({ mutationKey: ['refresh'] })

    const handleLogin = async () => {
        loginMutation.mutate({ username: 'julia_roberts', password: 'pass123' })
    }
    const handleLogout = async () => {
        logoutMutation.mutate()
    }
    const handleRefresh = async () => {
        refreshTokenMutation.mutate({
            refreshToken: localStorage.getItem('refreshTokenForGuest'),
        })
    }
    const check = useCheckLogin('guest')

    return (
        <div>
            <h1>Test</h1>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleRefresh}>Refresh</button>
            <h1>Check {check?'true':'false'}</h1>
            <Link href="/">Home</Link>
        </div>
    )
}

export default Test
