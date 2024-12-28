import service from './request'
import { blogUrl } from './baseUrl.cofing'

const timeoutNum = 6000 * 10

const request = (option) => {
  const { url, method, params, data, timeout} = option
  return service({
    baseURL: blogUrl,
    url: url,
    method,
    params,
    data,
    timeout
  })
}


export function httpFn(url, method, paramsOrData, timeout = timeoutNum) {
  return request({ method, url, ...paramsOrData , timeout })
}

export function getFn(url, params, timeout = timeoutNum) {
  return request({ method: 'get', url, params, timeout })
}

export function postFn(url, data, timeout = timeoutNum) {
  return request({ method: 'post', url, data, timeout })
}

export function deleteFn(url, data, timeout = timeoutNum) {
  return request({ method: 'delete', url, data, timeout })
}

export function putFn(url, data, timeout = timeoutNum) {
  return request({ method: 'put', url, data, timeout })
}
