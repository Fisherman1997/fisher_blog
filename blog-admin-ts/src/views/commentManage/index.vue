<template>
    <QuickTable :-quick-table-props="quickTableParam" />
</template>

<script setup lang="ts">
import QuickTable from '@/components/quickTable/index'
import customDialog from '@/components/customDialog/CustomDialog'
import CommentChangeModula from './modula/CommentChangeModula.vue'
import type { IQuickTableProps } from '@/components/quickTable/QuickTable.vue'
import { reactive } from 'vue'

export interface IComment {
    articleId: string
    content: string
    createDate: string
    httpsrc: string
    id: number
    parentId: number
    qq: string
    replyName: string
    reviewerName: string
}

const quickTableParam = reactive<IQuickTableProps<IComment>>({
    requestUrl: {
        find: 'comment/list',
        delete: 'comment/delete',
    },
    isSearch: true,
    isPagination: true,
    columns: [
        { label: '评论人', prop: 'reviewerName', width: '180px', type: 'string', align: 'left' },
        { label: '内容', prop: 'content', type: 'langtext', align: 'left' },
        { label: '评论时间', prop: 'createDate', width: '180px', type: 'time', align: 'center' },
        {
            label: '操作',
            type: 'edit',
            width: '180px',
            edit: [
                {
                    title: '修改',
                    type: 'button',
                    handle: <T extends IComment>(row?: T) => changeComment(row),
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
            label: '内容',
            key: 'content',
            type: 'input',
        },
        {
            label: '文章标题',
            key: 'articleName',
            type: 'input',
        },
    ],
})

const changeComment = (row?: IComment) => {
    return new Promise((resolve) => {
        customDialog({
            title: '修改',
            modal: false,
            width: '50vw',
            component: CommentChangeModula,
            componentProps: { type: 'update', row },
            open: (result) => {
                if (!result) return
                resolve(result)
            },
        })
    })
}
</script>

<style scoped></style>
