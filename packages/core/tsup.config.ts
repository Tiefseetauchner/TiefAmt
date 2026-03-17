import { defineConfig } from 'tsup'
import { sassPlugin } from 'esbuild-sass-plugin'

export default defineConfig({
  esbuildPlugins: [sassPlugin({ quietDeps: true, silenceDeprecations: ['import'] })],
  entry: [
    'src/index.ts',
    'src/styles/govamt.scss',
  ],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'react-bootstrap', 'bootstrap'],
})
