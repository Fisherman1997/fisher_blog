import { getRouterList } from '@/api/login'

export interface IRouter {
    path: string
    name: string
    meta: object
    redirect?: string
    children?: IRouter[]
    component?: () => Promise<unknown>
}

interface ComponentModule {
    default: unknown
}

export interface IServiceRouter {
    children?: IServiceRouter[]
    component: string
    iconType: string
    id: number
    menu: number
    name: string
    path: string
    primary_id: number
    range: number
    redirect: string
    serialNumber: number
    status: number
    title: string
    contents: number
}
const modules = import.meta.glob('@/views/**/*.vue')
// console.log(modules)

// 格式化路由
const changeRouter = async (result: IServiceRouter[]) => {
    const routerList = result.map((item) => {
        const routerItem: IRouter = {
            path: '/admin' + item.path,
            name: item.name,
            meta: { title: item.title },
        }
        if (item.children && item.children.length) {
            if (item.redirect) routerItem.redirect = item.redirect
            else routerItem.redirect = item.children[0].path
            console.log(item.children)
            routerItem.children = item.children.map((citem) => {
                return <IRouter>{
                    path: '/admin' + citem.path,
                    name: citem.name,
                    meta: { title: citem.title },
                    component: () =>
                        modules[`/src/views${citem.component}.vue`]().then(
                            (mod) => (mod as ComponentModule).default,
                        ),
                }
            })
        } else {
            routerItem.component = () =>
                modules[`/src/views${item.component}.vue`]().then(
                    (mod) => (mod as ComponentModule).default,
                )
        }
        return routerItem
    })
    return <IRouter>{
        path: '/',
        name: 'one',
        meta: { title: '后台管理' },
        redirect: '/admin',
        children: [
            {
                path: '/admin',
                name: 'admin',
                meta: { title: '后台管理' },
                component: () => import('@/layout'),
                redirect: `${routerList[0].path}`,
                children: routerList,
            },
        ],
    }
}

export let storeRouter: IRouter[] = []

export const deleteStoreRouter = () => {
    storeRouter = []
}

export const navInfo = async (id: number) => {
    const { result } = await getRouterList(id)
    if (!result) return
    const list = await changeRouter(result)
    storeRouter.push(list)
}
