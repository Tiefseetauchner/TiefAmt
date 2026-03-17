import { defineConfig } from "tsup";
import { sassPlugin } from "esbuild-sass-plugin";
import path from "path";

export default defineConfig({
  esbuildPlugins: [
    sassPlugin({
      quietDeps: true,
      silenceDeprecations: ["import"],
      loadPaths: [path.resolve(__dirname, "../core/src/styles"), path.resolve(__dirname, "node_modules")],
    }),
  ],
  entry: ["src/presets/austria.scss", "src/presets/eu.scss", "src/presets/neutral.scss"],
  format: ["esm"],
  dts: false,
  sourcemap: true,
  clean: true,
  external: ["bootstrap"],
});
