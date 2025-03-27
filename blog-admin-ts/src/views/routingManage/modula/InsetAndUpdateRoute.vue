<template>
    <div id="add-update">
        <div class="add-update-header">
            <el-radio-group
                :disabled="type === 'update'"
                v-model="primaryBol"
                @change="primaryChange"
            >
                <el-radio-button :label="false">一级路由</el-radio-button>
                <el-radio-button :label="true">二级路由</el-radio-button>
            </el-radio-group>
        </div>
        <el-form ref="formRef" :model="formData" :rules="rules" label-width="180px">
            <el-form-item v-if="primaryBol" label="父级：" prop="primary_id">
                <el-select v-model="formData.primary_id" class="m-2" placeholder="选择父级路由">
                    <template v-if="primaryList.list.length">
                        <el-option
                            v-for="item in primaryList.list"
                            :key="item.id"
                            :label="item.title"
                            :value="item.id as number"
                        />
                    </template>
                </el-select>
            </el-form-item>
            <el-form-item label="标题：" prop="title">
                <el-input v-model="formData.title" />
            </el-form-item>
            <el-form-item label="路由名称（不要中文）：" prop="name">
                <el-input v-model="formData.name" />
            </el-form-item>
            <el-form-item label="路由路径：" prop="path">
                <el-input v-model="formData.path" />
            </el-form-item>
            <el-form-item label="路由组件：" prop="component">
                <el-input v-model="formData.component" />
            </el-form-item>
            <el-form-item label="范围：" prop="range">
                <el-switch
                    v-model="formData.range"
                    size="large"
                    style="--el-switch-off-color: #13ce66"
                    @change="primaryLoadData"
                    inline-prompt
                    active-text="前台"
                    inactive-text="后台"
                />
            </el-form-item>
            <el-form-item label="是否菜单：" prop="menu">
                <el-switch
                    v-model="formData.menu"
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
            <el-form-item>
                <el-button type="primary" @click="submitForm(formRef, params, result)">{{
                    type === 'insert' ? '新增' : '修改'
                }}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, onBeforeMount, watch } from 'vue'
import { ElMessage } from 'element-plus'
import customDialog, { type ICustomDialogProps } from '@/components/customDialog/CustomDialog'
import IconAll from '@/components/iconAll/index'
import { useForm, type RequestParams } from '@/hooks/useForm.js'
import { useAxios } from '@/hooks/useAxios'
import { assignProps } from '@/utils/utils'
import type { IRoutingModule } from '../index.vue'

interface FromParam {
    id?: number
    primary_id?: string
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
}

const status = ref(true)
const { post } = useAxios()
const { formData, formRef, rules, submitForm } = useForm<FromParam>(
    {
        primary_id: '',
        title: '',
        name: '',
        path: '',
        component: '',
        serialNumber: null,
        range: 0,
        menu: 0,
        iconType: '',
        redirect: '',
        status: 1,
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
const primaryBol = ref(false)
const primaryList = reactive({
    list: [] as FromParam[],
})

const { type, row } = withDefaults(defineProps<ICustomDialogProps<IRoutingModule>>(), {
    type: 'insert',
})

const emit = defineEmits(['close'])

watch(status, () => {
    formData.status = status.value ? 1 : 2
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
    if (primaryBol.value) {
        if (typeof element.primary_id !== 'number') {
            ElMessage.warning('请选择父级路由')
            return
        }
    } else delete element.primary_id
    if (type === 'update') element.id = row.id
    element.range = formData.range ? 1 : 0
    element.menu = formData.menu ? 1 : 0
    element.status = formData.status ? 1 : 2
    return {
        url,
        element,
    }
}
// const result = () => {
//     ElMessage.success(`${type === 'insert' ? '新增' : '修改'}成功`)
//     emit('close',true)
// }

const result = (param: boolean) => {
    if (param) {
        ElMessage.success(`${type === 'insert' ? '新增' : '修改'}成功`)
        emit('close', true)
    } else {
        ElMessage.success(`${type === 'insert' ? '新增' : '修改'}失败`)
    }
}

const primaryChange = () => {
    if (primaryBol.value === false) formData.primary_id = ''
}
const primaryLoadData = async () => {
    const element = { range: formData.range ? 1 : 0 }
    const data = await post<FromParam[], typeof element>('routingConfigure/list', element)
    if (data && data.statusCode === 200) {
        const result = data.result.filter((element) => element.primary_id === null)
        primaryList.list = [...result]
    }
}

onBeforeMount(() => {
    primaryLoadData()
    if (type === 'update') {
        assignProps(formData, row)
        primaryBol.value = row.primary_id ? true : false
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
