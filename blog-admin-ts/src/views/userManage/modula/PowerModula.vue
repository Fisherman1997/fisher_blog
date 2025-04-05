<template>
    <div class="power-modula">
        <el-radio-group class="power-modula-header" v-model="range" @change="routeLoadData">
            <el-radio-button :value="0">后台</el-radio-button>
            <el-radio-button :value="1">前台</el-radio-button>
        </el-radio-group>
        <el-tree
            :data="treeData"
            show-checkbox
            :props="defaultProps"
            :default-checked-keys="userPower.defaultKeys"
            @check-change="handleCheckChange"
            node-key="id"
        />
        <el-button class="update-but" type="primary" @click="updateUserPower"
            >提交权限修改</el-button
        >
    </div>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount, computed, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useAxios } from '@/hooks/useAxios'
import { useLoading } from '@/hooks/useLoading.js'
import type { IRoutingModule } from '@/views/routingManage/index.vue'

const { post } = useAxios()
const [toStart, toEnd] = useLoading()

export interface IPowerModula {
    userId?: number | null
}

const { userId = null } = defineProps<IPowerModula>()
const emit = defineEmits<{
    (e: 'close', payload: boolean): void
}>()

const routeList = reactive<{
    state: IRoutingModule[]
}>({ state: [] })
// const defaultKeys = reactive([])
const userPower = reactive<{
    defaultKeys: number[]
    element: number[]
}>({
    defaultKeys: [],
    element: [1],
})
const range = ref(0)
const defaultProps = {
    children: 'children',
    label: 'label',
}

interface ItreeData {
    label: string
    id?: number
    children?: ItreeData[]
}

const treeData = computed(() => {
    if (routeList.state.length === 0) return []
    else
        return routeList.state.map((item) => {
            const result: ItreeData = {
                label: item.title,
                id: item.id,
            }
            if (item.children!.length) {
                result.children = item.children!.map((citem) => {
                    return {
                        label: citem.title,
                        id: citem.id,
                    }
                })
            }
            return result
        })
})

const handleCheckChange = (data: (typeof routeList.state)[number], checked: boolean) => {
    if (checked) {
        if (userPower.element.includes(data.id!)) return
        userPower.element.push(data.id!)
    } else {
        userPower.element = userPower.element.filter((item) => item !== data.id)
    }
}

const routeLoadData = async () => {
    const element = { range: range.value }
    const data = await post<IRoutingModule[], typeof element>('routingConfigure/list', element)
    if (data && data.statusCode === 200) {
        routeList.state = [...data.result]
    }
}

const getUserPower = async () => {
    if (!userId) return ElMessage.success('无用户ID ，无法查询权限')
    const data = await post<number[], { id: number }>('user/getUserPower', { id: userId })
    if (data && data.statusCode === 200) {
        userPower.defaultKeys = [...data.result]
        userPower.element = [...data.result]
        // console.log(treeData.value)
    }
}

const updateUserPower = async () => {
    if (!userId) return ElMessage.success('无用户ID ，无法查询权限')
    const element = {
        id: userId,
        power: [...userPower.element],
    }
    toStart()
    const data = await post('user/updateUserPower', element).finally(toEnd)
    if (data && data.statusCode === 200) {
        ElMessage.success('权限修改成功')
        emit('close', true)
    }
}

onBeforeMount(async () => {
    routeLoadData() // 获取路由表
    getUserPower() // 获取权限
})
</script>

<style scoped>
.power-modula-header {
    margin-bottom: 20px;
}
.update-but {
    display: block;
    /* margin-top: 20px; */
    margin: 20px auto 0;
}
</style>
