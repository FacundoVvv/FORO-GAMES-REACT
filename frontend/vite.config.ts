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
      '@Hooks': path.resolve(__dirname, "./src/Hooks"),
      '@Models': path.resolve(__dirname, "./src/Models"),
      '@Router': path.resolve(__dirname, "./src/Router"),
      '@Types': path.resolve(__dirname, "./src/Types"),
      '@Utils': path.resolve(__dirname, "./src/Utils"),
      '@Utils_forum_components': path.resolve(__dirname, "./src/Components/Forum/utils_forum_components"),
    },
  },
});
