import axios from 'axios'
import { getStorageItme } from './storage'

// const router  = useRouter()

const instance = axios.create({
    timeout: 6000 * 10,
});

// request拦截器
instance.interceptors.request.use(
  config => {
    if (localStorage.getItem('token')) {
      config.headers['token'] = localStorage.getItem('token')
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
    if (response.status === 200 || response.status === 201 || response.status === 203) {
      return Promise.resolve(response.data)
    } else if (response.code === 401 || response.code === 403) {
      console.error(`${response.code} - ${response.message}`)
    } else {
      console.error(`${response.data.statusCode || response.code} - ${response.data.remarks || response.message}`)
    }
  },
  error => {
    console.log('err' + error) // for debug
    console.error(error.message)
    return error
  }
)

export default instance