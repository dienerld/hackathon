import { defineConfig } from 'tsup'

const regex = /src/
export default defineConfig({
  entry: ['src/**/*.ts'],
  outDir: 'dist',
  dts: false,
  minify: true,
  clean: true,
})
