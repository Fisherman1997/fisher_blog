import { ref, reactive } from 'vue'
import { useAxios } from '@/hooks/useAxios'
import { useLoading } from '@/hooks/useLoading'
import type { FormInstance, FormItemRule, FormRules } from 'element-plus'
import type { Arrayable } from 'element-plus/es/utils/typescript.mjs'

type IRulesValue<T> = {
    [P in keyof T]?: FormRules[number][]
}
// 📌 添加请求参数类型约束
export interface RequestParams<T> {
    url: string
    element: T
}

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
export const useForm = <T extends object>(
    formDataValue: T,
    rulesValue?: IRulesValue<T>,
    // rulesValue?: Partial<Record<string, Arrayable<FormItemRule>>>,
) => {
    const { post } = useAxios()
    const [startLoading, stopLoading] = useLoading()
    const rules = rulesValue as Partial<Record<string, Arrayable<FormItemRule>>>
    const formData = reactive(formDataValue)
    const formRef = ref<FormInstance>()

    /**
     *
     * @param {*} formEl ---> form: ref
     * @param {*} paramsFun ---> type fun 处理请求前的一些拦截或其他逻辑，返回值必须是：{url: 请求url , element: 请求入参}
     * @param {*} resultFun ---> type fun 请求成功的处理逻辑
     * @returns void
     */
    const submitForm = async (
        formEl: typeof formRef.value,
        paramsFun: () => Promise<RequestParams<T> | void>,
        resultFun: (param: boolean) => void,
    ) => {
        if (!formEl) return

        formEl.validate(async (valid) => {
            if (valid) {
                startLoading()
                const params = await paramsFun()
                if (!params) return
                const result = await post(params.url, params.element).finally(stopLoading)
                if (result && result.statusCode === 200) {
                    resultFun(true)
                } else {
                    resultFun(false)
                }
            }
        })
    }

    // 📌 添加严格的 key 类型约束
    const formDataSet = <K extends keyof T>(key: K, value: T[K]) => {
        ;(formData as T)[key] = value
    }

    return {
        formData,
        formRef,
        rules,
        submitForm,
        formDataSet,
    }
}
