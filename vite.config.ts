import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vite 8's Rolldown-based CJS interop breaks default imports from
  // @mui/icons-material subpaths (e.g. `@mui/icons-material/Menu`),
  // which only ship a CJS default export with no exports map.
  legacy: {
    inconsistentCjsInterop: true,
  },
  server: {
    proxy: {
      '/api/': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
    },
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 3000,
  },
  define: {
    'process.env': process.env,
  },
})
