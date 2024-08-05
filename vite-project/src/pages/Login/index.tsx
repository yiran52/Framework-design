import React from 'react';
import { Button, Input } from 'antd';
import styles from './index.module.less';  // 使用 CSS Modules 导入样式
import { useNavigate } from 'react-router-dom'
const Login: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div className={styles.PLogin}>
            <div className={styles.iptCon}>
                <Input placeholder="账号" />
            </div>
            <div className={styles.iptCon}>
                <Input.Password placeholder="密码" />
            </div>
            <div className={styles.iptCon}>
                <Button type="primary" block={true} onClick={() => { navigate('/home') }}>登录</Button>
            </div>
        </div>
    );
}

export default Login;