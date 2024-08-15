import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import type { SelectInfo } from 'rc-menu/lib/interface';
import { MenuItem, menuItems } from '@/pages/Menu/menuItem'
const { Header, Sider, Content } = Layout;


const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    // 处理菜单选择
    const handleMenuSelect = (e: SelectInfo) => {
        const selectedItem = findMenuItemByKey(e.key, menuItems);
        if (selectedItem && selectedItem.path) {
            navigate(selectedItem.path);
        }
    };

    // 递归查找菜单项的路径
    const findMenuItemByKey = (key: string, items: any[]): MenuItem | null => {
        for (let item of items) {
            if (item.key === key) {
                return item;
            }
            if (item.children) {
                const childItem = findMenuItemByKey(key, item.children);
                if (childItem) {
                    return childItem;
                }
            }
        }
        return null;
    };

    // 查找路径对应的菜单项及其所有父级菜单项
    const findMenuItemHierarchyByPath = (path: string, items: MenuItem[]): MenuItem[] | null => {
        for (let item of items) {
            if (item.path === path) {
                return [item];
            }
            if (item.children) {
                const childHierarchy = findMenuItemHierarchyByPath(path, item.children);
                if (childHierarchy) {
                    return [item, ...childHierarchy];
                }
            }
        }
        return null;
    };

    // 根据当前路径生成面包屑
    const generateBreadcrumbs = (): React.ReactNode[] => {
        const location = useLocation();
        const paths = location.pathname.split('/').filter(path => path);
        let breadcrumbs: React.ReactNode[] = [];
        let accumulatedPath = '';

        paths.forEach((path, index) => {
            accumulatedPath += `/${path}`;
            const hierarchy = findMenuItemHierarchyByPath(accumulatedPath, menuItems);
            if (hierarchy) {
                hierarchy.forEach(item => {
                    if (!breadcrumbs.some(breadcrumb => React.isValidElement(breadcrumb) && breadcrumb.key === item.key)) {
                        breadcrumbs.push(
                            <Breadcrumb.Item key={item.key}>
                                {item.label}
                                {index < paths.length - 1 && ' / '} {/* 手动插入分隔符 */}
                            </Breadcrumb.Item>
                        );
                    }
                });
            }
        });

        return breadcrumbs;
    };
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} style={{ height: '100vh' }}>
                <div style={{ padding: '16px', color: 'rgba(255, 255, 255, 0.65)', textAlign: 'center', fontSize: '16px', fontWeight: 300 }}>
                    {collapsed ? null : 'ASIC智能设备管理'}
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['customer_list']}
                    onSelect={handleMenuSelect}
                    items={menuItems}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: 'rgba(0, 0, 0, 0.85)' }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Breadcrumb style={{ margin: '16px 16px' }}>
                    {generateBreadcrumbs()}
                </Breadcrumb>
                <Content
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                        background: 'white',
                        borderRadius: 10,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;
