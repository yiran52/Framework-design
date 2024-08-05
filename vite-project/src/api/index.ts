import {globalRouters} from '@/router'

export const goto = (path: string) => {
    //非组件使用路由跳转
    globalRouters.navigate(path)
}
