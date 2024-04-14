import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/gamehub-Calvinyeb04/',
  build: {
    rollupOptions: {
      input: 'src/main.jsx',
    },
  },
  server: {
    historyApiFallback: true,
  },
})