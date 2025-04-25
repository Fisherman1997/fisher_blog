<template>
    <div class="QuickTable-manage ovHidden-H100">
        <!-- 搜索区域 -->
        <div
            v-if="QuickTableProps.isSearch && QuickTableProps.search?.length"
            class="QuickTable-search"
        >
            <el-form :model="tableObject.params" style="width: 100%" @submit.prevent>
                <el-row :gutter="15">
                    <template v-for="item in QuickTableProps.search" :key="item.key">
                        <el-col
                            v-if="item.type === 'input'"
                            :xs="12"
                            :sm="8"
                            :md="6"
                            :lg="4"
                            :xl="3"
                        >
                            <el-form-item :label="item.label" :prop="<string>item.key">
                                <el-input
                                    v-if="item.changeLoad"
                                    v-model="tableObject.params[item.key]"
                                    :placeholder="item.label"
                                    clearable
                                    @keydown="
                                        (ev: Event | KeyboardEvent) =>
                                            (ev as KeyboardEvent).key === 'Enter' &&
                                            methods.loadData()
                                    "
                                />
                                <el-input
                                    v-else
                                    v-model="tableObject.params[item.key]"
                                    :placeholder="item.label"
                                    clearable
                                />
                            </el-form-item>
                        </el-col>
                        <el-col
                            v-if="item.type === 'select'"
                            :xs="12"
                            :sm="8"
                            :md="6"
                            :lg="4"
                            :xl="3"
                        >
                            <el-form-item label="分类" :prop="<string>item.key">
                                <el-select
                                    v-if="item.changeLoad"
                                    v-model="tableObject.params[item.key]"
                                    clearable
                                    placeholder="选择分类"
                                    @change="methods.loadData"
                                >
                                    <!-- <el-option key="全部" label="全部" value="全部" /> -->
                                    <template v-if="item.select!.length">
                                        <el-option
                                            v-for="citem in item.select"
                                            :key="citem.id"
                                            :label="citem.name"
                                            :value="citem.id"
                                        />
                                    </template>
                                </el-select>
                                <el-select
                                    v-else
                                    v-model="tableObject.params[item.key]"
                                    clearable
                                    placeholder="选择分类"
                                >
                                    <!-- <el-option key="全部" label="全部" value="全部" /> -->
                                    <template v-if="item.select!.length">
                                        <el-option
                                            v-for="citem in item.select"
                                            :key="citem.id"
                                            :label="citem.name"
                                            :value="citem.id"
                                        />
                                    </template>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </template>
                    <el-col :xs="4" :sm="4" :md="3" :lg="2" :xl="1">
                        <el-form-item>
                            <el-button type="primary" plain @click="methods.loadData"
                                >查询</el-button
                            >
                        </el-form-item>
                    </el-col>
                    <template v-for="item in QuickTableProps.search" :key="item.key">
                        <el-col
                            v-if="item.type === 'button'"
                            :xs="4"
                            :sm="4"
                            :md="3"
                            :lg="2"
                            :xl="1"
                        >
                            <el-form-item>
                                <el-button
                                    :type="item.color || ''"
                                    @click="handleSearch(item.handle!)"
                                    >{{ item.label }}</el-button
                                >
                            </el-form-item>
                        </el-col>
                    </template>
                </el-row>
            </el-form>
            <!-- <ul>
                <li v-for="item in search" :key="item.key">
                    <span>{{ item.label }}：</span>
                    <component
                        :is="searchComponents[item.type] || 'el-input'"
                        v-model="tableObject.params[item.key]"
                    />
                </li>
                <li></li>
            </ul> -->
        </div>

        <!-- 表格区域 -->
        <div class="QuickTable-content" :style="styleObject">
            <el-table
                style="height: calc(100% - 40px)"
                :border="true"
                order="true"
                :data="tableObject.tableList"
                :size="QuickTableProps.tableSize || ''"
            >
                <el-table-column
                    type="index"
                    label="序"
                    :index="(index) => index + 1"
                    width="60px"
                    align="center"
                />
                <template v-for="item in QuickTableProps.columns" :key="item.prop">
                    <!-- 普通文本列 -->
                    <el-table-column
                        v-if="item.type === 'string'"
                        :prop="<string>item.prop"
                        :label="item.label"
                        :width="item.width"
                        :align="item.align"
                    />

                    <!-- 长文本列 -->
                    <el-table-column
                        v-else-if="item.type === 'langtext'"
                        :prop="<string>item.prop"
                        :label="item.label"
                        :width="item.width"
                        :align="item.align"
                    >
                        <template #default="{ row }">
                            <el-text truncated>{{ row[item.prop as string] }}</el-text>
                        </template>
                    </el-table-column>

                    <!-- 自定义 -->
                    <el-table-column
                        v-else-if="item.type === 'custom'"
                        :prop="<string>item.prop"
                        :label="item.label"
                        :width="item.width"
                        :align="item.align"
                    >
                        <template #default="{ row }">
                            <component :is="item.customFun!(row)" />
                        </template>
                    </el-table-column>

                    <!-- 时间列（支持动态字段） -->
                    <el-table-column
                        v-else-if="item.type === 'time'"
                        :prop="<string>item.prop"
                        :label="item.label"
                        :width="item.width"
                        :align="item.align"
                    >
                        <template #default="{ row }">
                            {{ formatDate(row[item.prop!]) }}
                        </template>
                    </el-table-column>

                    <!-- 操作列 -->
                    <el-table-column
                        v-else-if="item.type === 'edit'"
                        label="操作"
                        :width="item.width"
                        :align="item.align"
                    >
                        <template #default="{ row }">
                            <template v-for="citem in item.edit" :key="citem.title">
                                <el-button
                                    v-if="citem?.type === 'button'"
                                    type="primary"
                                    @click="handleTable(citem.handle!, row)"
                                    link
                                >
                                    {{ citem.title }}
                                </el-button>
                                <el-popconfirm
                                    v-else-if="citem.type === 'popconfirm'"
                                    :title="citem.message || '确认执行该操作？'"
                                    @confirm="handleTable(citem.handle!, row)"
                                >
                                    <template #reference>
                                        <el-button type="danger" link>{{ citem.title }}</el-button>
                                    </template>
                                </el-popconfirm>
                                <el-popconfirm
                                    v-else-if="citem.type === 'delete'"
                                    :title="citem.message || '确认执行该操作？'"
                                    @confirm="methods.deleteData(row.id)"
                                >
                                    <template #reference>
                                        <el-button type="danger" link>删除</el-button>
                                    </template>
                                </el-popconfirm>
                            </template>
                        </template>
                    </el-table-column>
                </template>
            </el-table>

            <!-- 分页 -->
            <el-pagination
                v-if="QuickTableProps.isPagination"
                class="QuickTable-pagination"
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

