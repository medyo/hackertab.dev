import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import { ViteEjsPlugin } from 'vite-plugin-ejs'
import svgrPlugin from 'vite-plugin-svgr'
import viteTsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const buildTarget = env.VITE_BUILD_TARGET || 'web'
  const buildPlatform = env.VITE_BUILD_PLATFORM

  if (!env.VITE_API_URL) {
    throw new Error('VITE_API_URL is not defined, create an .env file with this variable')
  }

  if (buildTarget == 'extension' && !buildPlatform) {
    throw new Error('VITE_BUILD_PLATFORM is not defined, create an .env file with this variable')
  }

  return {
    plugins: [
      ViteEjsPlugin((viteConfig) => {
        return {
          isWebBuild: viteConfig.env.VITE_BUILD_TARGET === 'web',
        }
      }),
      react(),
      viteTsconfigPaths(),
      svgrPlugin(),
    ],
    define: {
      'process.env': {},
    },
    build: {
      emptyOutDir: true,
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].js`,
          chunkFileNames: `assets/[name]-[hash].js`,
          assetFileNames: `assets/[name].[ext]`,
          manualChunks: {
            core: [
              'react',
              'react-dom',
              'react-router-dom',
              'zustand',
              '@tanstack/react-query',
              '@tanstack/react-query-persist-client',
              'axios',
              'react-error-boundary',
            ],
            ui: [
              'react-contexify',
              'react-select',
              'react-share',
              'react-simple-toasts',
              'react-toggle',
              'react-tooltip',
              'react-icons',
              'react-markdown',
              'react-spring-bottom-sheet',
            ],
            utils: [
              '@amplitude/analytics-browser',
              'axios-cache-adapter',
              'country-emoji',
              'htmlparser2',
              'dompurify',
              'timeago.js',
            ],
          },
        },
      },
    },
    server: {
      open: true,
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    resolve: {
      alias: {
        src: path.resolve(__dirname, './src'),
      },
    },
  }
})
