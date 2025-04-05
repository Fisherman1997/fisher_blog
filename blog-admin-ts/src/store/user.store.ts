import { defineStore } from 'pinia'
import { getStorageItem } from '@/utils/storage'
import { ElMessage } from 'element-plus'
import { checkToken } from '@/api/login'

export interface IUserInfo {
    id: number | null
    code: string | null
    name: string | null
    eMail: string | null
    status: number | null
    portrait: string | null
    token?: string
}

export const useUserStore = defineStore('userInfo', {
    state: () => {
        // await this.initState()
        return <IUserInfo>{
            id: null,
            code: null,
            name: null,
            eMail: null,
            status: null,
            portrait: null,
        }
    },
    getters: {
        info(): IUserInfo {
            const { id, code, name, eMail, status, portrait } = this
            return { id, code, name, eMail, status, portrait }
        },
    },
    actions: {
        setUserState(data: IUserInfo) {
            const { id, code, name, eMail, status, portrait } = data
            this.$patch({ id, code, name, eMail, status, portrait })
        },
        async initState() {
            return new Promise((resolve) => {
                if (!getStorageItem('token')) return
                checkToken()
                    .then((data) => {
                        if (!data || data.statusCode !== 200) return
                        this.setUserState(data.result)
                        resolve(true)
                    })
                    .catch(() => {
                        ElMessage.warning('登录失效')
                    })
            })
        },
    },
})
