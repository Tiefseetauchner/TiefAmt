import { defineConfig } from 'tsup';
import { sassPlugin } from 'esbuild-sass-plugin';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  esbuildPlugins: [
    sassPlugin({
      quietDeps: true,
      silenceDeprecations: ['import'],
      loadPaths: [
        resolve(__dirname, '../core/src/styles'),
        resolve(__dirname, 'node_modules'),
      ],
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
