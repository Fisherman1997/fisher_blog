import { useAxios } from '@/hooks/useAxios'
import type { IServiceRouter } from '@/routers/router.store'
import type { IUserInfo } from '@/store/user.store'
import { getStorageItem } from '@/utils/storage'
// import { asyncRouter } from '@/routers'

const { post } = useAxios()

interface ISignInParam {
    code: string
    password: string
    captcha: string
}

interface SignInR {
    token: string
    userInfo: IUserInfo
}
// 登录
export const signIn = async (data: ISignInParam) => {
    return post<SignInR, ISignInParam>('login/signIn', data)
}

// 注册
export const register = async () => {
    return post<IUserInfo>('login/register')
}

// 发送验证码
export const changeVerify = async () => {
    return post('login/verify')
}

// 校验是否登录是否正常
export const checkToken = async () => {
    return post<IUserInfo, { token: string }>('login/checkToken', {
        token: <string>getStorageItem('token'),
    })
}

// 获取用户路由权限
export const getRouterList = async (id: number) => {
    return post<IServiceRouter[], { id: number }>('/routingConfigure/getPowerRuoter', { id })
}

// export const getRouterList = async (id) => {
//     return Promise.resolve({
//         statusCode: 200,
//         remarks: '成功',
//         result: [ ...asyncRouter ]
//     })
// }