<script setup lang="ts" generic="P">
import { useTable } from '@/hooks/useTable.js'
import { reactive } from 'vue'
import type { JSX } from 'vue/jsx-runtime'
// import { onMounted, ref } from 'vue'

export interface IQuickTableColumn<P> {
    type: 'string' | 'time' | 'edit' | 'langtext' | 'custom'
    prop?: keyof P
    label: string
    edit?: {
        type: 'button' | 'popconfirm' | 'delete'
        title: string
        message?: string
        handle?: (row?: P) => Promise<unknown | boolean> // 返回一个布尔值，true刷新表格，false则不刷新
    }[]
    width?: `${string}px`
    align: 'center' | 'left' | 'right'
    customFun?: (row: P) => JSX.Element
}

export interface ITableApiUrl {
    find: string
    delete?: string
}

export interface IQuickTableProps<P> {
    requestUrl: ITableApiUrl
    isSearch?: boolean
    columns: IQuickTableColumn<P>[]
    isPagination?: boolean
    search?: {
        type: 'input' | 'button' | 'select'
        color?: '' | 'text' | 'default' | 'success' | 'warning' | 'info' | 'primary' | 'danger'
        label: string
        key: keyof P | string
        handle?: () => Promise<unknown | boolean> // 返回一个布尔值，true刷新表格，false则不刷新
        select?: { id: number | string; name: string }[]
        changeLoad?: boolean
    }[]
    tableMaxWidth?: `${number}px`
    tableMinWidth?: `${number}px`
    tableSize?: '' | 'large' | 'default' | 'small'
    tableIsLoad?: boolean
}

const { QuickTableProps } = defineProps<{ QuickTableProps: IQuickTableProps<P> }>()
const { tableObject, methods } = useTable<P, never>({
    url: {
        find: QuickTableProps.requestUrl.find,
        delete: QuickTableProps.requestUrl.delete,
    },
    pagination: QuickTableProps.isPagination,
    isLoad: typeof QuickTableProps.tableIsLoad === 'undefined' ? true : QuickTableProps.tableIsLoad,
})

const styleObject = reactive({
    maxWidth: QuickTableProps.tableMaxWidth || 'none',
    minWidth: QuickTableProps.tableMinWidth || 'auto',
})

const handleSearch = (handle: () => Promise<unknown | boolean>) => {
    handle().then((data) => {
        if (typeof data !== 'boolean') return
        if (data) methods.loadData()
    })
}

const handleTable = (handle: (row?: P) => Promise<unknown | boolean>, row: P) => {
    handle(row).then((data) => {
        if (typeof data !== 'boolean') return
        if (data) methods.loadData()
    })
}

// const handleKeyUp = (ev: Event | KeyboardEvent) => {
//     if ((ev as KeyboardEvent).key === 'Enter') methods.loadData()
// }

/** 兼容搜索类型的输入框 */
// const searchComponents = ref({
//     input: 'el-input',
//     button: 'el-button',
// })

/** 处理时间格式 */
const formatDate = (value?: string | number | Date) => {
    if (!value) return '-'
    return new Date(value).toLocaleString().replace(/\//g, '-')
}
</script>

<style scoped>
.QuickTable-manage {
    display: flex;
    flex-direction: column;
}
.QuickTable-search {
    display: flex;
    /* justify-content: space-between; */
    width: calc(100% - 30px);
    align-items: center;
    padding: 20px 15px;
    margin-bottom: 20px;
    border-bottom: 1px solid rgb(216, 216, 216);
}
.QuickTable-search ul {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.QuickTable-search ul li {
    display: flex;
    margin-right: 20px;
    align-items: center;
}
.QuickTable-search ul li > span {
    display: inline-block;
    text-align: right;
    width: 95px;
}

.QuickTable-content {
    flex: 1;
    overflow: hidden;
    padding: 15px;
}
.QuickTable-pagination {
    margin-top: 15px;
    justify-content: end;
}
</style>
