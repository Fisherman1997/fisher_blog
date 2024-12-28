<template>
    <div class="login">
        <div class="form-css">
            <div class="right-title title">
                <span>welcome</span>
            </div>
            <el-form
                ref="loginRef"
                class="form-content"
                label-position="top"
                :rules="rules"
                :model="model">
                <el-form-item label="账号名称" prop="code">
                    <span class="form-item">
                        <input
                            @focus="changeFormItemClass($event,'add','itemWh')"
                            @blur="changeFormItemClass($event,'remove','itemWh')"
                            type="text" v-model="model.code" />
                    </span>
                </el-form-item>
                <el-form-item label="登录密码" prop="password">
                    <span class="form-item">
                        <input
                            @focus="changeFormItemClass($event,'add','itemWh')"
                            @blur="changeFormItemClass($event,'remove','itemWh')"
                            type="password"
                            v-model="model.password" />
                    </span>
                </el-form-item>
                <el-form-item label="验证码" prop="captcha">
                    <span class="form-item flex">
                        <input
                            @focus="changeFormItemClass($event,'add','itemWh')"
                            @blur="changeFormItemClass($event,'remove','itemWh')"
                            type="password"
                            v-model="model.captcha" />
                        <img :src="captchaUrl" @click="getCaptcha">
                    </span>
                </el-form-item>
                <el-button @click="submitForm(loginRef)" type="primary" size="large">登录</el-button>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useLoading } from '@/hooks/useLoading'
import { setStorageItme } from '@/utils/storage'
import { signIn } from '@/api/login.js'
import { useUserStore } from '@/store/user.store'  


const router = useRouter()
const userinfo  = useUserStore()
const [ startLoading, stopLoading ]  = useLoading()
const loginRef = ref()
const captchaUrl = ref(`${process.env.VUE_APP_CAPTCHA}?t=${new Date().getTime()}`)
const model = reactive({
    code: '',
    password: '',
    captcha: ''
})
const rules = {
    code: [{ required: true, message: '请输入账号！！！', trigger: 'blur' } ],
    password: [{ required: true, message: '请输入密码！！！', trigger: 'change', }],
    captcha: [{ required: true, message: '请输入验证码！！！', trigger: 'change', }],
}

const getCaptcha = () => {
    captchaUrl.value = `${process.env.VUE_APP_CAPTCHA}?t=${new Date().getTime()}`
}


const submitForm = (formModul) => {
    if (!formModul) return
    formModul.validate(async (valid) => {
        if (valid) {
            const param = { ...model }
            startLoading()
            signIn(param)
            .then(data => {
                if (!data || data.statusCode !== 200) return
                ElMessage.success(data.remarks)
                setStorageItme('token', data.result.token)
                userinfo.setUserState(data.result.userInfo)
                router.push('/')
            })
            .finally(() => {
                stopLoading()
            }) 
        } else {
            return valid
        }
    })
}

/*
新增/删除元素类目  
@params： type: add | remove , key: 自定义的css类目
*/
const changeFormItemClass = (ev,type,key) => {
    const el = ev.target.parentNode
    el.classList[type](key)
}

</script>

<style scoped>
.flex{
    display: flex;
    align-content: center;
    justify-content: center;

}
</style>
