<template>
    <QuickTable :-quick-table-props="quickTableParam" />
</template>

<script setup lang="tsx">
import { reactive } from 'vue'
import QuickTable from '@/components/quickTable/index'
import customDialog from '@/components/customDialog/CustomDialog'
import InsertAndUpdateUser from './modula/InsertAndUpdateUser.vue'
import ChangePassword, { type IChangePasswordProps } from './modula/ChangePassword.vue'
import PowerModula, { type IPowerModula } from './modula/PowerModula.vue'
import type { IUserInfo } from '@/store/user.store'
import type { IQuickTableProps } from '@/components/quickTable/QuickTable.vue'
import { ElSpace, ElTag } from 'element-plus'

// interface

// interface ITableParam {
//     name: string
// }

const quickTableParam = reactive<IQuickTableProps<IUserInfo>>({
    requestUrl: {
        find: 'user/list',
        delete: 'user/delete',
    },
    isSearch: true,
    isPagination: true,
    columns: [
        {
            label: '名称',
            prop: 'name',
            type: 'custom',
            align: 'left',
            customFun: (row) => {
                return (
                    <ElSpace>
                        <span>{row.name}</span>
                        {row.status === 1 ? (
                            <ElTag class="ml-2" type="success">
                                启用
                            </ElTag>
                        ) : (
                            <ElTag class="ml-2" type="danger">
                                禁用
                            </ElTag>
                        )}
                    </ElSpace>
                )
            },
        },
        { label: '账号', prop: 'code', type: 'string', align: 'left' },
        { label: '邮箱', prop: 'eMail', type: 'string', align: 'left' },
        {
            label: '操作',
            type: 'edit',
            edit: [
                {
                    title: '信息',
                    type: 'button',
                    handle: <T extends IUserInfo>(row?: T) => changeUser('update', row),
                },
                {
                    title: '权限',
                    type: 'button',
                    handle: <T extends IUserInfo>(row?: T) => changePower(row!),
                },
                {
                    title: '修改密码',
                    type: 'button',
                    handle: <T extends IUserInfo>(row?: T) => changePasswordFun(row!),
                },
                {
                    title: '删除',
                    type: 'delete',
                },
            ],
            align: 'center',
        },
    ],
    search: [
        {
            label: '名称',
            key: 'name',
            type: 'input',
        },
        {
            label: '新增',
            key: 'add',
            type: 'button',
            color: 'primary',
            handle: () => changeUser('insert'),
        },
    ],
})
const changeUser = (type: 'insert' | 'update' = 'insert', row?: IUserInfo) => {
    return new Promise((resolve) => {
        customDialog<IUserInfo>({
            title: type === 'insert' ? '新增' : '修改',
            modal: false,
            width: '600px',
            component: InsertAndUpdateUser,
            componentProps: { type, row },
            open: (result) => {
                if (!result) return
                resolve(result)
            },
        })
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
    return Promise.resolve(false)
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
    return Promise.resolve(false)
}
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
