<template>
	<div class="article-manage">
        <div class="article-search">
            <ul>
                <li>
                    <span>名称：</span>
                    <el-input v-model="tableObject.params.title" />
                </li>
                <li>
                    <span>分类：</span>
                    <el-select
                        v-model="tableObject.params.classId" 
                        class="m-2" 
                        placeholder="选择分类">
                        <el-option 
                            key="全部"
                            label="全部"
                            value="全部"/>
                        <template v-if="state.classlist.length">
                            <el-option
                                v-for="item in state.classlist"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"/>
                        </template>
                    </el-select>
                    <!-- <el-input v-model="tableObject.params." /> -->
                </li>
                <li>
                    <el-button type="primary" plain @click="methods.loadData">查询</el-button>
                </li>
            </ul>
            <el-button type="primary" @click="changeArticle('insert')" >新增</el-button>
        </div>
        <div class="article-content" :ref="content">
            <el-table
                style="box-shadow: 0 0 1px rgba(0, 0, 0, .3); height: calc(100% - 40px);"
                :border="true"
                :data="tableObject.tableList">
                <el-table-column type="index" label="序" :index="index => index + 1" width="60px"  align="center" />
                <el-table-column prop="title" label="标题"  />
                <el-table-column prop="createDate" label="创建时间">
                    <template #default="props">
                        {{ new Date(props.row.createDate).toLocaleString().split('/').join('-') }}
                    </template>
                </el-table-column>
                <el-table-column prop="clicks" label="点击数"  />
                <el-table-column label="操作">
                    <template #default="props">
                        <el-button type="primary" @click="changeArticle('update',props.row)" link >修改</el-button>
                        <el-popconfirm title="确认删除吗？" @confirm="methods.deleteData(props.row.id)">
                            <template #reference>
                                <el-button type="danger" link >删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination 
                class="article-pagination"
                small
                background 
                layout="total, sizes, prev, pager, next, jumper" 
                :total="tableObject.total"
                :page-sizes="[10, 20, 30, 100]"
                v-model:currentPage="tableObject.page"
                v-model:pageSize="tableObject.pageNum" />
        </div>
	</div>
</template>

<script setup>
import { onBeforeMount, reactive, ref } from 'vue'
import customDialog from '@/components/customDialog'
import ArticleChangeModula from './modula/ArticleChangeModula'
import { useTable } from '@/hooks/useTable'
import { useAxios } from '@/hooks/useAxios'

const content = ref()
// const contentHeight = ref()
const { post } = useAxios()
const state = reactive({
    classlist: []
})
const { tableObject, methods } = useTable({
    url: {
        find: 'article/list',
        delete: 'article/delete'
    },
    pagination: true,
    isLoad: true,
    RequestPreProcessing: (param) => {
        if (typeof param.classId === 'string') param.classId = null
        return param
    }
})

/**
 * 
 * @param type 'insert' | 'update'
 * @param row list_row
 */
const changeArticle = (type = 'insert', row = {}) => {
    customDialog({
        title: type === 'insert' ? '新增' : '修改',
        modal: false,
        width: '70vw',
        component: ArticleChangeModula,
        componentProps: { type, row},
        open: (result) => {
            if (!result) return
            methods.loadData()
        }
    })
}
const getClass = async () => {
    const data = await post('class/list',{name: ''})
    if (data && data.statusCode === 200) {
        state.classlist = data.result
    }
}

// onMounted(() => {
//     contentHeight.value = content.value.clientHeight - 38
// })

onBeforeMount(async () => {
    await getClass()
    tableObject.params.title = null
    tableObject.params.classId = "全部"
})
</script>

<style scoped>
.article-manage{
    display: flex;
    height: 100%;
    flex-direction: column;
}
.article-search {
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
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
.article-search ul li>span{
    display: inline-block;
    width: 60px;
}

.article-content{
    flex: 1;
    height: 100%;
    overflow: hidden;
    padding: 15px;
}
.article-pagination{
    margin-top: 15px;
    justify-content: end;
}
</style>
