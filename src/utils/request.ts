import axios, {type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse} from 'axios'

export interface ApiResponse<T = any> {
    code: number
    msg: string
    data: T
}

const request: AxiosInstance = axios.create({
    baseURL: '/api',
    timeout: 5000,
})

request.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

request.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
        if (response.data.code !== 200) {
            return Promise.reject(new Error(response.data.msg))
        }
        return response
    },
    (error) => {
        // TODO: 连接真实后端后，添加 401 重定向到登录页和错误消息提示
        return Promise.reject(error)
    }
)

export default request