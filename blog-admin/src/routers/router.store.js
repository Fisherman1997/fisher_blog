import { getRouterList } from '@/api/login'


// 格式化路由
const changeRouter = async (result) => {
	const routerList = result.map(item => {
		const routerItem = {
			path: '/admin' + item.path,
			name: item.name,
			meta: {title: item.title}
		}
		if (item.children && item.children.length) {
			if (item.redirect) routerItem.redirect = item.redirect
			else routerItem.redirect = item.children[0].path
			routerItem.children = item.children.map(citem => {
				return {
					path: '/admin' + citem.path,
					name: citem.name,
					meta: { title: citem.title },
					component: () => import(`@/views${citem.component}`)
				}
			})
		} else {
			routerItem.component = () => import(`@/views${item.component}`)
		}
		return routerItem
	})
	return {
		path: '/',
		name: 'one',
		meta: { title:'后台管理' },
		redirect: "/admin",
		children: [
			{
				path: '/admin',
				name: 'admin',
				meta: { title:'后台管理' },
				component: () => import('@/layout'),
				redirect: `${routerList[0].path}`,
				children: routerList
			}
		]
	}
}


export let storeRouter = []


export const deleteStoreRouter = () => {
	storeRouter = []
}


export const navInfo = async (id) => {
    const { result } = await getRouterList(id)
    if (!result) return
    const list = await changeRouter(result)
    storeRouter.push(list)
}
