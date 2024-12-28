import { defineStore } from 'pinia'
import { getStorageItme } from '@/utils/storage'
import { ElMessage } from 'element-plus'
import { checkToken } from '@/api/login'

export const useUserStore = defineStore('userInfo',{
    state: () => {
        var user = {
            id: null,
            code: null,
            name: null,
            eMail: null,
            status: null,
            portrait: null
        }
        // await this.initState()
        return user
    },
    getters: {
        info(){
            const { id, code, name, eMail, status, portrait } = this
            return { id, code, name, eMail, status, portrait }
        }
    },
    actions: {
        setUserState(data) {
            const { id, code, name, eMail, status, portrait } = data
            this.$patch({ id, code, name, eMail, status, portrait })
        },
        async initState () {
            return new Promise((resolve, reject) => {
                if (!getStorageItme('token')) return
                checkToken()
                .then(data => {
                    if (!data || data.statusCode !== 200) return
                    this.setUserState(data.result)
                    resolve(true)
                })
                .catch(() => {
                    ElMessage.warning("登录失效")
                })
            })
        }
    }
})