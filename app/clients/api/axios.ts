import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/stores/auth.client';

const apiBaseURL = import.meta.env.API_BASE_URL || 'https://api.example.com'
const apiKey = import.meta.env.API_KEY;
const apiTimeout = import.meta.env.API_TIMEOUT ? parseInt(import.meta.env.API_TIMEOUT) : 10000;

// Cấu hình mặc định cho Axios, lấy từ biến môi trường
const httpConfig = {
    baseURL: apiBaseURL,
    timeout: apiTimeout,
    headers: {
        'Content-Type': 'application/json',
    },
}
// Tạo một instance của Axios với cấu hình trên
const axiosInstance: AxiosInstance = axios.create(httpConfig)

// Optional: Add request interceptor
/**
 * Interceptor cho request:
 * - Nếu có accessToken trong auth, tự động gắn vào header Authorization.
 * - Nếu có apiKey, tự động gắn vào header 'X-Api-Key'.
 */
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const auth = useAuthStore()
        if (auth.accessToken) {
            config.headers.Authorization = `Bearer ${auth.accessToken}`
        }
        if (apiKey) {
            config.headers['X-Api-Key'] = apiKey;
        }
        return config
    },
    (error) => Promise.reject(error)
)

// Optional: Add response interceptor
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
        // Xử lý lỗi chung ở đây
        return Promise.reject(error)
    }
)

// Hàm gọi GET
export const apiGet = <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.get<T>(url, config).then(res => res.data)

// Hàm gọi POST
export const apiPost = <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.post<T>(url, data, config).then(res => res.data)

// Hàm gọi PUT
export const apiPut = <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.put<T>(url, data, config).then(res => res.data)

// Hàm gọi PATCH
export const apiPatch = <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.patch<T>(url, data, config).then(res => res.data)

// Hàm gọi DELETE
export const apiDelete = <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.delete<T>(url, config).then(res => res.data)

export default axiosInstance