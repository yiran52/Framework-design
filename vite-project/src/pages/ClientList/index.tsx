import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Form, Space, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import styles from './index.module.less';
import { Customer } from './interface'
import useModel from './useModel'
import AddCustomerModal from './AddCustomerModal'
const ClientList: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
    const [form] = Form.useForm();
    const { showModal, hideModal } = useModel()

    // 获取客户数据
    const { run: fetchCustomers, loading, refresh: customerrefresh } = useRequest(() =>
        fetch('/afterapi/blue-admin/api/rpc/user').then(res => {
            let data = res.json()
            console.log(1111, data)
            return data
        }), {
        manual: true,
        onSuccess: (result) => {
            setCustomers(result.data);
            setFilteredCustomers(result.data);
        }
    }
    );

    // 添加客户数据
    const { run: saveCustomer } = useRequest((newCustomer) =>
        fetch('/api/addCustomer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCustomer),
        }).then(res => res.json()), {
        manual: true,
        onSuccess: () => {
            customerrefresh();
            hideModal()
        },
        onError: (error) => {
            // 请求失败后执行的回调
            message.error('添加失败，请重试:' + error);

        },
    }
    );

    // 编辑客户数据
    const { run: updateCustomer } = useRequest((updatedCustomer) =>
        fetch(`/api/editCustomer/${updatedCustomer.key}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCustomer),
        }).then(res => res.json()), {
        manual: true,
        onSuccess: customerrefresh,
    }
    );

    // 删除客户数据
    const { run: removeCustomer } = useRequest((key) =>
        fetch(`/api/deleteCustomer/${key}`, {
            method: 'DELETE',
        }).then(res => res.json()), {
        manual: true,
        onSuccess: customerrefresh,
    }
    );

    useEffect(() => {
        fetchCustomers();
    }, []);

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
            render: (text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined) => <a>{text}</a>,
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
            render: (_: any, record: { key: any; }) => (
                <Space size="middle">
                    <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
                        编辑
                    </Button>
                    <Button type="default" icon={<PlusOutlined />}>
                        绑定设备
                    </Button>
                    <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.key)}>
                        删除
                    </Button>
                </Space>
            ),
        },
    ];

    const handleSearch = () => {
        fetchCustomers()
        const values = form.getFieldsValue();
        const filteredData = customers.filter((item) =>
            item.phone.includes(values.phone)
        );
        setFilteredCustomers(filteredData);
    };

    const handleDelete = (key: any) => {
        removeCustomer(key);
    };

    const handleEdit = (record: { key: any; }) => {
        updateCustomer(record);
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
                    <Button onClick={() => {
                        form.resetFields();
                        fetchCustomers();
                    }}>重置</Button>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={showModal}>
                        + 添加
                    </Button>
                </Form.Item>
            </Form>
            <Table
                columns={columns}
                loading={loading}
                dataSource={filteredCustomers}
                pagination={{
                    total: filteredCustomers.length,
                    showTotal: total => `共 ${total} 条`,
                    pageSize: 10,
                    showQuickJumper: true,
                }}
            />
            <AddCustomerModal saveCustomer={saveCustomer} />
        </div>
    );
};

export default ClientList;



