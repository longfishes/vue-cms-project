import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('../components/LoginPart')
    },
    {
      path: '/register',
      name: 'register',
        component: () => import('../components/RegisterPart')
    },

    {
        path: '/index',
        name: 'index',
        component: () => import ('../components/IndexVue'),
        children: [
            {
                path: '/Home',
                name: 'home',
                meta: {
                  title: '首页'
                },
                component: () => import('../components/HomeVue')
            },
            {
                path: '/worker',
                name: 'worker',
                meta: {
                    title: '工作人员管理'
                },
                component: () => import('../components/worker/WorkerManage')
            },
            {
                path: '/User',
                name: 'user',
                meta: {
                    title: '用户'
                },
                component: () => import('../components/user/UserPage')
            },
            {
                path: '/Admin',
                name: 'admin',
                meta: {
                    title: '管理员用户管理'
                },
                component: () => import('../components/admin/AdminPage')
            },
            {
                path: '/More',
                name: 'more',
                meta: {
                    title: '更多'
                },
                component: () => import('../components/more/MorePage')
            },
            {
                path: '/Self',
                name: 'self',
                meta: {
                    title: '个人中心'
                },
                component: () => import('../components/self/SelfCenter')
            },
            {
                path: '/Signed',
                name: 'signed',
                meta: {
                    title: '已报名'
                },
                component: () => import('../components/SignedForm')
            },
        ]

    },

    // {
    //     path: '/about',
    //     name: 'about',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    // }
]

const router = new VueRouter({
    mode: 'history',
    routes
})
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}
export default router
