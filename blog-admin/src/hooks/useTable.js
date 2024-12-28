import { ElMessage } from 'element-plus'
import { reactive, watch, computed, unref, onMounted } from 'vue'
import { useAxios } from '@/hooks/useAxios'

/**
 * 
 * @param {*} config {
 *      url: 请求的url type object:    inset | update | delete | find,
 *      pagination： 是否分页 type boolen，
 * 		isLoad: 使用自动首次加载 type boolen
 * 		RequestPreProcessing: (params)	=> params  // 请求前处理
 * }
 * @returns 
 */
export const useTable = (config) => {
	const { post, delete: reqDelete } = useAxios()
	const tableObject = reactive({
		// 页数
		pageNum: 10,
		// 当前页
		page: 1,
		// 总条数
		total: 10,
		// 表格数据
		tableList: [],
		// AxiosConfig 配置
		params: {},
		// 加载中
		loading: true,
		// 当前行的数据
		currentRow: null
	})

	const paramsObj = computed(() => {
		if(config.pagination) return {
		...tableObject.params,
		pageNum: tableObject.pageNum,
		page: tableObject.page
		}
		else return { ...tableObject.params }
	})

	watch(
		() => tableObject.page,
		() => {
			methods.loadData()
		}
	)

	watch(
		() => tableObject.pageNum,
		() => {
		// 当前页不为1时，修改页数后会导致多次调用getList方法
		if (tableObject.page === 1) {
			methods.loadData()
		} else {
			tableObject.page = 1
			// methods.loadData()
		}
		}
	)
	onMounted(() => {
		if(config.isLoad) methods.loadData()
	})
	const methods = {
		loadData: async () => {
			// 请求数据
			if (!config.url && !config.url.find) return ElMessage.warning('没有请求数据的url: “find”')
			const params = config.RequestPreProcessing ? config.RequestPreProcessing(unref(paramsObj)) : unref(paramsObj)
			tableObject.loading = true
			const data = await post(config.url.find,params).finally(() => tableObject.loading = false)
			if (data && data.statusCode === 200) {
				if (config.pagination) {
					tableObject.tableList = [...data.result.list]
					tableObject.total = data.result.total
				}
				else tableObject.tableList = [...data.result]
			}
		},
		// 删除数据
		deleteData: async (ids) => {
			// 删除表格数据
			if (!config.url && !config.url.delete) return ElMessage.warning('没有删除数据的url: “delete”') 
			const data = await reqDelete(config.url.delete,{id: ids})
			if (data && data.statusCode === 200) {
				ElMessage.success('删除成功')
				methods.loadData()
			}
		}
	}

	// const requestPreProcessing = (params) => params
	return {
		tableObject,
		methods
	}
}
