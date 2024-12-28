<template>
	<div class="custom">
        <div class="custom-search">
            <ul>
                <li>
                    <span>名称：</span>
                    <el-input v-model="tableObject.params.name" />
                </li>
                <li>
                    <el-button type="primary" plain @click="methods.loadData">查询</el-button>
                </li>
            </ul>
            <el-button type="primary" @click="changeCustom('insert')" >新增</el-button>
        </div>
        <div class="custom-content">
            <el-table
                :border="true"
                :data="tableObject.tableList">
                <el-table-column type="index" label="序" :index="index => index + 1" width="60px"  align="center" />
                <el-table-column prop="name" label="标题" />
                <el-table-column prop="createDate" label="创建时间">
                    <template #default="props">
                        {{ new Date(props.row.createDate).toLocaleString() }}
                    </template>
                </el-table-column>
                <el-table-column prop="clicks" label="点击数" width="80px" align="center" />
                <el-table-column label="操作" width="180px"  align="center">
                    <template #default="props">
                        <el-button type="primary" @click="changeCustom('update',props.row)" link >修改</el-button>
                        <el-popconfirm title="确认删除吗？" @confirm="methods.deleteData(props.row.id)">
                            <template #reference>
                                <el-button type="danger" link >删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination 
                class="custom-pagination"
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
import CustomChangeModula from './modula/CustomChangeModula'
import { useTable } from '@/hooks/useTable'



const { tableObject, methods } = useTable({
    url: {
        find: 'custom/list',
        delete: 'custom/delete'
    },
    pagination: true,
    isLoad: true
})

const changeCustom = (type = 'insert', row = {}) => {
    customDialog({
        title: type === 'insert' ? '新增' : '修改',
        modal: false,
        width: '50vw',
        component: CustomChangeModula,
        componentProps: { type, row},
        open: (result) => {
            if (!result) return
            methods.loadData()
        }
    })
}


onBeforeMount(() => {
    tableObject.params.name = ''
})
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
.custom-search ul li>span{
    display: inline-block;
    width: 60px;
}

.custom-content{
    padding: 15px;
}
.custom-pagination{
    margin-top: 15px;
    justify-content: end;
}
</style>
