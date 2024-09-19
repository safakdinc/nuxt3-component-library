import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue(), eslintPlugin()],
  server: {
    // Additional server options if needed
  }
  // Other Vite configuration options...
});
