// 管理本地资源

// get
export const getStorageItem = (key: string) => localStorage.getItem(key)


// set
export const setStorageItem = (key: string, value: string) => localStorage.setItem(key, value)

// delete
export const delStorageItem = (key: string) => localStorage.removeItem(key)

