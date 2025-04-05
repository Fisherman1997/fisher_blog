<template>
    <QuickTable :-quick-table-props="quickTableParam" />
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import QuickTable from '@/components/quickTable'
import customDialog from '@/components/customDialog/CustomDialog'
import CustomChangeModula from './modula/CustomChangeModula.vue'
import type { IQuickTableProps } from '@/components/quickTable/QuickTable.vue'

export interface ICustom {
    clicks?: number
    content: string
    createDate?: string
    id?: number
    name: string
}
const quickTableParam = reactive<IQuickTableProps<ICustom>>({
    requestUrl: {
        find: 'custom/list',
        delete: 'custom/delete',
    },
    isSearch: true,
    isPagination: true,
    columns: [
        { label: '名称', prop: 'name', type: 'langtext', align: 'left' },
        { label: '创建时间', prop: 'createDate', type: 'time', align: 'center' },
        { label: '点击数', prop: 'clicks', type: 'string', align: 'center' },
        {
            label: '操作',
            type: 'edit',
            edit: [
                {
                    title: '修改',
                    type: 'button',
                    handle: <T extends ICustom>(row?: T) => changeCustom('update', row),
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
            handle: () => changeCustom('insert'),
        },
    ],
})

const changeCustom = (type: 'insert' | 'update' = 'insert', row?: ICustom) => {
    return new Promise((resolve) => {
        customDialog({
            title: type === 'insert' ? '新增' : '修改',
            modal: false,
            width: '50vw',
            component: CustomChangeModula,
            componentProps: { type, row },
            open: (result) => {
                if (!result) return
                console.log(result)
                resolve(result)
            },
        })
    })
}
</script>

<style scoped>
/* .user-manage{
} */
.custom-search {
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    padding: 20px 15px;
    margin-bottom: 20px;
    border-bottom: 1px solid rgb(216, 216, 216);
}
.custom-search ul {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.custom-search ul li {
    display: flex;
    margin-right: 20px;
    align-items: center;
}
.custom-search ul li > span {
    display: inline-block;
    width: 60px;
}

.custom-content {
    padding: 15px;
}
.custom-pagination {
    margin-top: 15px;
    justify-content: end;
}
</style>
