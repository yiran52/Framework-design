import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import {globalRouters} from '@/router'
import zhCN from 'antd/locale/zh_CN'
import { ConfigProvider } from 'antd'
import '@/common/styles/frame.less'
import './mock'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider locale={zhCN}>
        <RouterProvider router={globalRouters} />
 </ConfigProvider>
)
