import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import { useModel } from '../useModel';

const { Option } = Select;

const SearchForm: React.FC = () => {
  const { loadLocalData } = useModel();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    loadLocalData(values);
  };

  return (
    <Form layout="inline" form={form} onFinish={onFinish}>
      <Form.Item name="name" label="Name">
        <Input placeholder="Enter name" />
      </Form.Item>
      <Form.Item name="age" label="Age">
        <Input placeholder="Enter age" />
      </Form.Item>
      <Form.Item name="status" label="Status">
        <Select placeholder="Select status">
          <Option value="active">Active</Option>
          <Option value="inactive">Inactive</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Search</Button>
      </Form.Item>
    </Form>
  );
};

export default SearchForm;