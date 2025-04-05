<template>
    <QuickTable :-quick-table-props="quickTableParam" />
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import QuickTable from '@/components/quickTable/index'
import customDialog from '@/components/customDialog/CustomDialog'
import ClassChangeModula, { type IClassChangeModulaProps } from './modula/ClassChangeModula.vue'
import type { IQuickTableProps } from '@/components/quickTable/QuickTable.vue'

export interface IClassData {
    id: number
    name: string
}

const quickTableParam = reactive<IQuickTableProps<IClassData>>({
    requestUrl: {
        find: 'class/list',
        delete: 'class/delete',
    },
    isSearch: true,
    isPagination: false,
    tableMaxWidth: '1000px',
    tableMinWidth: '300px',
    columns: [
        { label: '名称', prop: 'name', type: 'langtext', align: 'left' },
        {
            label: '操作',
            type: 'edit',
            width: '180px',
            edit: [
                {
                    title: '修改',
                    type: 'button',
                    handle: <T extends IClassData>(row?: T) => changeUser('update', row),
                },
                {
                    title: '删除',
                    type: 'delete',
                },
            ],
            align: 'left',
        },
    ],
    search: [
        {
            label: '名称',
            key: 'title',
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

const changeUser = (type: 'insert' | 'update', row?: IClassData) => {
    return new Promise((resolve) => {
        customDialog<IClassChangeModulaProps>({
            title: type === 'insert' ? '新增' : '修改',
            modal: false,
            top: '30vh',
            width: '600px',
            component: ClassChangeModula,
            componentProps: { type, row },
            open: (result) => {
                if (!result) return
                resolve(result)
            },
        })
    })
}
</script>

<style scoped></style>
