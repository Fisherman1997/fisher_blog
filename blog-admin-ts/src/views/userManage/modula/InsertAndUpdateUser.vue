<template>
    <div class="user-change">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="80px">
            <el-form-item label="头像：" prop="portrait">
                <UploadImg
                    :urlList="formData.portrait || []"
                    :amount="1"
                    @changeFile="changeFile"
                    @delete="deleteFile"
                />
            </el-form-item>
            <el-form-item label="名称：" prop="name">
                <el-input v-model="formData.name" />
            </el-form-item>
            <el-form-item label="账号：" prop="code">
                <el-input v-model="formData.code" />
            </el-form-item>
            <el-form-item label="邮箱：" prop="eMail">
                <el-input v-model="formData.eMail" />
            </el-form-item>
            <el-form-item v-if="type === 'insert'" label="密码：" prop="password">
                <el-input type="password" v-model="formData.password" />
            </el-form-item>
            <el-form-item label="状态：" prop="status">
                <el-switch
                    v-model="formData.status"
                    size="large"
                    style="--el-switch-off-color: #13ce66"
                    inline-prompt
                    active-text="启用"
                    inactive-text="禁用"
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
import UploadImg, { type ImgDeleteParam } from '@/components/uploadImg/UploadImg.vue'
import { ElMessage } from 'element-plus'
import { useForm } from '@/hooks/useForm.js'
import { useUploadimg } from '@/hooks/useUploadimg.js'
import type { IUserInfo } from '@/store/user.store'
import { assignProps } from '@/utils/utils'

const { uploadImg, setDeleteListImg, daleteImg } = useUploadimg()
const url = reactive({
    insert: {
        path: 'user/insert',
        name: '新增',
    },
    update: {
        path: 'user/update',
        name: '修改',
    },
})

export interface IInsertAndUpdateUserProps {
    type?: 'insert' | 'update'
    row?: IUserInfo
}

const { type = 'insert', row } = defineProps<IInsertAndUpdateUserProps>()

const emit = defineEmits<{
    (e: 'close', payload: boolean): void
}>()

interface FromParam {
    id?: number | null
    code: string
    name: string
    eMail?: string
    status: boolean | (0 | 1)
    password?: string
    portrait?: (string | File)[] | null
}

const { formData, formRef, rules, submitForm, formDataSet } = useForm<FromParam>(
    {
        name: '',
        code: '',
        portrait: null,
        eMail: '',
        password: '',
        status: true,
    },
    {
        name: [{ required: true, message: '该项未填写', trigger: 'blur' }],
        code: [{ required: true, message: '该项未填写', trigger: 'blur' }],
        eMail: [{ required: true, message: '该项未填写', trigger: 'blur' }],
        password: [{ required: true, message: '该项未填写', trigger: 'blur' }],
        status: [{ required: true, message: '该项未填写', trigger: 'blur' }],
    },
)

const elementFun = async () => {
    const element = { ...formData }
    // console.log(url[type].path)
    // return
    if (type === 'update') {
        element.id = row!.id
        delete element.password
    }
    element.status = element.status ? 1 : 0
    // 处理图片上传和删除
    await daleteImg()
    const uplaodlist =
        element.portrait && element.portrait.filter((item) => typeof item !== 'string')
    const imgList = element.portrait && element.portrait.filter((item) => typeof item === 'string')
    if (uplaodlist && uplaodlist.length) {
        const result = (await uploadImg(uplaodlist)) as string[]
        element.portrait = [...(imgList as string[]), ...result]
        // element.portrait = imgList
    }
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

const changeFile = (value: (File | string)[]) => {
    formDataSet('portrait', value)
}

const deleteFile = (value: ImgDeleteParam) => {
    if (!value.type) setDeleteListImg(value.delImg as string)
    formDataSet('portrait', value.result)
}

onBeforeMount(() => {
    if (type === 'update') {
        assignProps(formData, row as typeof formData)
        formData.status = row!.status ? true : false
    }
})
</script>

<style scoped></style>
