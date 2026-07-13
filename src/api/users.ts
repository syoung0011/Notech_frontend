import request, { type ApiResponse } from '@/utils/request'

interface LoginParams {
    username: string
    password: string
}

interface RegisterParams {
    username: string
    password: string
}

interface LoginResult {
    token: string
}

interface RegisterResult {
    id: number
}

export const login = (params: LoginParams) => {
    return new Promise<ApiResponse<LoginResult>>((resolve) => {
        setTimeout(() => {
            console.log('模拟登录请求:', params)
            resolve({
                code: 200,
                msg: '登录成功',
                data: { token: 'mock_token_123456' },
            })
        }, 500)
    })
    // TODO: 替换为真实接口
    // return request.post<LoginResult>('/v1/login', params)
}

export const register = (params: RegisterParams) => {
    return new Promise<ApiResponse<RegisterResult>>((resolve) => {
        setTimeout(() => {
            console.log('模拟注册请求:', params)
            resolve({
                code: 200,
                msg: '注册成功',
                data: { id: 1 },
            })
        }, 500)
    })
    // TODO: 替换为真实接口
    // return request.post<RegisterResult>('/v1/register', params)
}