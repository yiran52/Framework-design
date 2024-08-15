import React, { useState } from 'react';
import { Table, Button, Input, Form, Space, Pagination } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './index.module.less'
interface Customer {
    key: string;
    name: string;
    deviceCount: number;
    phone: string;
    address: string;
    addedTime: string;
}

const initialData: Customer[] = [
    { key: '1', name: 'sy3', deviceCount: 0, phone: '32000156460', address: '0', addedTime: '2023-10-19 15:19:55' },
    { key: '2', name: 'sy2', deviceCount: 0, phone: '32000156459', address: '0', addedTime: '2023-10-19 15:17:45' },
    { key: '3', name: 'sy1', deviceCount: 0, phone: '32000156458', address: '0', addedTime: '2023-10-19 15:16:13' },
    { key: '4', name: 'hh', deviceCount: 0, phone: '32000156457', address: 'yq', addedTime: '2023-10-19 15:13:57' },
    { key: '5', name: 'wg', deviceCount: 0, phone: '32000156453', address: 'wg', addedTime: '2023-10-19 15:05:51' },
    { key: '6', name: 'HBMS', deviceCount: 0, phone: '32000156451', address: 'aili', addedTime: '2023-10-19 12:26:47' },
    { key: '7', name: '华北模块', deviceCount: 11, phone: '13522857725', address: '暂无', addedTime: '2022-01-20 18:03:21' },
];

const CustomerTable: React.FC = () => {
    const [data, setData] = useState(initialData);
    const [form] = Form.useForm();

    const columns = [
        {
            title: '客户名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '设备数量',
            dataIndex: 'deviceCount',
            key: 'deviceCount',
            render: (text: number) => <a>{text}</a>,
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '地址',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '添加时间',
            dataIndex: 'addedTime',
            key: 'addedTime',
        },
        {
            title: '操作',
            key: 'action',
            render: (_: any, record: Customer) => (
                <Space size="middle">
                    <Button type="primary" icon={<EditOutlined />}>
                        编辑
                    </Button>
                    <Button type="default" icon={<PlusOutlined />}>
                        绑定设备
                    </Button>
                    <Button type="primary" danger icon={<DeleteOutlined />}>
                        删除
                    </Button>
                </Space>
            ),
        },
    ];

    const handleSearch = () => {
        const values = form.getFieldsValue();
        const filteredData = initialData.filter(item => item.phone.includes(values.phone));
        setData(filteredData);
    };

    return (
        <div className={styles.container}>
            <Form layout="inline" form={form} className={styles.searchForm}>
                <Form.Item name="phone">
                    <Input placeholder="按客户手机号搜索" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={handleSearch}>
                        查询
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button>重置</Button>
                </Form.Item>
                <Form.Item>
                    <Button type="primary">+ 添加</Button>
                </Form.Item>
            </Form>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    total: data.length,
                    showTotal: total => `共 ${total} 条`,
                    pageSize: 10,
                    showQuickJumper: true,
                }}
            />
        </div>
    );
};

export default CustomerTable;
