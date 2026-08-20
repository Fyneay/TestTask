import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import autoprefixer from 'autoprefixer'

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '../')
  const port = env.APP_FRONT_PORT ?? 4000
  return {
    envDir: path.resolve(process.cwd(),'..'),
    envPrefix: 'APP_',
    base: './',
    build: {
      outDir: 'build',
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer({}), // add options if needed
        ],
      },
    },
    plugins: [react()],
    resolve: {
      alias: [
        {
          find: 'src/',
          replacement: `${path.resolve(__dirname, 'src')}/`,
        },
      ],
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.scss'],
    },
    server: {
      port: port,
      proxy: {
      },
    },
  }
})
