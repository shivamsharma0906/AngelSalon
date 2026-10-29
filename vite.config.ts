import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2020',
    cssMinify: true,
    // SSR builds handle chunking differently — manualChunks must be omitted
    rollupOptions:
      mode === 'ssr'
        ? {}
        : {
            output: {
              manualChunks: {
                vendor: ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
              },
            },
          },
  },
  // SSR: inline all npm packages so the bundle is self-contained CJS-safe
  ssr: {
    noExternal: mode === 'ssr' ? true : undefined,
  },
}))
