<template>
    <div id="add-update">
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="180px">
            <el-form-item label="标题：" prop="title">
                <el-input v-model="formData.title" />
            </el-form-item>
            <el-form-item label="路由名称（不要中文）：" prop="name">
                <el-input v-model="formData.name" />
            </el-form-item>
            <el-form-item label="路由路径：" prop="path">
                <span v-if="typeof row?.id === 'number' && formData.primary_id">{{
                    `${row?.path} + ⇩`
                }}</span>
                <el-input v-model="formData.path" />
            </el-form-item>
            <el-form-item label="路由组件：" prop="component">
                <el-input v-model="formData.component" />
            </el-form-item>
            <el-form-item
                v-if="!(typeof formData.primary_id === 'number')"
                label="范围："
                prop="range"
            >
                <el-switch
                    v-model="isRange"
                    size="large"
                    style="--el-switch-off-color: #13ce66"
                    inline-prompt
                    active-text="前台"
                    inactive-text="后台"
                />
            </el-form-item>
            <el-form-item label="是否菜单：" prop="menu">
                <el-switch
                    v-model="isMenu"
                    size="large"
                    inline-prompt
                    style="--el-switch-off-color: #13ce66"
                    active-text="是"
                    inactive-text="否"
                />
            </el-form-item>
            <el-form-item label="图标：" prop="iconType">
                <el-space>
                    <el-icon class="iconType" v-if="formData.iconType.length">
                        <component :is="formData.iconType" />
                    </el-icon>
                    <span v-else>无图标</span>
                    <el-button @click="selectIcon" type="primary" icon="Edit" circle size="small" />
                    <el-button
                        @click="formData.iconType = ''"
                        type="danger"
                        icon="Delete"
                        circle
                        size="small"
                    />
                </el-space>
            </el-form-item>
            <el-form-item label="序号：" prop="serialNumber">
                <el-input-number v-model="formData.serialNumber as number" />
            </el-form-item>
            <el-form-item label="重定向路径：" prop="redirect">
                <el-input v-model="formData.redirect" />
            </el-form-item>
            <el-form-item label="状态：" prop="status">
                <el-switch
                    v-model="status"
                    size="large"
                    style="--el-switch-off-color: #13ce66"
                    inline-prompt
                    active-text="启用"
                    inactive-text="禁用"
                />
            </el-form-item>
            <el-form-item v-if="!formData.primary_id" label="目录：" prop="contents">
                <el-switch
                    v-model="isContents"
                    size="large"
                    style="--el-switch-off-color: #13ce66"
                    inline-prompt
                    active-text="是"
                    inactive-text="否"
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(formRef, params, result)">{{
                    type === 'insert' ? '新增' : '修改'
                }}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, watch } from 'vue'
import { ElMessage } from 'element-plus'
import customDialog, { type ICustomDialogProps } from '@/components/customDialog/CustomDialog'
import IconAll from '@/components/iconAll/index'
import { useForm, type RequestParams } from '@/hooks/useForm.js'
import { assignProps } from '@/utils/utils'
import type { IRoutingModule } from '../index.vue'

interface FromParam {
    id?: number
    primary_id?: number | null
    title: string
    name: string
    path: string
    component: string
    serialNumber: number | null
    range: number
    menu: number
    iconType: string
    redirect: string
    status: number
    contents: number
}

const status = ref(true)
const isMenu = ref(true)
const isRange = ref(true)
const isContents = ref(false)

const { formData, formRef, rules, submitForm, formDataSet } = useForm<FromParam>(
    {
        primary_id: null,
        title: '',
        name: '',
        path: '',
        component: '',
        serialNumber: null,
        range: 1,
        menu: 1,
        iconType: '',
        redirect: '',
        status: 1,
        contents: 0,
    },
    {
        title: [{ required: true, message: '该项未填写', trigger: 'blur' }],
        name: [{ required: true, message: '该项未填写', trigger: 'blur' }],
        path: [{ required: true, message: '该项未填写', trigger: 'blur' }],
        component: [{ required: true, message: '该项未填写', trigger: 'blur' }],
        range: [{ required: true, message: '该项未填写', trigger: 'blur' }],
        menu: [{ required: true, message: '该项未填写', trigger: 'blur' }],
        status: [{ required: true, message: '该项未填写', trigger: 'blur' }],
    },
)
// const primaryBol = ref(false)

const { type = 'insert', row } = defineProps<ICustomDialogProps<IRoutingModule>>()

const emit = defineEmits(['close'])

watch(status, () => {
    formData.status = status.value ? 1 : 2
})

watch(isMenu, () => {
    formData.menu = isMenu.value ? 1 : 0
})
watch(isRange, () => {
    formData.range = isRange.value ? 1 : 0
})
watch(isContents, () => {
    formData.contents = isContents.value ? 1 : 0
})

const selectIcon = () => {
    customDialog<never, string>({
        title: '选择图标',
        modal: false,
        width: '60%',
        component: IconAll,
        open: (result) => {
            if (!result) return
            formData.iconType = result
        },
    })
}

const params = async (): Promise<RequestParams<FromParam> | void> => {
    const url = type === 'insert' ? 'routingConfigure/insert' : 'routingConfigure/update'
    const element = { ...formData }
    if (type === 'update') element.id = row!.id
    if (type === 'insert' && typeof row?.id === 'number') {
        element.path = row.path + element.path
        element.range = row.range
    } else delete element.primary_id
    return {
        url,
        element,
    }
}

const result = (param: boolean) => {
    if (param) {
        ElMessage.success(`${type === 'insert' ? '新增' : '修改'}成功`)
        emit('close', true)
    } else {
        ElMessage.success(`${type === 'insert' ? '新增' : '修改'}失败`)
    }
}

onBeforeMount(() => {
    if (type === 'update') {
        assignProps(formData, row!)
        formDataSet('serialNumber', row?.serialNumber as number)
        formDataSet('primary_id', row?.primary_id)
        status.value = formData.status === 1 ? true : false
        isMenu.value = formData.menu === 1 ? true : false
        isRange.value = formData.range === 1 ? true : false
        isContents.value = formData.contents === 1 ? true : false
    } else if (type === 'insert' && typeof row?.id === 'number') {
        formDataSet('primary_id', row.id)
        console.log(typeof row?.id)
    }
})
</script>

<style scoped>
#add-update {
    max-width: 1200px;
    margin: auto;
}
.iconType {
    font-size: 26px;
    border: 1px solid rgb(221, 221, 221);
    padding: 10px;
}
.add-update-header {
    display: flex;
    justify-content: center;
    padding-bottom: 15px;
}
</style>
