import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production';
  
  return {
    base: isProduction ? './' : '/',
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(__dirname, './src') }
      ],
    },
    plugins: [reactRefresh()],
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: true,
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
          },
        },
      },
    },
    server: {
      port: 3000,
      open: true,
      strictPort: true,
    },
    preview: {
      port: 3000,
      strictPort: true,
    },
    define: {
      'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
    },
  };
});
