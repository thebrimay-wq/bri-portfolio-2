import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: { outDir: 'dist' },
  // Only scan the root index.html as entry — ignore legacy HTML subdirectories
  optimizeDeps: {
    entries: ['src/main.jsx'],
  },
});
