import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "./src"),
      '@Components': path.resolve(__dirname, "./src/Components"),
      '@Contexts': path.resolve(__dirname, "./src/Contexts"),
      '@Models': path.resolve(__dirname, "./src/Models"),
      '@Utils': path.resolve(__dirname, "./src/Utils"),
    },
  },
});
