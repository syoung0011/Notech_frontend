import request, { type ApiResponse } from '@/utils/request'

export interface LoginRequest {
    username: string
    password: string
}

export interface RegisterRequest {
    username: string
    password: string
}

export interface ProfileResponse {
    id: number
    username: string
}
export const apiLogin = (params: LoginRequest) => {
    return request.post<{token: string}>('/users/login', params)
}

export const apiRegister = (params: RegisterRequest) => {
    return request.post<void>('/users/register', params)
}

export const apiGetProfile = () => {
    return request.get<ProfileResponse>('/users/profile')
}
