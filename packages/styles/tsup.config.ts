import { defineConfig } from 'tsup';
import { sassPlugin } from 'esbuild-sass-plugin';

export default defineConfig({
  esbuildPlugins: [
    sassPlugin({
      quietDeps: true,
      silenceDeprecations: ['import'],
    }),
  ],
  entry: [
    'src/presets/austria.scss',
    'src/presets/eu.scss',
    'src/presets/neutral.scss',
  ],
  format: ['esm'],
  dts: false,
  sourcemap: true,
  clean: true,
  external: ['bootstrap'],
});
