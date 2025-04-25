import { ElNotification } from 'element-plus'
import { getStorageItem, delStorageItem } from '@/utils/storage'
import { storeRouter, navInfo } from './router.store'
import { checkToken } from '@/api/login'
import type { Router, RouteRecordRaw } from 'vue-router'

// 修改网页标题
const changeDocumentTitle = (title: string) => {
    // console.log(process.env)
    document.title = title + '-' + import.meta.env.VITE_MASTER_TITLE
}

/*
 * 将多级的路由表转成由name组成的扁平化数组
 * @params list: 路由表
 * 暂时无用
const routerObjChangeArr = (list) => {
	return new Promise(resolve => {
		const result = []
		let len = list.length
		list.forEach(async element => {
			result.push(element.name)
			if (element.children && element.children.length) {
				const children = await routerObjChangeArr(element.children)
				result.push(...children)
				len += children.length
			}
			if (result.length === len) resolve(result)
		})
	})
}

*/

/*
 * 清除没权限的路由
 * @params router
 * @params userRouterList: 一个由路由name组成的数组
 * 暂时无用
const clearRuoter = async (router, userRouterList) => {
	const trueRouter = await routerObjChangeArr(userRouterList)
	const routerList = router.getRoutes()
	routerList.forEach(element => {
		if (WhiteList.includes(element.name) || trueRouter.includes(element.name)) return
		router.removeRoute(element.name)
	})
}

*/

const redirectWhite = ['/admin/login', '/admin/register']

export const setupBeforeEach = (router: Router) => {
    router.beforeEach(async (to, _from, next) => {
        // console.log(router.getRoutes())
        if (to.meta) changeDocumentTitle(to.meta.title as string)

        // 未登录状态，白名单路由直接通过
        if (!getStorageItem('token') && redirectWhite.includes(to.path)) return next()

        // 未登录状态访问非白名单路，跳转到登录页
        if (!getStorageItem('token')) {
            ElNotification.warning({
                title: '提示',
                message: '未登录，请登录',
            })
            next('/admin/login')
            return
        }

        // 已登录不可访问白名单路由，跳转主页 storeRoute是存在表示已近登录过
        if (storeRouter.length && redirectWhite.includes(to.path)) return next('/admin')

        // 已登录访问非白名单路由直接通过
        if (storeRouter.length) return next()

        // 访问服务器校验是否有成功登录 storeRouter不存在表示刷新了页面
        const userInfo = await checkToken()
        if (!userInfo || userInfo.statusCode !== 200) {
            delStorageItem('token')
            next({ path: '/admin/login' })
            return
        }

        // 获取路由
        await navInfo(userInfo.result.id as number)

        // 获取storeRouter后再检验一次访问的路由是否是白名单

        // 成功并跳转
        if (storeRouter && storeRouter.length) {
            router.addRoute(storeRouter[0] as RouteRecordRaw)
            if (storeRouter.length && redirectWhite.includes(to.path)) return next('/admin')
            next({ ...to, replace: true })
            return
        }

        ElNotification.error({
            title: '错误',
            message: '用户无任何权限,请联系管理员',
        })
        next({ path: '/admin/login' })
    })
}

export const setupAfterEach = (router: Router) => {
    router.afterEach(() => {})
}
