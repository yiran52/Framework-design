import { globalRouters } from '@/router'
import axios from 'axios'
import { globalConfig } from '@/globalConfig'

// 配合教程演示组件外路由跳转使用，无实际意义
export const goto = (path: string) => globalRouters.navigate(path);
const baseUrl = process.env.NODE_ENV === 'production' 
  ? import.meta.env.VITE_API_BASE_URL 
  : '/api';

// 发起请求
fetch(`${baseUrl}/data`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error fetching data:', error));

// 用户登录信息在localStorage中存放的名称
export const SESSION_LOGIN_INFO = globalConfig.SESSION_LOGIN_INFO;

// API请求正常，数据正常
export const API_CODE = {
    OK: 200,
    ERR_DATA: 403,
    ERR_NO_DATA: 301,
    ERR_LOGOUT: 401,
};

const axiosInstance = axios.create({
    baseURL: '/api',
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' },
});

// 从localStorage获取用户信息
export const getLocalLoginInfo = () => JSON.parse(window.localStorage[SESSION_LOGIN_INFO]);

// 退出登录
export const logout = () => {
    window.localStorage.removeItem(SESSION_LOGIN_INFO);
    goto('/login');
}
export const fetchData = async (): Promise<any> => {
      const res = await axiosInstance.get('/login');
      const result = res.data.data;
      return { data: [{ id: result.loginUid, name: result.nickname, value: result.token }] };
  };

export const fetchConfig = async (id: string): Promise<any> => {
    // 模拟获取配置
    return { data: { theme: 'dark', layout: 'horizontal', showSidebar: true } };
  };
  