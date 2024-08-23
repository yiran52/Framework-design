import axios from 'axios';

const request = axios.create({
    baseURL: process.env.API_BASE_URL || 'http://localhost:3000/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 请求拦截器
request.interceptors.request.use(
    config => {
        // 可以在这里添加认证 token 或其他全局配置
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截器
request.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        return Promise.reject(error);
    }
);

export default request;
