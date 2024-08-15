import { CoffeeOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';

export type MenuItem = {
    key: string;
    label: string;
    path?: string; // 可选，因为不是所有菜单项都有路径
    icon?: React.ReactNode;
    children?: MenuItem[]; // 可选，嵌套子菜单
};

// 菜单项配置
export const menuItems: MenuItem[] = [
    {
        key: 'customer_management',
        icon: <CoffeeOutlined />,
        label: '客户管理',
        children: [
            { key: 'customer_list', label: '客户列表', path: '/customer/list' },
            { key: 'customer_devices', label: '客户设备', path: '/customer/devices' },
            { key: 'execution_plan', label: '执行计划', path: '/customer/execution-plan' },
        ],
    },
    {
        key: 'operations_management',
        icon: <VideoCameraOutlined />,
        label: '运帷管理',
        children: [
            { key: 'operation_logs', label: '设备操作日志', path: '/operations/logs' },
            {
                key: 'protocol_management',
                label: '协议管理',
                path: '/operations/protocol'
            },
        ],
    },
    {
        key: 'system_admin',
        icon: <UploadOutlined />,
        label: '系统管理员',
        path: '/system/admin',
    },
    {
        key: 'my_account',
        icon: <UserOutlined />,
        label: '我的',
        children: [
            { key: 'profile', label: '基本资料', path: '/account/profile' },
            { key: 'change_password', label: '修改密码', path: '/account/change-password' },
        ],
    },
];