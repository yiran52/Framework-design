import React from 'react';
import { useRequest } from 'ahooks';
import axios from 'axios';

function FetchDataComponent() {
    const fetchUserData = (id:number) => axios.get('https://api.example.com/users');

    const { data, error, loading, run } = useRequest(fetchUserData, {
    // const request1 = useRequest(fetchUserData, {
        manual: false, // 组件挂载时自动触发
        refreshDeps: [],//可以根据依赖变化来自动执行，通常用在提交表单，点击抽屉等动作中
        debounceWait: 300,//如上示例代码，频繁触发 run，只会在最后一次触发结束后等待 300ms 执行。
        onSuccess: (result) => {
            console.log('Data loaded', result);
        }
    });
    // const A = useRequest(fetchUserData, {
    //     // const request1 = useRequest(fetchUserData, {
    //         manual: false, // 组件挂载时自动触发
    //         refreshDeps: [],//可以根据依赖变化来自动执行，通常用在提交表单，点击抽屉等动作中
    //         debounceWait: 300,//如上示例代码，频繁触发 run，只会在最后一次触发结束后等待 300ms 执行。
    //         onSuccess: (result) => {
    //             console.log('Data loaded', result);
    //         }
    //     });
    // const B = useRequest(fetchUserData, {
    //         // const request1 = useRequest(fetchUserData, {
    //             manual: false, // 组件挂载时自动触发
    //             refreshDeps: [],//可以根据依赖变化来自动执行，通常用在提交表单，点击抽屉等动作中
    //             debounceWait: 300,//如上示例代码，频繁触发 run，只会在最后一次触发结束后等待 300ms 执行。
    //             onSuccess: () => {
    //                 A.run(1)
    //             }
    //         });
    // 当用户点击按钮时，手动触发数据重新加载
    const handleReload = () => {
        run(1);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return (
        <div>
            {data && <div>User name: {data.data.name}</div>}
            <button onClick={handleReload}>Reload Data</button>
        </div>
    );
}

export default FetchDataComponent;


