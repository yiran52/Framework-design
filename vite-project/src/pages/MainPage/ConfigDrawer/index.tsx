import React from 'react';
import { Drawer } from 'antd';
import { useModel } from '../useModel';

const ConfigDrawer: React.FC = () => {
  const { config, closeDrawer, configId } = useModel();

  return (
    <Drawer
      title="Configuration"
      placement="right"
      onClose={closeDrawer}
      open={!!configId}
    >
      {config ? <pre>{JSON.stringify(config, null, 2)}</pre> : 'Loading...'}
    </Drawer>
  );
};

export default ConfigDrawer;