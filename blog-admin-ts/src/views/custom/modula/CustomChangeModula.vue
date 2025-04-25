<template>
    <div class="user-change">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="80px" @submit.prevent>
            <el-form-item label="标题：" prop="name">
                <el-input v-model="formData.name" />
            </el-form-item>
            <el-form-item label="内容：" prop="content">
                <MarkdownEditor v-model="formData.content" width="100%" height="400px" />
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
import { reactive, onBeforeMount, defineProps, defineEmits } from 'vue'
import { ElMessage } from 'element-plus'
import { useForm } from '@/hooks/useForm.js'
import { useAxios } from '@/hooks/useAxios'
import MarkdownEditor from '@/components/markdownEditor/index.'
import type { ICustomDialogProps } from '@/components/customDialog/CustomDialog'
import type { ICustom } from '../index.vue'

const { post } = useAxios()
const url = reactive({
    insert: {
        path: 'custom/insert',
        name: '新增',
    },
    update: {
        path: 'custom/update',
        name: '修改',
    },
})
const { type, row } = defineProps<ICustomDialogProps<ICustom>>()
const emit = defineEmits(['close'])

const { formData, formRef, rules, submitForm, formDataSet } = useForm<ICustom>(
    {
        name: '',
        content: '',
    },
    {
        name: [{ required: true, message: '该项未填写', trigger: 'blur' }],
        content: [{ required: true, message: '该项未填写', trigger: 'blur' }],
    },
)

const elementFun = async () => {
    const element = { ...formData }
    if (type === 'update') element.id = row?.id
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

const getCustom = async (id: number) => {
    const data = await post<ICustom, { id: number }>('custom/findOne', { id })
    if (data && data.statusCode === 200) {
        // url.updateItem = data.result
        formDataSet('name', data.result.name)
        formDataSet('content', data.result.content)
    }
}

onBeforeMount(async () => {
    if (type === 'update') await getCustom(row?.id as number)
})
</script>

<style scoped></style>
