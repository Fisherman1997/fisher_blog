<template>
    <QuickTable :-quick-table-props="quickTableParam" />
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import QuickTable from '@/components/quickTable/index'
import customDialog from '@/components/customDialog/CustomDialog'
import RandomChangeModula from './modula/RandomChangeModula.vue'
import type { IQuickTableProps } from '@/components/quickTable/QuickTable.vue'

export interface IRandomWrite {
    clicks?: number
    content: string
    cover_list?: (string | File)[]
    createDate?: string
    createUserId?: number
    id?: number
    updateTime?: number
}

const quickTableParam = reactive<IQuickTableProps<IRandomWrite>>({
    requestUrl: {
        find: 'randomWrite/list',
        delete: 'randomWrite/delete',
    },
    isSearch: true,
    isPagination: true,
    columns: [
        {
            label: '内容',
            prop: 'content',
            type: 'langtext',
            align: 'left',
        },
        { label: '点击数', prop: 'clicks', type: 'string', width: '80px', align: 'center' },
        {
            label: '操作',
            type: 'edit',
            edit: [
                {
                    title: '修改',
                    type: 'button',
                    handle: <T extends IRandomWrite>(row?: T) => changeRandom('update', row),
                },
                {
                    title: '删除',
                    type: 'delete',
                },
            ],
            width: '180px',
            align: 'center',
        },
    ],
    search: [
        {
            label: '内容',
            key: 'content',
            type: 'input',
        },
        {
            label: '新增',
            key: 'add',
            type: 'button',
            color: 'primary',
            handle: () => changeRandom('insert'),
        },
    ],
})

const changeRandom = (type: 'insert' | 'update' = 'insert', row?: IRandomWrite) => {
    return new Promise((resolve) => {
        customDialog({
            title: type === 'insert' ? '新增' : '修改',
            modal: false,
            width: '50vw',
            component: RandomChangeModula,
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
