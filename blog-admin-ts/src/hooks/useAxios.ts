import service from '@/utils/request'

const timeoutNum = import.meta.env.VITE_HTTP_TIMEOUT

type TMethod = 'GET' | 'POST' | 'DELETE' | 'PUT'

enum TStatusCode {
    Success = 200,
    Error = 500,
}

interface IResponse<T> {
    remarks: string
    result: T
    statusCode: TStatusCode
}

interface IRequestOption<TParams, TData> {
    url: string
    method: TMethod
    params?: TParams
    data?: TData
    timeout?: number
}

const request = <T, TParams = never, TData = never>({
    url,
    method,
    params,
    data,
    timeout,
}: IRequestOption<TParams, TData>) => {
    return service<TParams | TData, IResponse<T>>({
        url,
        method,
        params,
        data,
        timeout,
    })
}

const getFn = <TResult, TParams = never>(url: string, params?: TParams, timeout = timeoutNum) => {
    return request<TResult, TParams>({ method: 'GET', url, params, timeout })
}

const postFn = <TResult, TData = never>(url: string, data?: TData, timeout = timeoutNum) => {
    return request<TResult, never, TData>({ method: 'POST', url, data, timeout })
}

const deleteFn = <TResult, TData>(url: string, data?: TData, timeout = timeoutNum) => {
    return request<TResult, never, TData>({ method: 'DELETE', url, data, timeout })
}

const putFn = <TResult, TData = never>(url: string, data?: TData, timeout = timeoutNum) => {
    return request<TResult, never, TData>({ method: 'PUT', url, data, timeout })
}

export const useAxios = () => {
    return {
        get: getFn,
        post: postFn,
        delete: deleteFn,
        put: putFn,
        http: request,
    }
}
