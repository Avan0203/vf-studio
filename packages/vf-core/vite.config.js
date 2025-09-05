/*
 * @Author: wuyifan0203 1208097313@qq.com
 * @Date: 2025-03-31 16:58:33
 * @LastEditors: wuyifan wuyifan@udschina.com
 * @LastEditTime: 2025-09-05 11:30:21
 * @FilePath: \vf-studio\packages\vf-core\vite.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3500,
    open: true
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  root: 'examples',
  publicDir: 'public'
})