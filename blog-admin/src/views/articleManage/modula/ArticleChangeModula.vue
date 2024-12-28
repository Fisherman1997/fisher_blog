<template>
	<div class="user-change">
        <el-form
            ref="formRef"
            :model="formData"
            :rules="rules"
            label-width="80px">
            <el-form-item label="封面：" prop="cover">
                <UploadImg 
                    :key="formData.cover + 'UploadImg'"
                    :urlList="formData.cover || []"
                    :amount="1"
                    @changeFile="changeFile"
                    @delete="deleteFile" />
            </el-form-item>
            <el-form-item label="标题：" prop="title">
                <el-input v-model="formData.title" />
            </el-form-item>
            <el-form-item label="分类：" prop="classId">
                <el-select v-model="formData.classId" class="m-2" placeholder="选择分类">
                    <template v-if="url.classlist.length">
                        <el-option
                            v-for="item in url.classlist"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"/>
                    </template>
                </el-select>
            </el-form-item>
            <el-form-item label="内容：" prop="content">
                <MarkdownEditor v-model="formData.content" width="100%" height="400px"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(formRef, elementFun, resultFun)">{{ url[type].name }}</el-button>
            </el-form-item>
        </el-form>
	</div>
</template>

<script setup>
import {  reactive, onBeforeMount, defineProps, defineEmits } from 'vue'
import UploadImg from '@/components/uploadImg'
import MarkdownEditor from '@/components/markdownEditor'
import { ElMessage } from 'element-plus'
import { useForm } from '@/hooks/useForm'
import { useUploadimg } from '@/hooks/useUploadimg'
import { useAxios } from '@/hooks/useAxios'
import { useUserStore } from "@/store/user.store";


const userInfo = useUserStore()
const { post } = useAxios()
const { uploadImg, setDaleteListImg, daleteImg } = useUploadimg()
const url = reactive({
    insert: {
        path: 'article/insert',
        name: '新增'
    },
    update: {
        path: 'article/update',
        name: '修改'
    },
    updateItem: {},
    classlist: []
})
// eslint-disable-next-line vue/no-setup-props-destructure
const { type, row } = defineProps({
    type: { type: String, default: 'insert' },
    row: Object
})
const emit = defineEmits(['close'])

const { formData, formRef, rules, submitForm, formDataSet } = useForm(
         {
            cover: '',
            title: '',
            classId: '',
            content: '',
        },
        {
            cover: [{ required: true, message: '该项未填写', trigger: 'blur' } ],
            title: [{ required: true, message: '该项未填写', trigger: 'blur', }],
            classId: [{ required: true, message: '该项未填写', trigger: 'blur', }],
            content: [{ required: true, message: '该项未填写', trigger: 'blur', }],
        })


const elementFun = async () => {
    const element = { ...formData }

    if (type === 'update') element.id = row.id
    if (type === 'insert') element.CreateUserId = userInfo.info.id;
    // if (!element.cover.length) return

    // console.log(element)
    // return
    // 处理图片上传和删除
    await daleteImg()
    const uploadlist = element.cover && element.cover.filter(item => typeof item !== 'string')
    const imgList = element.cover && element.cover.filter(item => typeof item === 'string')
    if (uploadlist && uploadlist.length) {
        const result = await uploadImg(uploadlist)
        element.cover = [...imgList,...result]
    } 
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

const changeFile = (value) => {
    formDataSet('cover', value)
}

const deleteFile = (value) => {
    if (!value.type) setDaleteListImg(value.delImg)
    formDataSet('cover', value.result)
    // console.log(formData.cover)
}


const getArticle = async id => {
    const data = await post('article/findOne',{id})
    if (data && data.statusCode === 200) {
        url.updateItem = data.result
        formDataSet('cover', data.result.cover)
        formDataSet('title', data.result.title)
        formDataSet('classId', data.result.classId)
        formDataSet('content', data.result.content)
        // console.log(formData)
    }
}

const getClass = async () => {
    const data = await post('class/list',{name: ''})
    if (data && data.statusCode === 200) {
        url.classlist = data.result
    }
}

onBeforeMount(async () => {
    await getClass()
    if (type === 'update') await getArticle(row.id)
})

</script>

<style scoped>
</style>
