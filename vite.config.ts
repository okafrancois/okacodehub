import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
import * as path from "path";


// https://vitejs.dev/config/
process.env = {...process.env, ...loadEnv("default", process.cwd())};
export default defineConfig({
  resolve:{
    alias:{
      '@': path.resolve(__dirname, '/src'),
      '@components': path.resolve(__dirname, '/src/components'),
      '@views': path.resolve(__dirname, '/src/views'),
      '@utils': path.resolve(__dirname, '/src/utils'),
      '@assets': path.resolve(__dirname, '/src/assets'),
    },
  },
  plugins: [react(), viteCompression()],
  css: {
    devSourcemap: true,
  },
  server: {
    port: parseInt(process.env.VITE_PORT) || 3000,
  },
  preview: {
    port: parseInt(process.env.VITE_PREVIEW_PORT) || 3001,
  },
  esbuild: {
    loader: 'tsx',
  }
})
