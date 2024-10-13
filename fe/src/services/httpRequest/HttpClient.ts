import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    CreateAxiosDefaults,
} from 'axios'
import { JAVA_URL, NODE_URL } from '@/settings/fe_config'
import jwt from 'jsonwebtoken'
import { isTokenPayload, TokenPayload, UserType } from '../jwt/token'
import { refreshToken, TokenResponse } from '../react_query/functions/mutations'

export default class HttpClient {
    private abortController: AbortController
    private config: AxiosRequestConfig
    private axiosInstance: AxiosInstance

    public constructor(mode?: ClientMode) {
        this.abortController = new AbortController()
        this.config = {}
        let createConfig: CreateAxiosDefaults = {
            baseURL: JAVA_URL,
            timeout: 15000,
            signal: this.abortController.signal,
        }
        switch (mode) {
            case ClientMode.Node:
                this.config.baseURL = NODE_URL
                break
            case ClientMode.Java:
                this.config.baseURL = JAVA_URL
                break
            default:
                this.config.baseURL = JAVA_URL
                break
        }
        this.axiosInstance = axios.create(createConfig)
    }

    public async get<T = any>(url: string, userType?: UserType) {
        if (userType) await this.setAuthorization(userType)
        return this.axiosInstance.get<T>(url, this.config)
    }

    public async post<T = any>(url: string, data?: any, userType?: UserType) {
        if (userType) await this.setAuthorization(userType)
        return this.axiosInstance.post<T>(url, data, this.config)
    }

    public async put<T = any>(url: string, data: any, userType?: UserType) {
        if (userType) await this.setAuthorization(userType)
        return this.axiosInstance.put<T>(url, data, this.config)
    }

    public async delete<T = any>(url: string, userType?: UserType) {
        if (userType) await this.setAuthorization(userType)
        return this.axiosInstance.delete<T>(url, this.config)
    }

    private async setAuthorization(userType: UserType) {
        if (this.config.baseURL === NODE_URL) {
            return
        }
        const token = await this.getToken(userType)
        this.config.headers = {
            Authorization: `Bearer ${token}`,
        }
    }

    public async postMultipart<T = any>(
        url: string,
        data: any,
        userType?: UserType
    ) {
        if (userType) await this.setAuthorization(userType)
        this.config.headers = {
            ...this.config.headers,
            'Content-Type': 'multipart/form-data',
        }
        const res = await this.axiosInstance.post<T>(url, data, this.config)
        delete this.config.headers['Content-Type']
        return res
    }

    private async getToken(userType: UserType): Promise<string | null> {
        // Get the token from the local storage
        const actor =
            userType.actor.charAt(0).toUpperCase() + userType.actor.slice(1)
        const token = localStorage.getItem(`tokenFor${actor}`)
        if (!token) return null

        // Check if the token is expired, then refresh the token if it is
        if (this.isExpired(token)) {
            const rToken = localStorage.getItem(`refreshTokenFor${actor}`)
            if (!rToken) return null
            if (this.isExpired(rToken)) return null
            const newToken = (await refreshToken(
                userType.actor
            )) as TokenResponse
            return newToken.token
        }

        // Return the token if it is not expired
        return token
    }

    private isExpired(token: string): boolean {
        const decodedToken = jwt.decode(token) as TokenPayload
        if (!isTokenPayload(decodedToken)) return false
        if (!decodedToken.exp) return false
        return decodedToken.exp < Date.now() / 1000
    }
    public async postMultipartWithoutUserType<T = any>(
        url: string,
        data: any,
    ) {
        this.config.headers = {
            ...this.config.headers,
            'Content-Type': 'multipart/form-data',
        }
        const res = await this.axiosInstance.post<T>(url, data, this.config)
        delete this.config.headers['Content-Type']
        return res
    }
}

export enum ClientMode {
    Node,
    Java,
}
