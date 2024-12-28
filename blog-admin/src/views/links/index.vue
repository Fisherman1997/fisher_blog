<template>
	<div class="links">
        <div class="links-search">
            <el-button type="primary" @click="changeLinks('insert')" >新增</el-button>
        </div>
        <div class="links-content">
            <el-table
                :border="true"
                :data="tableObject.tableList">
                <el-table-column type="index" label="序" :index="index => index + 1" width="60px" algin="center" />
                <el-table-column prop="name" label="名称">
                    <template #default="props">
                        <el-space>
                            <span>{{ props.row.name }}</span>
                            <el-tag v-if="props.row.status === 1" class="ml-2" type="success">有效</el-tag>
                            <el-tag v-else class="ml-2" type="danger">失效</el-tag>
                        </el-space>
                    </template>
                </el-table-column>
                <el-table-column prop="http_url" label="网址"/>
                <el-table-column label="操作" width="180px" algin="center">
                    <template #default="props">
                        <el-button type="primary" @click="changeLinks('update',props.row)" link >修改</el-button>
                        <el-popconfirm title="确认删除吗？" @confirm="methods.deleteData(props.row.id)">
                            <template #reference>
                                <el-button type="danger" link >删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination 
                class="links-pagination"
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
import customDialog from '@/components/customDialog'
import linksChangeModula from './modula/linksChangeModula'
import { useTable } from '@/hooks/useTable'



const { tableObject, methods } = useTable({
    url: {
        find: 'links/list',
        delete: 'links/delete'
    },
    pagination: true,
    isLoad: true
})

const changeLinks = (type = 'insert', row = {}) => {
    customDialog({
        title: type === 'insert' ? '新增' : '修改',
        modal: false,
        width: '50vw',
        component: linksChangeModula,
        componentProps: { type, row},
        open: (result) => {
            if (!result) return
            methods.loadData()
        }
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

.links-content{
    padding: 15px;
}
.links-pagination{
    margin-top: 15px;
    justify-content: end;
}
</style>
