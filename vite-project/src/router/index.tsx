import { createBrowserRouter } from 'react-router-dom';
import Asic from '@/pages/Asic';
import MainPage from '@/pages/MainPage';
import ClientList from '@/pages/ClientList';
import React from 'react';
import { MenuItem, menuItems } from '../pages/Menu/menuItem'
// 定义页面组件映射
const pageComponents: { [key: string]: React.ComponentType } = {
    '/customer/list': ClientList, // 根据你的项目实际情况更新这些组件映射
    '/customer/devices': MainPage,
    '/customer/execution-plan': MainPage,
    '/operations/logs': MainPage,
    '/operations/protocol': MainPage,
    '/system/admin': MainPage,
    '/account/profile': MainPage,
    '/account/change-password': MainPage,
};

// 递归转换菜单项为路由项
const convertMenuItemsToRoutes: any = (items: MenuItem[]) => {
    return items.flatMap(item => {
        if (item.children) {
            return convertMenuItemsToRoutes(item.children);
        }

        if (item.path) {
            return {
                path: item.path,
                element: React.createElement(pageComponents[item.path] || MainPage),
            };
        }
        return [];
    });
};

// 生成路由
export const globalRouters = createBrowserRouter([
    {
        path: '/',
        element: <Asic />,
        children: [
            ...convertMenuItemsToRoutes(menuItems),
        ],
    },
]);


