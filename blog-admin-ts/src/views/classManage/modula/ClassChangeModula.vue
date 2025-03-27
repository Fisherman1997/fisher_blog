<template>
    <div class="user-change">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="80px">
            <el-form-item label="名称：" prop="name">
                <el-input v-model="formData.name" />
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
import type { IClassData } from '../index.vue'
const url = reactive({
    insert: {
        path: 'class/insert',
        name: '新增',
    },
    update: {
        path: 'class/update',
        name: '修改',
    },
})

export interface IClassChangeModulaProps {
    type: 'insert' | 'update'
    row?: IClassData
}

interface FromParam {
    id?: number
    name: string
}

const { type, row } = withDefaults(defineProps<IClassChangeModulaProps>(), {
    type: 'insert',
})

const emit = defineEmits(['close'])

const { formData, formRef, rules, submitForm } = useForm<FromParam>(
    {
        name: '',
    },
    {
        name: [{ required: true, message: '该项未填写', trigger: 'blur' }],
    },
)

const elementFun = async () => {
    const element = { ...formData }
    if (type === 'update') element.id = row.id
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

onBeforeMount(() => {
    if (type === 'update') {
        formData.id = row.id
        formData.name = row.name
    }
})
</script>

<style scoped></style>
