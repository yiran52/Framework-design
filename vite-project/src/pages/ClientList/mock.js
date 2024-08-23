import Mock from 'mockjs';

// 模拟客户数据
const generateMockData = () => {
    const data = Mock.mock({
        'customers|10': [
            {
                'key|+1': 1,
                name: '@name',
                'deviceCount|0-100': 1,
                phone: /32000[0-9]{5}/,
                address: '@city',
                addedTime: '@datetime',
            },
        ],
    }).customers;

    localStorage.setItem('customers', JSON.stringify(data));
};

// 初始化数据
if (!localStorage.getItem('customers')) {
    generateMockData();
}

// Mock 端点
Mock.mock('/api/customers', 'get', () => {
    const customers = JSON.parse(localStorage.getItem('customers'));
    return { data: customers };
});

Mock.mock('/api/saveCustomers', 'post', (options) => {
    const newCustomers = JSON.parse(options.body);
    localStorage.setItem('customers', JSON.stringify(newCustomers));
    return { message: '保存成功' };
});
