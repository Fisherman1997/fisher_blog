<template>
    <QuickTable :-quick-table-props="quickTableParam" />
</template>

<script setup lang="ts">
import { onBeforeMount, reactive } from 'vue'
import customDialog from '@/components/customDialog/CustomDialog'
import QuickTable from '@/components/quickTable/index'
import ArticleChangeModula from './modula/ArticleChangeModula.vue'
import { type IClassData } from '@/views/classManage/index.vue'
import { useAxios } from '@/hooks/useAxios'
import type { IQuickTableColumn, IQuickTableProps } from '@/components/quickTable/QuickTable.vue'
import { watch } from 'vue'

export interface IArticle {
    id: number
    title: string
    classId: number | '全部'
    createDate: string
    clicks: number
    content: string | null
}

const state = reactive({
    classlist: [] as IClassData[],
})

const quickTableParam = reactive<IQuickTableProps<IArticle, IQuickTableColumn<IArticle>[]>>({
    requestUrl: {
        find: 'article/list',
        delete: 'article/delete',
    },
    isSearch: true,
    isPagination: true,
    columns: [
        { label: '标题', prop: 'title', type: 'string', align: 'left' },
        { label: '创建时间', prop: 'createDate', type: 'time', align: 'center' },
        { label: '点击数', prop: 'clicks', type: 'string', align: 'center' },
        {
            label: '操作',
            type: 'edit',
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
            select: state.classlist,
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
        state.classlist = data.result
    }
}

watch(
    () => state.classlist,
    () => {
        quickTableParam.search![1].select = [...state.classlist]
    },
)

onBeforeMount(async () => {
    await getClass()
})
</script>

<style scoped>
.article-manage {
    display: flex;
    /* height: 100%; */
    flex-direction: column;
}
.article-search {
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    width: calc(100% - 30px);
    padding: 20px 15px;
    margin-bottom: 20px;
    border-bottom: 1px solid rgb(216, 216, 216);
}
.article-search ul {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.article-search ul li {
    display: flex;
    margin-right: 20px;
    align-items: center;
}
.article-search ul li > span {
    display: inline-block;
    width: 60px;
}

.article-content {
    overflow: hidden;
    flex: 1;
    padding: 15px;
}
.article-pagination {
    margin-top: 15px;
    justify-content: end;
}
</style>
