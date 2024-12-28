<template>
    <div class="register">
        <div class="form-css">
            <div class="right-title title">
                <span>welcome</span>
            </div>
            <el-form
                ref="registerForm"
                class="form-content"
                label-position="top"
                :rules="rules"
                :model="model">
                <el-form-item label="名称" prop="name">
                    <span class="form-item">
                        <input
                            @focus="changeFormItemClass($event,'add','itemWh')"
                            @blur="changeFormItemClass($event,'remove','itemWh')"
                            type="text" v-model="model.name" />
                    </span>
                </el-form-item>
                <el-form-item label="账号" prop="code">
                    <span class="form-item">
                        <input
                            @focus="changeFormItemClass($event,'add','itemWh')"
                            @blur="changeFormItemClass($event,'remove','itemWh')"
                            type="text"
                            v-model="model.code" />
                    </span>
                </el-form-item>
                <el-form-item label="邮箱" prop="Email">
                    <span class="form-item">
                        <input
                            @focus="changeFormItemClass($event,'add','itemWh')"
                            @blur="changeFormItemClass($event,'remove','itemWh')"
                            type="text"
                            v-model="model.Email" />
                    </span>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <span class="form-item">
                        <input
                            @focus="changeFormItemClass($event,'add','itemWh')"
                            @blur="changeFormItemClass($event,'remove','itemWh')"
                            type="password"
                            v-model="model.password" />
                    </span>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPassword">
                    <span class="form-item">
                        <input
                            @focus="changeFormItemClass($event,'add','itemWh')"
                            @blur="changeFormItemClass($event,'remove','itemWh')"
                            type="password"
                            v-model="model.confirmPassword" />
                    </span>
                </el-form-item>
                <el-row>
                    <el-col :span="16">
                        <el-form-item label="验证码" prop="verify">
                            <span class="form-item">
                                <input
                                    @focus="changeFormItemClass($event,'add','itemWh')"
                                    @blur="changeFormItemClass($event,'remove','itemWh')"
                                    type="text"
                                    v-model="model.verify" />
                            </span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <div class="verify">
                            <el-button size="large">发送验证码</el-button>
                        </div>
                    </el-col>
                </el-row>
                <el-button @click="submitForm(registerForm)" type="primary" size="large">注册</el-button>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const model = reactive({
    name: '',
    code: '',
    Email: '',
    password: '',
    confirmPassword: '',
    verify: ''
})
const rules = {
    name: [{ required: true, message: '请输入名称！！！', trigger: 'blur' } ],
    code: [{ required: true, message: '请输入账号！！！', trigger: 'change', }],
    Email: [{ required: true, message: '请输入密码！！！', trigger: 'change', }],
    password: [{ required: true, message: '请输入密码！！！', trigger: 'change', }],
    confirmPassword: [{ required: true, message: '请确认密码！！！', trigger: 'change', }],
    verify: [{ required: true, message: '请输入验证码！！！', trigger: 'change', }],
}


const registerForm = ref()
const submitForm = (formModul) => {
    // 提交登录表单
    if (!formModul) return
    formModul.validate((valid) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!')
        return false
        }
    })
}
const changeFormItemClass = (ev,type,key) => {
    const el = ev.target.parentNode
    el.classList[type](key)
}

</script>

<style scoped>
.verify{
    padding-top: 20px;
    padding-left: 15px;
}
</style>
