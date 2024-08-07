import React, { useEffect } from 'react';
import { Layout } from 'antd';
import SearchForm from './SearchForm';
import DataTable from './DataTable';
import {DemoLine} from '../EchartInstance'
import ConfigDrawer from './ConfigDrawer';
import { useModel } from './useModel';
import { useGlobalStore } from '../../store/globalStore';
import Pagination from '@/pages/ahooksInstance/usePagination'
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
      </Header>
      <Content>
      <DemoLine />
      <Pagination />
      </Content>
    </Layout>
  );
};

export default MainPage;