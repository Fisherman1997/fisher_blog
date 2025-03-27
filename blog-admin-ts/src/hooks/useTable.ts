import { ElMessage } from 'element-plus'
import { reactive, watch, computed, unref, onMounted } from 'vue'
import { useAxios } from '@/hooks/useAxios'

interface IUrl {
    inset?: string
    update?: string
    delete?: string
    find?: string
}

interface ITableResult<T> {
    list: T[]
    total: number
}

interface IPagination {
    pageNum: number
    page: number
}

interface ITableConfig<TParams> {
    url: IUrl
    pagination?: boolean
    isLoad?: boolean
    RequestPreProcessing?: (params: TParams & Partial<IPagination>) => TParams
}

type DeleteId = string | number | Array<string | number>

interface TTableObject<T, TParams> {
    pageNum: number
    page: number
    total: number
    tableList: T[]
    params: TParams
    loading: boolean
    currentRow: T | null
}

export const useTable = <T, TParams extends object>({
    url,
    pagination = true,
    isLoad = true,
    RequestPreProcessing,
}: ITableConfig<TParams>) => {
    const { post, delete: reqDelete } = useAxios()

    const tableObject = reactive<TTableObject<T, TParams>>({
        pageNum: 10,
        page: 1,
        total: 10,
        tableList: [],
        params: {} as TParams,
        loading: false,
        currentRow: null,
    })

    // 当启用分页时，合并分页信息
    const paramsObj = computed(() => {
        if (pagination) {
            return {
                ...(tableObject.params as Record<string, unknown>),
                pageNum: tableObject.pageNum,
                page: tableObject.page,
            } as TParams & IPagination
        } else {
            return tableObject.params as TParams
        }
    })

    watch(
        () => tableObject.page,
        () => {
            methods.loadData()
        },
    )

    watch(
        () => tableObject.pageNum,
        () => {
            // 当前页不为1时，修改页数后会导致多次调用 loadData
            if (tableObject.page === 1) {
                methods.loadData()
            } else {
                tableObject.page = 1
            }
        },
    )

    onMounted(() => {
        if (isLoad) {
            methods.loadData()
        }
    })

    const methods = {
        loadData: async (): Promise<void> => {
            if (!url || !url.find) {
                ElMessage.warning('没有请求数据的url: “find”')
                return
            }
            // 请求前处理参数（如果存在）
            const params = RequestPreProcessing
                ? RequestPreProcessing(unref(paramsObj) as TParams & Partial<IPagination>)
                : unref(paramsObj)
            tableObject.loading = true
            try {
                const response = await post<ITableResult<T>, typeof params>(url.find, params)
                if (response && response.statusCode === 200) {
                    if (pagination) {
                        tableObject.tableList = response.result
                            .list as unknown as typeof tableObject.tableList
                        tableObject.total = response.result.total
                    } else {
                        tableObject.tableList =
                            response.result as unknown as typeof tableObject.tableList
                    }
                }
            } catch (error) {
                console.log(error)
            } finally {
                tableObject.loading = false
            }
        },
        deleteData: async (ids: DeleteId): Promise<void> => {
            if (!url || !url.delete) {
                ElMessage.warning('没有删除数据的url: “delete”')
                return
            }
            try {
                const response = await reqDelete(url.delete, { id: ids })
                if (response && response.statusCode === 200) {
                    ElMessage.success('删除成功')
                    await methods.loadData()
                }
            } catch (error) {
                // 可在此处处理错误
                console.log(error)
            }
        },
    }

    return {
        tableObject,
        methods,
    }
}
