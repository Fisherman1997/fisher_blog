// 管理本地资源

// get
export const getStorageItme = key => JSON.parse(localStorage.getItem(key))


// set
export const setStorageItme = (key, value) => localStorage.setItem(key, JSON.stringify(value))

// delete
export const delStorageItme = key => localStorage.removeItem(key)

