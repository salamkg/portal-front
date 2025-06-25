import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default {
  root: resolve(__dirname, 'src'),
  build: {
    outDir: '../dist'
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  }
}
