import service from '@/utils/request.js'

const timeoutNum = 6000 * 10

const request = (option) => {
  const { url, method, params, data, timeout} = option
  return service({
    url: url,
    method,
    params,
    data,
    timeout
  })
}


function httpFn(url, method, paramsOrData, timeout = timeoutNum) {
  return request({ method, url, ...paramsOrData , timeout })
}

function getFn(url, params, timeout = timeoutNum) {
  return request({ method: 'get', url, params, timeout })
}

function postFn(url, data, timeout = timeoutNum) {
  return request({ method: 'post', url, data, timeout })
}

function deleteFn(url, data, timeout = timeoutNum) {
  return request({ method: 'delete', url, data, timeout })
}

function putFn(url, data, timeout = timeoutNum) {
  return request({ method: 'put', url, data, timeout })
}

export const useAxios = () => {
  return {
    get: getFn,
    post: postFn,
    delete: deleteFn,
    put: putFn,
    http: httpFn
  }
}
