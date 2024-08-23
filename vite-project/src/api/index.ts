import { globalRouters } from '@/router'
import axios from 'axios'
import { globalConfig } from '@/globalConfig'

// 配合教程演示组件外路由跳转使用，无实际意义
export const goto = (path: string) => globalRouters.navigate(path);
const baseUrl = import.meta.env.MODE === 'development'
  ? '/afterapi'
  : import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  },
});

export const fetchData = async (): Promise<any> => {

};

export const fetchConfig = async (id: string): Promise<any> => {
  // 模拟获取配置
  return { data: { theme: 'dark', layout: 'horizontal', showSidebar: true } };
};
