<template>
    <div id="routing-manage">
        <div class="routing-manage-hrader">
            <el-radio-group v-model="tableObject.params.range" @change="methods.loadData">
                <el-radio-button :label="0">后台路由</el-radio-button>
                <el-radio-button :label="1">前台路由</el-radio-button>
            </el-radio-group>
            <el-button @click="changeRoute('insert')" type="primary"
                ><el-icon><Plus /></el-icon> 新增</el-button
            >
        </div>
        <el-table
            :loading="tableObject.loading"
            :data="tableObject.tableList"
            :border="true"
            stripe
            style="width: 100%"
        >
            <el-table-column type="expand">
                <template #default="props">
                    <div m="4" v-if="props.row.children && props.row.children.length">
                        <el-table :data="props.row.children" :border="true">
                            <el-table-column
                                label="序"
                                prop="serialNumber"
                                width="60px"
                                align="center"
                            />
                            <el-table-column label="标题" prop="title">
                                <template #default="props">
                                    <el-space>
                                        {{ props.row.title }}
                                        <el-tag
                                            v-if="props.row.range === 1"
                                            class="ml-2"
                                            type="warning"
                                            >前台</el-tag
                                        >
                                        <el-tag
                                            v-if="props.row.range === 0"
                                            class="ml-2"
                                            type="warning"
                                            >后台</el-tag
                                        >
                                        <el-tag
                                            v-if="props.row.menu === 1"
                                            class="ml-2"
                                            type="success"
                                            >菜单</el-tag
                                        >
                                        <el-tag
                                            v-if="props.row.menu === 0"
                                            class="ml-2"
                                            type="success"
                                            >非菜单</el-tag
                                        >
                                    </el-space>
                                </template>
                            </el-table-column>
                            <el-table-column label="路由名称" prop="name" />
                            <el-table-column label="路由路径" prop="path" />
                            <el-table-column label="路由组件" prop="component" />
                            <el-table-column label="操作">
                                <template #default="props">
                                    <el-button
                                        type="primary"
                                        @click="changeRoute('update', props.row)"
                                        link
                                        >修改</el-button
                                    >
                                    <el-popconfirm
                                        title="确认删除吗？"
                                        @confirm="methods.deleteData(props.row.id)"
                                    >
                                        <template #reference>
                                            <el-button type="danger" link>删除</el-button>
                                        </template>
                                    </el-popconfirm>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="序" prop="serialNumber" width="60px" align="center" />
            <el-table-column label="标题" prop="title">
                <template #default="props">
                    <el-space>
                        {{ props.row.title }}
                        <el-tag v-if="props.row.range === 1" class="ml-2" type="warning"
                            >前台</el-tag
                        >
                        <el-tag v-if="props.row.range === 0" class="ml-2" type="warning"
                            >后台</el-tag
                        >
                        <el-tag v-if="props.row.menu === 1" class="ml-2" type="success"
                            >菜单</el-tag
                        >
                        <el-tag v-if="props.row.menu === 0" class="ml-2" type="success"
                            >非菜单</el-tag
                        >
                    </el-space>
                </template>
            </el-table-column>
            <el-table-column label="路由名称" prop="name" />
            <el-table-column label="路由路径" prop="path" />
            <el-table-column label="路由组件" prop="component" />
            <el-table-column label="操作">
                <template #default="props">
                    <el-button type="primary" @click="changeRoute('update', props.row)" link
                        >修改</el-button
                    >
                    <el-popconfirm title="确认删除吗？" @confirm="methods.deleteData(props.row.id)">
                        <template #reference>
                            <el-button type="danger" link>删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import CustomDialog from '@/components/customDialog/CustomDialog'
import InsetAndUpdateRoute from './modula/InsetAndUpdateRoute.vue'
import { useTable } from '@/hooks/useTable.js'

export interface IRoutingModule {
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
    children?: IRoutingModule[]
}

const { tableObject, methods } = useTable<IRoutingModule, { range: 0 | 1 }>({
    url: {
        find: 'routingConfigure/list',
        delete: 'routingConfigure/delete',
    },
    pagination: false,
    isLoad: true,
})

const changeRoute = (type: 'insert' | 'update' = 'insert', row?: IRoutingModule) => {
    const title = type === 'insert' ? '新增路由' : '修改路由'
    CustomDialog({
        title,
        modal: false,
        width: '50%',
        component: InsetAndUpdateRoute,
        componentProps: { type, row },
        open: (result) => {
            if (result) methods.loadData()
        },
    })
}

onBeforeMount(() => {
    tableObject.params.range = 0
})
</script>

<style scoped>
.routing-manage-hrader {
    display: flex;
    justify-content: space-between;
    padding: 15px;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    margin-bottom: 20px;
}
</style>
