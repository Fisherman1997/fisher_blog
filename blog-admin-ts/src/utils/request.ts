import axios, { AxiosError } from 'axios'
import { ElMessage, ElNotification } from 'element-plus'
import { getStorageItem, delStorageItem } from './storage'

// // 定义接口，描述接口返回的数据结构
// interface CustomData {
//   statusCode: number
//   message: string
//   remarks?: string
//   // 如果还有其他字段，可以继续添加
// }

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 6000 * 10,
})

// request拦截器
instance.interceptors.request.use(
    (config) => {
        config.headers['Access-Control-Allow-Origin'] = '*'
        if (getStorageItem('token')) {
            config.headers['token'] = getStorageItem('token')
            config.headers['Authorization'] = `Bearer ${getStorageItem('token')}`
        }
        return config
    },
    (error) => {
        console.log(error) // for debug
        return error
    },
)

instance.interceptors.response.use(
    (response) => {
        const res = response.data
        if (res.statusCode === 200) {
            return Promise.resolve(res)
        } else if (res.statusCode === 401 || res.statusCode === 403) {
            console.error(`${res.statusCode} - ${res.message}`)
        } else {
            ElMessage.warning(`${res.statusCode} - ${res.remarks || res.message}`)
        }
        // 根据需要，可以返回 reject 以便于下游捕获错误
        return Promise.reject(new Error(res.message))
    },
    (error: AxiosError) => {
        // 注意：axios 的错误对象通常在 error.response 中包含状态码
        if (error.response && error.response.status === 401) {
            ElNotification.warning({
                title: '错误',
                message: '登录已过期，请重新登录',
            })
            delStorageItem('token')
            setTimeout(() => {
                location.replace('/admin/login')
            }, 500)
        } else {
            console.error(error.message)
        }
        return Promise.reject(error)
    },
)

export default instance
