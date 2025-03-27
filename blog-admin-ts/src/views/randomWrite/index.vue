<template>
    <div class="random-write">
        <div class="random-search">
            <ul>
                <li>
                    <span>名称：</span>
                    <el-input v-model="tableObject.params.content" />
                </li>
                <li>
                    <el-button type="primary" plain @click="methods.loadData">查询</el-button>
                </li>
            </ul>
            <el-button type="primary" @click="changeRandom('insert')">新增</el-button>
        </div>
        <div class="random-content">
            <el-table :border="true" :data="tableObject.tableList">
                <el-table-column
                    type="index"
                    label="序"
                    :index="(index: number) => index + 1"
                    width="60px"
                    align="center"
                />
                <el-table-column prop="content" label="内容">
                    <template #default="props">
                        {{
                            props.row.content.length > 60
                                ? props.row.content.substr(0, 60)
                                : props.row.content
                        }}
                    </template>
                </el-table-column>
                <el-table-column prop="clicks" label="点击数" width="80px" align="center" />
                <el-table-column label="操作" width="180px" align="center">
                    <template #default="props">
                        <el-button type="primary" @click="changeRandom('update', props.row)" link
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
            <el-pagination
                class="random-pagination"
                small
                background
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableObject.total"
                :page-sizes="[10, 20, 30, 100]"
                v-model:currentPage="tableObject.page"
                v-model:pageSize="tableObject.pageNum"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import customDialog from '@/components/customDialog/CustomDialog'
import RandomChangeModula from './modula/RandomChangeModula.vue'
import { useTable } from '@/hooks/useTable.js'

export interface IRandomWrite {
    clicks?: number
    content: string
    cover_list?: (string | File)[]
    createDate?: string
    createUserId?: number
    id?: number
    updateTime?: number
}

const { tableObject, methods } = useTable<IRandomWrite, { content: string }>({
    url: {
        find: 'randomWrite/list',
        delete: 'randomWrite/delete',
    },
    pagination: true,
    isLoad: true,
})

const changeRandom = (type: 'insert' | 'update' = 'insert', row?: IRandomWrite) => {
    customDialog({
        title: type === 'insert' ? '新增' : '修改',
        modal: false,
        width: '50vw',
        component: RandomChangeModula,
        componentProps: { type, row },
        open: (result) => {
            if (!result) return
            methods.loadData()
        },
    })
}

onBeforeMount(() => {
    tableObject.params.content = ''
})
</script>

<style scoped>
/* .user-manage{
} */
.random-search {
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    padding: 20px 15px;
    margin-bottom: 20px;
    border-bottom: 1px solid rgb(216, 216, 216);
}
.random-search ul {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.random-search ul li {
    display: flex;
    margin-right: 20px;
    align-items: center;
}
.random-search ul li > span {
    display: inline-block;
    width: 60px;
}

.random-content {
    padding: 15px;
}
.random-pagination {
    margin-top: 15px;
    justify-content: end;
}
</style>
