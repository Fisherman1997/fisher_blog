<template>
	<div class="user-change">
        <el-form
            ref="formRef"
            :model="formData"
            :rules="rules"
            label-width="80px">
            <el-form-item label="名称：" prop="name">
                <el-input v-model="formData.name" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(formRef, elementFun, resultFun)">{{ url[type].name }}</el-button>
            </el-form-item>
        </el-form>
	</div>
</template>

<script setup>
import { reactive, onBeforeMount, } from 'vue'
import { ElMessage } from 'element-plus'
import { useForm } from '@/hooks/useForm'
const url = reactive({
    insert: {
        path: 'class/insert',
        name: '新增'
    },
    update: {
        path: 'class/update',
        name: '修改'
    }
})
const { type, row } = defineProps({
    type: { type: String, default: 'insert' },
    row: Object
})
const emit = defineEmits(['close'])

const { formData, formRef, rules, submitForm, formDataSet } = useForm(
         {
            name: '',
        },
        {
            name: [{ required: true, message: '该项未填写', trigger: 'blur' } ]
        })


const elementFun = async () => {
    const element = { ...formData }
	if (type === 'update') element.id = row.id
    return {
        url: url[type].path,
        element
    }
}
const resultFun = (param) => {
    if (param) {
        ElMessage.success(`${ url[type].name }成功`)
        emit('close', true)
    } else {
        ElMessage.warning(`${ url[type].name }失败`)
    }
}


onBeforeMount(() => {
    if (type === 'update') {
        formData.name = row.name
        formData.portrait = row.portrait
        formData.code = row.code
        formData.eMail = row.eMail
        formData.status = row.status ? true : false
    }
})

</script>

<style scoped>
</style>
