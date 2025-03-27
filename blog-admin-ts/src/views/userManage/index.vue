<template>
    <div class="user-manage">
        <div class="user-search">
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
        <div class="user-content">
            <el-table :border="true" :data="tableObject.tableList">
                <el-table-column
                    type="index"
                    label="序"
                    :index="(index: number) => index + 1"
                    width="60px"
                    align="center"
                />
                <el-table-column prop="name" label="名称">
                    <template #default="props">
                        <el-space>
                            <span>{{ props.row.name }}</span>
                            <el-tag v-if="props.row.status === 1" class="ml-2" type="success"
                                >启用</el-tag
                            >
                            <el-tag v-else class="ml-2" type="danger">禁用</el-tag>
                        </el-space>
                    </template>
                </el-table-column>
                <el-table-column prop="code" label="账号" />
                <el-table-column prop="eMail" label="邮箱" />
                <el-table-column label="操作" align="center">
                    <template #default="props">
                        <el-button type="primary" @click="changeUser('update', props.row)" link
                            >信息</el-button
                        >
                        <el-button type="primary" @click="changePower(props.row)" link
                            >权限</el-button
                        >
                        <el-button type="primary" @click="changePasswordFun(props.row)" link
                            >修改密码</el-button
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
                class="user-pagination"
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
import InsertAndUpdateUser from './modula/InsertAndUpdateUser.vue'
import ChangePassword, { type IChangePasswordProps } from './modula/ChangePassword.vue'
import PowerModula, { type IPowerModula } from './modula/PowerModula.vue'
import { useTable } from '@/hooks/useTable.js'
import type { IUserInfo } from '@/store/user.store'

// interface

interface ITableParam {
    name: string
}

const { tableObject, methods } = useTable<IUserInfo, ITableParam>({
    url: {
        find: 'user/list',
        delete: 'user/delete',
    },
    pagination: true,
    isLoad: true,
})

const changeUser = (type: 'insert' | 'update' = 'insert', row?: IUserInfo) => {
    customDialog<IUserInfo>({
        title: type === 'insert' ? '新增' : '修改',
        modal: false,
        width: '600px',
        component: InsertAndUpdateUser,
        componentProps: { type, row },
        open: (result) => {
            if (!result) return
            methods.loadData()
        },
    })
}

const changePower = (row: IUserInfo) => {
    customDialog<IPowerModula>({
        title: '用户权限管理',
        modal: false,
        width: '30vw',
        component: PowerModula,
        componentProps: { userId: row.id },
        open: (result) => {
            if (!result) return
            console.log('修改权限')
        },
    })
}

const changePasswordFun = (row: IUserInfo) => {
    customDialog<IChangePasswordProps>({
        title: `修改用户密码-${row.name}`,
        modal: false,
        component: ChangePassword,
        componentProps: { userId: row.id },
        open: (result) => {
            if (!result) return
            console.log('修改密码')
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
.user-search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 15px;
    margin-bottom: 20px;
    border-bottom: 1px solid rgb(216, 216, 216);
}
.user-search ul {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.user-search ul li {
    display: flex;
    margin-right: 20px;
    align-items: center;
}
.user-search ul li > span {
    display: inline-block;
    width: 60px;
}

.user-content {
    padding: 15px;
}
.user-pagination {
    margin-top: 15px;
    justify-content: end;
}
</style>
