// 管理本地资源

// get
export const getStorageItme = key => localStorage.getItem(key)


// set
export const setStorageItme = (key, value) => localStorage.setItem(key, value)

// delete
export const delStorageItme = key => localStorage.removeItem(key)

