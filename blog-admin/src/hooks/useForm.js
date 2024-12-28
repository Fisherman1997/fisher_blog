import { ref, reactive } from 'vue'
import { useAxios } from '@/hooks/useAxios'
import { useLoading } from '@/hooks/useLoading'


/**
 * 
 * @param {*} formDataValue type object
 * @param {*} rulesValue  type object
 * @returns 
 *       formData --->form:model
 *       rules ---> form:rules
 *       formRefs ---> form:ref
 *       ubmitForm  form:validate
 */
export const useForm = (formDataValue = {}, rulesValue = {}) => {
    const { post } = useAxios()
    const [ startLoading, stopLoading ] = useLoading()
    const rules = rulesValue
    const formData = reactive({...formDataValue})
    const formRef = ref()

    /**
     * 
     * @param {*} formEl ---> form: ref
     * @param {*} paramsFun ---> type fun 处理请求前的一些拦截或其他逻辑，返回值必须是：{url: 请求url , element: 请求入参}
     * @param {*} resultFun ---> type fun 请求成功的处理逻辑
     * @returns void
     */
    const submitForm = async (formEl,paramsFun, resultFun) => {
        if (!formEl) return

        formEl.validate(async valid => {
            if (valid) {
                startLoading()
                const params = await paramsFun()
                if (!params) return
                const result = await post(params.url,params.element).finally(stopLoading)
                if (result && result.statusCode === 200) {
                    resultFun(true)
                } else {
                    resultFun(false)
                }
            }
        })
    }

    const formDataSet = (key, value) => {
        formData[key] = value
    }

    return {
        formData,
        formRef,
        rules,
        submitForm,
        formDataSet
    }
}