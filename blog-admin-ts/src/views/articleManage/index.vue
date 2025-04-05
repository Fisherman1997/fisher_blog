<template>
    <QuickTable :-quick-table-props="quickTableParam" />
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, ref } from 'vue'
import customDialog from '@/components/customDialog/CustomDialog'
import QuickTable from '@/components/quickTable/index'
import ArticleChangeModula from './modula/ArticleChangeModula.vue'
import { type IClassData } from '@/views/classManage/index.vue'
import { useAxios } from '@/hooks/useAxios'
import type { IQuickTableProps } from '@/components/quickTable/QuickTable.vue'
import { watch } from 'vue'

export interface IArticle {
    id: number
    title: string
    classId: number | '全部'
    createDate: string
    clicks: number
    content: string | null
}

const classlist = ref<IClassData[]>([])

const quickTableParam = reactive<IQuickTableProps<IArticle>>({
    requestUrl: {
        find: 'article/list',
        delete: 'article/delete',
    },
    isSearch: true,
    isPagination: true,
    columns: [
        { label: '标题', prop: 'title', type: 'langtext', align: 'left' },
        { label: '创建时间', prop: 'createDate', type: 'time', width: '200px', align: 'center' },
        { label: '点击数', prop: 'clicks', type: 'string', width: '80px', align: 'center' },
        {
            label: '操作',
            type: 'edit',
            width: '180px',
            edit: [
                {
                    title: '修改',
                    type: 'button',
                    handle: <T extends IArticle>(row?: T) => changeArticle('update', row),
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
            label: '分类',
            key: 'classId',
            type: 'select',
            select: classlist.value,
        },
        {
            label: '新增',
            key: 'add',
            type: 'button',
            color: 'primary',
            handle: () => changeArticle('insert'),
        },
    ],
})

// const content = ref()
const { post } = useAxios()

// interface ITableParam {
//     title: string | null
//     classId: number | '全部'
// }

/**
 *
 * @param type 'insert' | 'update'
 * @param row list_row
 */
const changeArticle = (type: 'insert' | 'update' = 'insert', row?: IArticle) => {
    return new Promise((resolve) => {
        customDialog<IArticle>({
            title: type === 'insert' ? '新增' : '修改',
            modal: false,
            width: '70vw',
            component: ArticleChangeModula,
            componentProps: { type, row },
            open: (result) => {
                resolve(result)
            },
        })
    })
}
const getClass = async () => {
    const data = await post<IClassData[], { name: string }>('class/list', { name: '' })
    if (data && data.statusCode === 200) {
        classlist.value = data.result
    }
}

watch(
    () => classlist.value,
    () => {
        quickTableParam.search![1].select = [...classlist.value]
    },
)

onBeforeMount(async () => {
    await getClass()
})
</script>

<style scoped></style>
