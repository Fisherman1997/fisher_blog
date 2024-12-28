import axios from 'axios'
import { ElMessage, ElNotification } from 'element-plus'
import { getStorageItme, delStorageItme } from './storage'


const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 6000 * 10,
});

// request拦截器
instance.interceptors.request.use(
  config => {
    config.headers['Access-Control-Allow-Origin'] = '*'
    if (getStorageItme('token')) {
      config.headers['token'] = getStorageItme('token')
      config.headers['Authorization'] = `Bearer ${getStorageItme('token')}`
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return error
  }
)

// response 拦截器
instance.interceptors.response.use(
  response => {
    if (response.data.statusCode === 200) {
      return Promise.resolve(response.data)
    } else if (response.code === 401 || response.code === 403) {
      console.error(`${response.code} - ${response.message}`)
    } else {
      ElMessage.warning(`${response.data.statusCode || response.code} - ${response.data.remarks || response.message}`)
    }
  },
  error => {
    if (error.request.status === 401) {
			ElNotification.warning({
				title: '错误',
				message: '登录已过期，请重新登录'
			})
			delStorageItme("token")
      setTimeout(() => {
        location.replace("/admin/login")
      }, 500);
    }
    else console.error(error.message)
    return error
  }
)

export default instance