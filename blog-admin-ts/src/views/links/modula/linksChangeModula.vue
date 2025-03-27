<template>
    <div class="user-change">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px">
            <el-form-item label="名称：" prop="name">
                <el-input v-model="formData.name" />
            </el-form-item>
            <el-form-item label="图片链接：" prop="avatar">
                <el-input v-model="formData.avatar" />
            </el-form-item>
            <el-form-item label="网站链接：" prop="http_url">
                <el-input v-model="formData.http_url" />
            </el-form-item>
            <el-form-item label="简介：" prop="description">
                <el-input v-model="formData.description" />
            </el-form-item>
            <el-form-item label="状态：" prop="status">
                <el-switch
                    v-model="formData.status"
                    size="large"
                    style="--el-switch-off-color: #13ce66"
                    inline-prompt
                    active-text="有效"
                    inactive-text="失效"
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(formRef, elementFun, resultFun)">{{
                    url[type].name
                }}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount } from 'vue'
import { ElMessage } from 'element-plus'
import { useForm } from '@/hooks/useForm.js'
import type { ICustomDialogProps } from '@/components/customDialog/CustomDialog'
import type { ILink } from '../index.vue'

const url = reactive({
    insert: {
        path: 'links/insert',
        name: '新增',
    },
    update: {
        path: 'links/update',
        name: '修改',
    },
})

// interface FromParam {
//     status: boolean
// }

const { type, row } = withDefaults(defineProps<ICustomDialogProps<ILink>>(), {})

const emit = defineEmits(['close'])

const { formData, formRef, rules, submitForm, formDataSet } = useForm<ILink>(
    {
        name: '',
        avatar: '',
        http_url: '',
        status: true,
        description: '',
    },
    {
        name: [{ required: true, message: '该项未填写', trigger: 'blur' }],
        avatar: [{ required: true, message: '该项未填写', trigger: 'blur' }],
        http_url: [{ required: true, message: '该项未填写', trigger: 'blur' }],
        status: [{ required: true, message: '该项未填写', trigger: 'blur' }],
    },
)

const elementFun = async () => {
    const element = { ...formData }
    if (type === 'update') element.id = row?.id
    element.status = element.status ? 1 : 2
    return {
        url: url[type].path,
        element,
    }
}
const resultFun = (param: boolean) => {
    if (param) {
        ElMessage.success(`${url[type].name}成功`)
        emit('close', true)
    } else {
        ElMessage.warning(`${url[type].name}失败`)
    }
}

onBeforeMount(async () => {
    if (type === 'update') {
        formDataSet('name', row!.name)
        formDataSet('avatar', row!.avatar)
        formDataSet('http_url', row!.http_url)
        formDataSet('description', row!.description)
        formDataSet('status', row!.status === 1 ? true : false)
    }
})
</script>

<style scoped></style>
