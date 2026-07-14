import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios'
import { getToken } from './storage'
import {ElMessage} from "element-plus";
import {UserStore} from "@/stores/users.ts";

// 1. 定义后端返回的标准数据格式（根据你们后端的实际情况修改）
export interface ApiResponse<T = any> {
    code: number
    msg: string
    data: T
}
// 2. 自定义 RequestInstance 类型，让 TS 知道我们解包了 data，且支持泛型
type RequestInstance = Omit<AxiosInstance, 'get' | 'post' | 'put' | 'delete'> & {
    get<T = any>(url: string, config?: Partial<InternalAxiosRequestConfig>): Promise<ApiResponse<T>>
    post<T = any>(url: string, data?: any, config?: Partial<InternalAxiosRequestConfig>): Promise<ApiResponse<T>>
    put<T = any>(url: string, data?: any, config?: Partial<InternalAxiosRequestConfig>): Promise<ApiResponse<T>>
    delete<T = any>(url: string, config?: Partial<InternalAxiosRequestConfig>): Promise<ApiResponse<T>>
}
// 3. 创建 axios 实例
const request: RequestInstance = axios.create({
    baseURL: '/api/v1', // 提取公共前缀，以后改版本号只改这里
    timeout: 10000,
}) as RequestInstance
// 4. 请求拦截器：统一塞 Token
request.interceptors.request.use(
    (config) => {
        const token = getToken()
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)
// 5. 响应拦截器：统一解包和报错提示，只做数据解包，不弹窗（UI 交给页面层）
request.interceptors.response.use(
    ((response: AxiosResponse<ApiResponse>) => {
        const res = response.data
        if (res.code === 200) {
            return Promise.resolve(res);
        }
        if (res.msg) ElMessage.error(res.msg)
        return Promise.reject(new Error(res.msg))
    }) as any,
    (error) => {
        // 优先判断：请求是否被主动取消
        if (axios.isCancel(error)) {
            console.log('请求已取消:', error.message);
            return Promise.reject(error); // 取消也属于中断，直接抛出
        }
        // 401 未授权处理（统一拦截，跳转登录页）
        if (error.response?.status === 401) {
            const msg = error.response.data?.msg || '请重新登录';
            ElMessage.error(msg);
            const userStore=UserStore()
            userStore.logout()
            return Promise.reject(error);
        }
        // 建议 3：兜底处理 HTTP/网络错误（断网、500等）
        // const msg = error.response?.data?.msg || error.message || '网络异常，请稍后重试';
        const msg = '服务器异常，请稍后重试';
        ElMessage.error(msg);
        return Promise.reject(error);
    }
)

export default request