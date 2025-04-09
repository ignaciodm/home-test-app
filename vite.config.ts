import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,  // Enable global test functions like `test`, `describe`, `it`
    environment: 'jsdom',  // Use jsdom environment for React-based tests
    transformMode: {
      web: [/.[tj]sx$/],  // Handle .ts and .tsx files correctly
    },
  },
})
