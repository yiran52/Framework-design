import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001,
    open: '/',
    proxy: {
      '/api': {
        target: import.meta.env.VITE_API_BASE_URL, // 使用环境变量配置目标
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // 去掉 /api 前缀
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [react()],
})
