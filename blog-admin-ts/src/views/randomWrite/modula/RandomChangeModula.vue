<template>
    <div class="user-change">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="80px">
            <el-form-item label="内容：" prop="content">
                <el-input v-model="formData.content" :rows="8" type="textarea" />
            </el-form-item>
            <el-form-item label="图片：" prop="cover_list">
                <UploadImg
                    :key="formData.cover_list + 'UploadImg'"
                    :urlList="formData.cover_list || []"
                    :amount="5"
                    @changeFile="changeFile"
                    @delete="deleteFile"
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
import { reactive, onBeforeMount, defineProps, defineEmits } from 'vue'
import UploadImg from '@/components/uploadImg'
import { ElMessage } from 'element-plus'
import { useForm } from '@/hooks/useForm.js'
import { useUploadimg } from '@/hooks/useUploadimg.js'
import { useUserStore } from '@/store/user.store.js'
import type { ICustomDialogProps } from '@/components/customDialog/CustomDialog'
import type { IRandomWrite } from '../index.vue'
import type { ImgDeleteParam } from '@/components/uploadImg/UploadImg.vue'

const userInfo = useUserStore()
const { uploadImg, setDeleteListImg, daleteImg } = useUploadimg()
const url = reactive({
    insert: {
        path: 'randomWrite/insert',
        name: '新增',
    },
    update: {
        path: 'randomWrite/update',
        name: '修改',
    },
})
const { type = 'insert', row } = defineProps<ICustomDialogProps<IRandomWrite>>()
const emit = defineEmits(['close'])

const { formData, formRef, rules, submitForm, formDataSet } = useForm<IRandomWrite>(
    {
        cover_list: [],
        content: '',
    },
    {
        content: [{ required: true, message: '该项未填写', trigger: 'blur' }],
    },
)

const elementFun = async () => {
    const element = { ...formData }

    console.log(type)
    if (type === 'update') element.id = row!.id
    if (type === 'insert') element.createUserId = userInfo.info.id as number
    console.log(element)

    // console.log(element)
    // return
    // 处理图片上传和删除
    await daleteImg()
    const uplaodlist =
        element.cover_list && element.cover_list.filter((item) => typeof item !== 'string')
    const imgList =
        element.cover_list && element.cover_list.filter((item) => typeof item === 'string')
    if (uplaodlist && uplaodlist.length) {
        const result = (await uploadImg(uplaodlist)) as string[]
        element.cover_list = [...(imgList as string[]), ...result]
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

const changeFile = (value: (typeof formData)['cover_list']) => {
    formDataSet('cover_list', value)
}

const deleteFile = (value: ImgDeleteParam) => {
    if (!value.type) setDeleteListImg(value.delImg as string)
    formDataSet('cover_list', value.result as string[])
}

onBeforeMount(() => {
    if (type === 'insert') return
    formDataSet('cover_list', row!.cover_list)
    formDataSet('content', row!.content)
})
</script>

<style scoped></style>
