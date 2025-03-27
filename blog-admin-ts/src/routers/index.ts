import { createRouter, createWebHistory } from 'vue-router'
import { setupBeforeEach, setupAfterEach } from './router.guard.js'

// const LayoutContent = () => import('@/layout/index.js')
const LoginAndRegister = () => import('@/views/login/index.vue')
const configureRouter = [
    {
        path: '/admin/login',
        name: 'login',
        meta: { title: '登录' },
        component: LoginAndRegister,
    },
    {
        path: '/admin/register',
        name: 'register',
        meta: { title: '注册' },
        component: LoginAndRegister,
    },
    {
        path: '/admin/:pathMatch(.*)*',
        name: 'NotFound',
        meta: { title: '加载中' },
        component: () => import('@/views/error/NotFoundLogin.vue'),
    },
    {
        path: '/admin/404',
        name: '404',
        meta: { title: '找不到该页面' },
        component: () => import('@/views/error/404.vue'),
    },
]

export const WhiteList = ['login', 'register', 'admin']

// 测试用 假数据
export const asyncRouter = [
    {
        path: '/home',
        name: 'home',
        title: '首页',
        component: '/home/index',
        range: 2,
        menu: 0,
        iconType: 'House',
    },
    {
        path: '/routingManage',
        name: 'routingManage',
        title: '路由管理',
        component: '/routingManage/index',
        range: 2,
        menu: 0,
        iconType: 'Connection',
    },
    {
        path: '/userManage',
        name: 'userManage',
        title: '用户管理',
        component: '/userManage/index',
        range: 2,
        menu: 0,
        iconType: 'Connection',
    },
    // {
    //     path: '/123456',
    //     name: '123456',
    //     title: '路由管理',
    //     component: '/routingManage/index',
    //     range: 2,
    //     menu: 0,
    //     iconType: 'Connection',
    //     children:[
    //         {
    //             path: '/123456789',
    //             name: '/123456789',
    //             title: '路由管理',
    //             component: '/routingManage/index',
    //             range: 2,
    //             menu: 0,
    //             iconType: 'Connection',
    //         }
    //     ]
    // }
]

const router = createRouter({
    history: createWebHistory(),
    routes: configureRouter,
})

// 路由守卫,鉴权
setupBeforeEach(router)
setupAfterEach(router)

// router.addRoute()

export default router
