<template>
    <div class="user-change">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="80px">
            <el-form-item label="内容：" prop="content">
                <el-input v-model="formData.content" :rows="8" type="textarea" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(formRef, elementFun, resultFun)"
                    >修改</el-button
                >
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount, defineProps, defineEmits } from 'vue'
import { ElMessage } from 'element-plus'
import { useForm, type RequestParams } from '@/hooks/useForm.js'
import type { IComment } from '../index.vue'

const url = reactive({
    update: {
        path: 'comment/update',
        name: '修改',
    },
})
const { row } = defineProps<{ row: IComment }>()
const emit = defineEmits<{
    (e: 'close', payload: boolean): void
}>()

const { formData, formRef, rules, submitForm, formDataSet } = useForm(
    {
        content: '',
    },
    {
        content: [{ required: true, message: '该项未填写', trigger: 'blur' }],
    },
)

const elementFun = async (): Promise<RequestParams<IComment> | void> => {
    if (formData.content === row.content) {
        ElMessage.warning('内容无变化')
        return
    }
    const element = { ...formData } as IComment
    element.id = row.id
    return {
        url: url.update.path,
        element,
    }
}
const resultFun = (param: boolean) => {
    if (param) {
        ElMessage.success(`${url['update'].name}成功`)
        emit('close', true)
    } else {
        ElMessage.warning(`${url['update'].name}失败`)
    }
}

onBeforeMount(async () => {
    formDataSet('content', row.content)
})
</script>

<style scoped></style>
