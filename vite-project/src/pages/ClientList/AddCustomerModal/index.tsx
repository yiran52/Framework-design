import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import useModalStore from '../useModel'; // 引入zustand的状态管理
import { Customer } from '../interface';
import { useForm } from 'antd/es/form/Form';

interface Props {
    saveCustomer: (record: Customer) => void;
}

const AddCustomerModal: React.FC<Props> = ({ saveCustomer }) => {
    const { isModalVisible, hideModal } = useModalStore();
    const [form] = useForm<Customer>();

    const handleOk = () => {
        form.validateFields().then(values => {
            saveCustomer(values)
        }).catch(errorInfo => {
            console.log('Validation Failed:', errorInfo);
        });
    };

    const handleCancel = () => {
        hideModal(); // 取消时隐藏弹窗
    };

    return (
        <Modal
            title="添加客户"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    取消
                </Button>,
                <Button key="submit" type="primary" onClick={handleOk}>
                    确认
                </Button>,
            ]}
        >
            <Form layout="vertical" form={form}>
                {/* 如果需要在某些场景下处理 key */}
                <Form.Item name="key" style={{ display: 'none' }}>
                    <Input type="hidden" />
                </Form.Item>
                <Form.Item label="客户名称" name="name" rules={[{ required: true, message: '请输入客户名称' }]}>
                    <Input placeholder="请输入客户名称" />
                </Form.Item>
                <Form.Item label="设备数量" name="deviceCount" rules={[{ required: true, message: '请输入设备数量' }]}>
                    <Input type="number" placeholder="请输入设备数量" />
                </Form.Item>
                <Form.Item label="手机号" name="phone" rules={[{ required: true, message: '请输入手机号' }]}>
                    <Input placeholder="请输入手机号" />
                </Form.Item>
                <Form.Item label="客户地址" name="address" rules={[{ required: true, message: '请输入客户地址' }]}>
                    <Input.TextArea placeholder="请输入客户地址" />
                </Form.Item>
                <Form.Item label="添加时间" name="addedTime" rules={[{ required: true, message: '请输入添加时间' }]}>
                    <Input placeholder="请输入添加时间" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddCustomerModal;

