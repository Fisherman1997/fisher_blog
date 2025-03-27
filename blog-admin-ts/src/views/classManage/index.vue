<template>
    <div class="class-manage">
        <div class="class-search">
            <ul>
                <li>
                    <span>名称：</span>
                    <el-input v-model="tableObject.params.name" />
                </li>
                <li>
                    <el-button type="primary" plain @click="methods.loadData">查询</el-button>
                </li>
            </ul>
            <el-button type="primary" @click="changeUser('insert')">新增</el-button>
        </div>
        <div class="class-content">
            <el-table :border="true" :data="tableObject.tableList">
                <el-table-column
                    type="index"
                    label="序"
                    :index="(index: number) => index + 1"
                    width="60px"
                    align="center"
                />
                <el-table-column prop="name" label="分类名称" />
                <el-table-column label="操作">
                    <template #default="props">
                        <el-button type="primary" @click="changeUser('update', props.row)" link
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
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import customDialog from '@/components/customDialog/CustomDialog'
import ClassChangeModula, { type IClassChangeModulaProps } from './modula/ClassChangeModula.vue'
import { useTable } from '@/hooks/useTable.js'

export interface IClassData {
    id: number
    name: string
}

const { tableObject, methods } = useTable<IClassData, { name: string }>({
    url: {
        find: 'class/list',
        delete: 'class/delete',
    },
    pagination: false,
    isLoad: true,
})

const changeUser = (type: 'insert' | 'update', row?: IClassData) => {
    customDialog<IClassChangeModulaProps>({
        title: type === 'insert' ? '新增' : '修改',
        modal: false,
        width: '600px',
        component: ClassChangeModula,
        componentProps: { type, row },
        open: (result) => {
            if (!result) return
            methods.loadData()
        },
    })
}

onBeforeMount(() => {
    tableObject.params.name = ''
})
</script>

<style scoped>
/* .user-manage{
} */
.class-search {
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    padding: 20px 15px;
    margin-bottom: 20px;
    border-bottom: 1px solid rgb(216, 216, 216);
}
.class-search ul {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.class-search ul li {
    display: flex;
    margin-right: 20px;
    align-items: center;
}
.class-search ul li > span {
    display: inline-block;
    width: 60px;
}

.class-content {
    max-width: 1000px;
    min-width: 300px;
    padding: 15px;
}
.class-pagination {
    margin-top: 15px;
    justify-content: end;
}
</style>
