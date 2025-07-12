import { sentryVitePlugin } from '@sentry/vite-plugin'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import { ViteEjsPlugin } from 'vite-plugin-ejs'
import svgrPlugin from 'vite-plugin-svgr'
import viteTsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const buildTarget = env.VITE_BUILD_TARGET || 'web'
  const buildPlatform = env.VITE_BUILD_PLATFORM
  const manifestPath = path.resolve(__dirname, 'public', 'base.manifest.json')
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
  const appVersion = manifest.version || '0.0.0'
  if (!env.VITE_API_URL) {
    throw new Error('VITE_API_URL is not defined, create an .env file with this variable')
  }

  if (buildTarget == 'extension' && !buildPlatform) {
    throw new Error(
      'VITE_BUILD_PLATFORM is not defined, create an .env file with this variable with either "firefox" or "chrome"'
    )
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
      sentryVitePlugin({
        org: 'hackertabdev',
        project: 'hackertab',
        authToken: env.VITE_SENTRY_TOKEN,
        disable: mode === 'development',
        release: {
          name: `${appVersion}-${buildTarget == 'extension' ? buildPlatform : buildTarget}`,
        },
        sourcemaps: {
          filesToDeleteAfterUpload: ['./dist/assets/*.map', './assets/*.map'],
        },
      }),
    ],
    define: {
      'process.env': {},
    },
    build: {
      sourcemap: true,
      emptyOutDir: true,
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].js`,
          chunkFileNames: `assets/[name]-[hash].js`,
          assetFileNames: `assets/[name]-[hash].[ext]`,
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
