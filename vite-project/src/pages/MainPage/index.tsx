import React, { useEffect } from 'react';
import { Layout } from 'antd';
import SearchForm from './SearchForm';
import DataTable from './DataTable';
import ConfigDrawer from './ConfigDrawer';
import { useModel } from './useModel';
import { useGlobalStore } from '../../store/globalStore';

const { Header, Content } = Layout;

const MainPage: React.FC = () => {
  const { loadLocalData } = useModel();
  const { loadSharedData } = useGlobalStore();

  useEffect(() => {
    loadLocalData();
    loadSharedData();
  }, [loadLocalData, loadSharedData]);

  return (
    <Layout>
      <Header>
        <SearchForm />
      </Header>
      <Content>
        <DataTable />
        <ConfigDrawer />
      </Content>
    </Layout>
  );
};

export default MainPage;