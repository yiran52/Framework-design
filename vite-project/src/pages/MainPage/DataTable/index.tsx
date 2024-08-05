import React from 'react';
import { Table } from 'antd';
import { useModel } from '../useModel';
import { DataItem } from '../interface';

const DataTable: React.FC = () => {
  const { localData, loading, openDrawer } = useModel();

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: DataItem) => (
        <a onClick={() => openDrawer(record.name)}>{text}</a>
      ),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return <Table columns={columns} dataSource={localData} loading={loading} />;
};

export default DataTable;