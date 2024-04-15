import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/gamehub-Calvinyeb04/',
  define: {
    'process.env': process.env
  }
})