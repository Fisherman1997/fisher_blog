<template>
    <div class="article-manage ovHidden-H100">
        <div class="article-search">
            <el-form :model="tableObject.params" style="width: 100%">
                <el-row :gutter="15">
                    <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                        <el-form-item label="名称">
                            <el-input
                                v-model="tableObject.params.title"
                                placeholder="名称"
                                clearable
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
                        <el-form-item label="分类">
                            <el-select v-model="tableObject.params.classId" placeholder="选择分类">
                                <el-option key="全部" label="全部" value="null" />
                                <template v-if="state.classlist.length">
                                    <el-option
                                        v-for="item in state.classlist"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                    />
                                </template>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="4" :sm="4" :md="3" :lg="2" :xl="1">
                        <el-form-item>
                            <el-button type="primary" @click="methods.loadData">查询</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="4" :sm="4" :md="3" :lg="2" :xl="1">
                        <el-form-item>
                            <el-button type="warning" @click="changeArticle('insert')"
                                >新增</el-button
                            >
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <!-- <ul>
                <li>
                    <span>名称：</span>
                    <el-input v-model="tableObject.params.title" />
                </li>
                <li>
                    <span>分类：</span>
                    <el-select
                        v-model="tableObject.params.classId as number"
                        class="m-2"
                        placeholder="选择分类"
                    >
                        <el-option key="全部" label="全部" value="全部" />
                        <template v-if="state.classlist.length">
                            <el-option
                                v-for="item in state.classlist"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            />
                        </template>
                    </el-select>
                </li>
                <li>
                    <el-button type="primary" plain @click="methods.loadData">查询</el-button>
                </li>
            </ul> -->
        </div>
        <div class="article-content" :ref="content">
            <el-table
                style="box-shadow: 0 0 1px rgba(0, 0, 0, 0.3); height: calc(100% - 40px)"
                :border="true"
                :data="tableObject.tableList"
            >
                <el-table-column
                    type="index"
                    label="序"
                    :index="(index: number) => index + 1"
                    width="60px"
                    align="center"
                />
                <el-table-column prop="title" label="标题" />
                <el-table-column prop="createDate" label="创建时间">
                    <template #default="props">
                        {{ new Date(props.row.createDate).toLocaleString().split('/').join('-') }}
                    </template>
                </el-table-column>
                <el-table-column prop="clicks" label="点击数" />
                <el-table-column label="操作">
                    <template #default="props">
                        <el-button type="primary" @click="changeArticle('update', props.row)" link
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
                class="article-pagination"
                size="small"
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
import { onBeforeMount, reactive, ref } from 'vue'
import customDialog from '@/components/customDialog/CustomDialog'
import ArticleChangeModula from './modula/ArticleChangeModula.vue'
import { type IClassData } from '@/views/classManage/index.vue'
import { useTable } from '@/hooks/useTable.js'
import { useAxios } from '@/hooks/useAxios'

export interface IArticle {
    id: number
    title: string
    classId: number | '全部'
    createDate: string
    clicks: number
    content: string | null
}

const content = ref()
const { post } = useAxios()
const state = reactive({
    classlist: [] as IClassData[],
})

interface ITableParam {
    title: string | null
    classId: number | '全部'
}

const { tableObject, methods } = useTable<IArticle, ITableParam>({
    url: {
        find: 'article/list',
        delete: 'article/delete',
    },
    pagination: true,
    isLoad: true,
    RequestPreProcessing: (param) => {
        if (typeof param.classId === 'string') param.classId = null as unknown as number
        return param
    },
})

/**
 *
 * @param type 'insert' | 'update'
 * @param row list_row
 */
const changeArticle = (type: 'insert' | 'update' = 'insert', row?: IArticle) => {
    customDialog<IArticle>({
        title: type === 'insert' ? '新增' : '修改',
        modal: false,
        width: '70vw',
        component: ArticleChangeModula,
        componentProps: { type, row },
        open: (result) => {
            if (!result) return
            methods.loadData()
        },
    })
}
const getClass = async () => {
    const data = await post<IClassData[], { name: string }>('class/list', { name: '' })
    if (data && data.statusCode === 200) {
        state.classlist = data.result
    }
}
onBeforeMount(async () => {
    await getClass()
    tableObject.params.title = null
    tableObject.params.classId = '全部'
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
