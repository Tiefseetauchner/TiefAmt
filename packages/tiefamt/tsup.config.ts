import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/styles/govamt.scss',
    'src/styles/presets/austria.scss',
    'src/styles/presets/eu.scss',
    'src/styles/presets/neutral.scss',
  ],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'react-bootstrap', 'bootstrap'],
})
