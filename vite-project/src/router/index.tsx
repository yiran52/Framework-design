import { createHashRouter, Navigate } from 'react-router-dom'
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import Account from '@/pages/Account'

// 全局路由
export const globalRouters = createHashRouter([
    // 对精确匹配"/login"，跳转Login页面
    {
        path: '/login',
        element: <Login />,
    },
    // 精确匹配"/home"，跳转Home页面
    {
        path: '/home',
        element: <Home />,
    },
    // 精确匹配"/account"，跳转Account页面
    {
        path: '/account',
        element: <Account />,
    },
    // 如果URL没有"#路由"，跳转Home页面
    {
        path: '/',
        element: <Home />,
    },
    // 未匹配，，跳转Login页面
    {
        path: '*',
        element: <Navigate to="/login" />,
    },
])

