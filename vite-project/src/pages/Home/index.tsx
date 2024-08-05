import React from 'react';
import { Button } from 'antd';
import styles from './index.module.less'; // 使用 CSS Modules 导入 Less 文件
import { useNavigate } from 'react-router-dom'
const Home: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div className={styles.PHome}>
            <h1 className={styles.h1}>Home Page</h1>
            <div className={styles.iptCon}>
            <Button type="primary" onClick={()=>{navigate('/login')}}>返回登录</Button>
            </div>
        </div>
    );
}

export default Home;

