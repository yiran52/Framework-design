import { globalRouters } from '@/router'
import axios from 'axios'
import { Modal } from 'antd'
import { globalConfig } from '@/globalConfig'

// 配合教程演示组件外路由跳转使用，无实际意义
export const goto = (path: string) => globalRouters.navigate(path);

// 开发环境地址
let API_DOMAIN = '/api/';
if (process.env.NODE_ENV === 'production') {
    API_DOMAIN = 'http://xxxxx/api/';
}

// 用户登录信息在localStorage中存放的名称
export const SESSION_LOGIN_INFO = globalConfig.SESSION_LOGIN_INFO;

// API请求正常，数据正常
export const API_CODE = {
    OK: 200,
    ERR_DATA: 403,
    ERR_NO_DATA: 301,
    ERR_LOGOUT: 401,
};

// API请求异常统一报错提示
export const API_FAILED = '网络连接异常，请稍后再试';
export const API_LOGOUT = '您的账号已在其他设备登录，请重新登录';

export const apiReqs = {
    signIn: (config: any) => {
        axios
            .post(`${API_DOMAIN}login`, config.data)
            .then((res) => {
                const result = res.data;
                config.done?.(result);
                if (result.code === API_CODE.OK) {
                    window.localStorage.setItem(
                        SESSION_LOGIN_INFO,
                        JSON.stringify({
                            uid: result.data.loginUid,
                            nickname: result.data.nickname,
                            token: result.data.token,
                        })
                    );
                    config.success?.(result);
                } else {
                    config.fail?.(result);
                }
            })
            .catch(() => {
                config.done?.();
                config.fail?.({ message: API_FAILED });
                Modal.error({ title: '登录失败' });
            });
    },
    signOut: () => {
        const { uid, token } = getLocalLoginInfo();
        const headers = {
            loginUid: uid,
            'access-token': token,
        };
        const axiosConfig = {
            method: 'post',
            url: `${API_DOMAIN}logout`,
            headers,
        };
        axios(axiosConfig)
            .then(() => logout())
            .catch(() => logout());
    },
    getUserList: (config: any) => {
        config.method = 'get';
        config.url = `${API_DOMAIN}user/getUserList`;
        apiRequest(config);
    },
    modifyUser: (config: any) => {
        config.url = `${API_DOMAIN}user/modify`;
        apiRequest(config);
    },
};

// 从localStorage获取用户信息
export const getLocalLoginInfo = () => JSON.parse(window.localStorage[SESSION_LOGIN_INFO]);

// 退出登录
export const logout = () => {
    window.localStorage.removeItem(SESSION_LOGIN_INFO);
    goto('/login');
}

/*
 * API请求封装（带验证信息）
 * config.method: [必须]请求method
 * config.url: [必须]请求url
 * config.data: 请求数据
 * config.formData: 是否以formData格式提交（用于上传文件）
 * config.success(res): 请求成功回调
 * config.fail(err): 请求失败回调
 * config.done(): 请求结束回调
 */
export const apiRequest = (config: any) => {
    const loginInfo = JSON.parse(window.localStorage.getItem(SESSION_LOGIN_INFO) || '{}');
    config.data = config.data || {};
    config.method = config.method || 'post';

    const headers: any = {
        loginUid: loginInfo?.uid || null,
        'access-token': loginInfo?.token || null,
    };

    let data = config.data;
    if (config.formData) {
        headers['Content-Type'] = 'multipart/form-data';
        data = new FormData();
        Object.keys(config.data).forEach((key) => data.append(key, config.data[key]));
    }

    const axiosConfig: any = {
        method: config.method,
        url: config.url,
        headers,
    };

    if (config.method === 'get') {
        axiosConfig.params = data;
    } else {
        axiosConfig.data = data;
    }

    axios(axiosConfig)
        .then((res) => {
            const result = res.data;
            config.done?.();
            if (result.code === API_CODE.ERR_LOGOUT) {
                Modal.error({
                    title: result.message,
                    onOk: () => logout(),
                });
            } else {
                config.success?.(result);
            }
        })
        .catch(() => {
            Modal.error({ title: API_FAILED });
            config.fail?.();
            config.done?.();
        });
}

// src/api/api.ts
export const fetchData = async (params:string): Promise<any> => {
    // 模拟 API 请求
    return { data: [{ id: 1, name: 'John Doe', value: 'admin' }] };
  };
  
export const fetchConfig = async (id: string): Promise<any> => {
    // 模拟获取配置
    return { data: { theme: 'dark', layout: 'horizontal', showSidebar: true } };
  };
  