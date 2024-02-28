import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { baseURL } from './src/helpers/constants.js'

export default defineConfig({
  server:{
    proxy:{
      '/api': {
        target: baseURL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  },
  plugins: [react()],
})
