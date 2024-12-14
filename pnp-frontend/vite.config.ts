import react from '@vitejs/plugin-react';
import { defineConfig, UserConfigExport } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';

  const config: UserConfigExport = {
    plugins: [react()],
    server: {
      port: 1234,
    },
    build: {
      sourcemap: true,
    },
  };

  if (isProd) {
    config.define = {
      ...config.define,
      'process.env.NODE_ENV': '"production"',
      'process.env.NODE_DEBUG': '"false"',
    };
  }

  return config;
});
