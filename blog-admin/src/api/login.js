import { useAxios } from '@/hooks/useAxios'
import { getStorageItme } from '@/utils/storage'
import { asyncRouter } from '@/routers'


const { post } = useAxios()

// 登录 
export const signIn = async (data) => {
    return post('login/signIn', { ...data })
}

// 注册
export const register = async () => {
    return post('login/register', { ...data })
}

// 发送验证码
export const changeVerify = async () => {
    return post('login/verify', { ...data })
}

// 校验是否登录是否正常
export const checkToken = async () => {
    return post('login/checkToken', { token: getStorageItme('token')})
}

// 获取用户路由权限
export const getRouterList = async (id) => {
    return post('/routingConfigure/getPowerRuoter', { id })
}

// export const getRouterList = async (id) => {
//     return Promise.resolve({
//         statusCode: 200,
//         remarks: '成功',
//         result: [ ...asyncRouter ]
//     })
// }