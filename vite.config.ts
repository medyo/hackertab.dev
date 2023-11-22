import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import { ViteEjsPlugin } from 'vite-plugin-ejs'
import svgrPlugin from 'vite-plugin-svgr'
import viteTsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const buildTarget = env.VITE_BUILD_TARGET || 'web'

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
      minify: 'terser',
      terserOptions: {
        format: {
          beautify: true,
        },
      },
      rollupOptions: {
        ...(buildTarget === 'extension'
          ? {
              output: {
                manualChunks: () => 'main.js',
                entryFileNames: `assets/[name].js`,
                chunkFileNames: `assets/[name].js`,
                assetFileNames: `assets/[name].[ext]`,
              },
            }
          : {}),
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
