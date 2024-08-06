import { createBrowserRouter } from 'react-router-dom'
import MainPage from '@/pages/MainPage'
import HomePage from '@/pages/HomePage'
// 全局路由
export const globalRouters = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
        children: [
            {
                path: 'main',
                element: <MainPage />,
            },
            {
                path: 'personal',
                element: <HomePage />,
            },
            {
                path: 'setting',
                element: <MainPage />,
            },
        ]
    },

])

