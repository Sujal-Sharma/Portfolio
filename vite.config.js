import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('three')) return 'three';
          if (id.includes('@react-three')) return 'fiber';
          if (id.includes('framer-motion')) return 'framer';
        },
      },
    },
  },
})
