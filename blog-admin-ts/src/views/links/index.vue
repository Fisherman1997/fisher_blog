/* eslint-disable */
<template>
    <QuickTable :-quick-table-props="quickTableParam" />
</template>

<script setup lang="tsx">
import QuickTable from '@/components/quickTable/index'
import customDialog from '@/components/customDialog/CustomDialog'
import linksChangeModula from './modula/linksChangeModula.vue'
import type { IQuickTableProps } from '@/components/quickTable/QuickTable.vue'
import { reactive } from 'vue'
import { ElSpace, ElTag } from 'element-plus'

export interface ILink {
    avatar: string
    description: string
    http_url: string
    id?: number
    name: string
    status: number | boolean
}

const quickTableParam = reactive<IQuickTableProps<ILink>>({
    requestUrl: {
        find: 'links/list',
        delete: 'links/delete',
    },
    isSearch: true,
    isPagination: true,
    columns: [
        {
            label: '标题',
            prop: 'name',
            type: 'custom',
            align: 'left',
            customFun: (row) => {
                return (
                    <ElSpace>
                        <span>{row.name}</span> {/* ✅ 直接写 JSX，不要外层包裹 `{}` */}
                        {row.status === 1 ? (
                            <ElTag class="ml-2" type="success">
                                有效
                            </ElTag>
                        ) : (
                            <ElTag class="ml-2" type="danger">
                                失效
                            </ElTag>
                        )}
                    </ElSpace>
                )
            },
        },
        { label: '网址', prop: 'http_url', type: 'langtext', align: 'center' },
        {
            label: '操作',
            type: 'edit',
            edit: [
                {
                    title: '修改',
                    type: 'button',
                    handle: <T extends ILink>(row?: T) => changeLinks('update', row),
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
            label: '标题',
            key: 'title',
            type: 'input',
        },
        {
            label: '新增',
            key: 'add',
            type: 'button',
            color: 'primary',
            handle: () => changeLinks('insert'),
        },
    ],
})

const changeLinks = (type: 'insert' | 'update' = 'insert', row?: ILink) => {
    return new Promise((resolve) => {
        customDialog({
            title: type === 'insert' ? '新增' : '修改',
            modal: false,
            width: '50vw',
            component: linksChangeModula,
            componentProps: { type, row },
            open: (result) => {
                if (!result) return
                resolve(result)
            },
        })
    })
}
</script>

<style scoped>
/* .user-manage{
} */
.links-search {
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    padding: 20px 15px;
    margin-bottom: 20px;
    border-bottom: 1px solid rgb(216, 216, 216);
}

.links-content {
    padding: 15px;
}
.links-pagination {
    margin-top: 15px;
    justify-content: end;
}
</style>
