<template>
	<div class="comment-manage">
        <div class="comment-search">
            <ul>
                <li>
                    <span>内容：</span>
                    <el-input v-model="tableObject.params.content" />
                </li>
                <li>
                    <span>文章标题：</span>
                    <el-input v-model="tableObject.params.articleName" />
                </li>
                <li>
                    <el-button type="primary" plain @click="methods.loadData">查询</el-button>
                </li>
            </ul>
        </div>
        <div class="comment-content">
            <el-table
                :border="true"
                :data="tableObject.tableList">
                <el-table-column type="index" label="序" :index="index => index + 1" width="60px"  align="center" />
                <el-table-column prop="reviewerName" label="评论人"   />
                <el-table-column prop="content" label="内容"  />
                <el-table-column prop="createDate" label="评论时间">
                    <template #default="props">
                        {{ new Date(props.row.createDate).toLocaleString().split('/').join('-') }}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="props">
                        <el-button type="primary" @click="changeComment(props.row)" link >修改</el-button>
                        <el-popconfirm title="确认删除吗？" @confirm="methods.deleteData(props.row.id)">
                            <template #reference>
                                <el-button type="danger" link >删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination 
                class="comment-pagination"
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
import { onBeforeMount } from 'vue'
import customDialog from '@/components/customDialog'
import CommentChangeModula from './modula/CommentChangeModula'
import { useTable } from '@/hooks/useTable'


const { tableObject, methods } = useTable({
    url: {
        find: 'comment/list',
        delete: 'comment/delete'
    },
    pagination: true,
    isLoad: true
})

const changeComment = (row = {}) => {
    customDialog({
        title: '修改',
        modal: false,
        width: '50vw',
        component: CommentChangeModula,
        componentProps: { row},
        open: (result) => {
            if (!result) return
            methods.loadData()
        }
    })
}

onBeforeMount(async () => {
    tableObject.params.content = ''
    tableObject.params.articleName = ''
})
</script>

<style scoped>
/* .user-manage{
} */
.comment-search {
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    padding: 20px 15px;
    margin-bottom: 20px;
    border-bottom: 1px solid rgb(216, 216, 216);
}
.comment-search ul {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.comment-search ul li {
    display: flex;
    margin-right: 20px;
    align-items: center;
}
.comment-search ul li>span{
    display: inline-block;
    text-align: right;
    width: 95px;
}

.comment-content{
    padding: 15px;
}
.comment-pagination{
    margin-top: 15px;
    justify-content: end;
}
</style>
