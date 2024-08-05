import React from 'react';
import { Button } from 'antd';
import styles from './index.module.less'; // 使用 CSS Modules 导入 Less 文件

const Account: React.FC = () => {
    return (
        <div className={styles.PAccount}>
            <h1>Account Page</h1>
            <div className={styles.iptCon}>
                <Button type="primary">返回登录</Button>
            </div>
        </div>
    );
}

export default Account;
