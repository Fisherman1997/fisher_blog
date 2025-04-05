<template>
    <div class="change-password">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="80px">
            <el-form-item label="旧密码：" prop="before_password">
                <el-input v-model="formData.before_password" />
            </el-form-item>
            <el-form-item label="新密码：" prop="password">
                <el-input v-model="formData.password" />
            </el-form-item>
            <el-form-item label="新密码：" prop="password_two">
                <el-input v-model="formData.password_two" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(formRef, elementFun, resultFun)"
                    >修改密码</el-button
                >
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { useForm, type RequestParams } from '@/hooks/useForm.js'

export interface IChangePasswordProps {
    userId: number | null
}

const { userId = null } = defineProps<IChangePasswordProps>()
const emit = defineEmits<{
    (e: 'close', payload: boolean): void
}>()

interface FromProps {
    id?: number
    before_password: string
    password: string
    password_two?: string
}

const { formData, rules, formRef, submitForm } = useForm<FromProps>(
    {
        before_password: '',
        password: '',
        password_two: '',
    },
    {
        before_password: [{ required: true, message: '该项未填写', trigger: 'blur' }],
        password: [{ required: true, message: '该项未填写', trigger: 'blur' }],
        password_two: [{ required: true, message: '该项未填写', trigger: 'blur' }],
    },
)

const elementFun = async (): Promise<RequestParams<FromProps> | void> => {
    if (!userId) {
        ElMessage.warning('没有用户ID ，无法发起请求')
        return
    }
    if (formData.password !== formData.password_two) {
        ElMessage.warning('密码不一致')
        return
    }
    const element = {
        id: userId,
        before_password: formData.before_password,
        password: formData.password,
    }
    return {
        url: 'user/updatePassword',
        element,
    }
}

const resultFun = (param: boolean) => {
    if (param) {
        ElMessage.success(`修改成功`)
        emit('close', true)
    } else {
        ElMessage.warning(`修改失败`)
    }
}
</script>

<style scoped></style>
