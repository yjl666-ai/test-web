import axios, { type AxiosRequestConfig } from 'axios'
import { showToast } from 'vant'
import { mockRequest } from '../mock'

type ApiResponse<T> = {
  code: number
  message: string
  data: T
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  timeout: 10000,
})

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('beauty-token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('beauty-token')
      showToast('登录已过期')
      location.href = `/login?redirect=${encodeURIComponent(location.pathname)}`
    } else if (error.code === 'ECONNABORTED') {
      showToast('网络超时，请重试')
    } else {
      showToast('服务异常，请稍后再试')
    }
    return Promise.reject(error)
  },
)

export async function request<T>(config: AxiosRequestConfig): Promise<T> {
  const method = (config.method || 'get').toLowerCase()
  const url = `${config.baseURL || import.meta.env.VITE_API_BASE_URL || '/api/v1'}${config.url}`
  if (import.meta.env.VITE_USE_MOCK !== 'false') {
    const body = await mockRequest(method, url, config.data || config.params)
    if (body.code === 200) return body.data as T
    showToast(body.message)
    return Promise.reject(body)
  }
  const response = await instance.request<ApiResponse<T>>(config)
  const body = response.data
  if (body.code === 200) return body.data
  showToast(body.message || '操作失败')
  return Promise.reject(body)
}
