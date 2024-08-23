import { generateService } from '@umijs/openapi';

generateService({
    // 使用自定义的 axios 实例路径
    requestLibPath: "import request from '@/utils/request'",
    // Swagger JSON 文件的路径
    schemaPath: 'http://127.0.0.1:4523/export/openapi/40?version=3.0',
    // 生成的服务代码路径
    serversPath: './src/servers',
    // 项目名称，生成的代码会在这个文件夹下
    projectName: 'test1',
    // 命名空间，用于生成的类型命名空间
    namespace: 'swagger',
});
