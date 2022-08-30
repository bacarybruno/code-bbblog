import linaria from "@linaria/rollup";
import react from "@vitejs/plugin-react";
import { splitVendorChunkPlugin } from "vite";
import { defineConfig } from "vite";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import rollupNodePolyFill from "rollup-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  root: "src",
  publicDir: "../public",
  build: {
    outDir: "../dist",
    rollupOptions: {
      plugins: [rollupNodePolyFill({}), splitVendorChunkPlugin()],
    },
  },
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
  plugins: [
    {
      // @ts-ignore
      ...linaria.default({
        include: ["**/*.tsx", "**/*.ts"],
      }),
      enforce: "pre",
    },
    react(),
  ],
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
  resolve: {
    alias: {
      buffer: "rollup-plugin-node-polyfills/polyfills/buffer-es6",
    },
  },
});
