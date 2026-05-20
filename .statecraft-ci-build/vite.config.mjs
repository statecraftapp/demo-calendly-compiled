import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  // root = user repo, NOT the scratch dir. Putting source
  // files under `root` is load-bearing for
  // `@vanilla-extract/compiler`: when it spins up its own
  // Vite resolver per `.css.ts` file, in-root sources get a
  // regular module ID, but outside-root sources come back
  // as `/@fs/<abs>` URLs that the compiler then re-joins
  // with viteRoot, producing malformed module IDs like
  // `/@fs/<scratchRoot><abs>` (issue #43). The scratch's
  // own files (bundle-entry, vite.config.mjs, dist/) live
  // INSIDE the repo at <repo>/.statecraft-ci-build/<slug>/
  // (CI) or <repo>/.statecraft-live-build/<slug>/ (daemon)
  // so they're also under `root` without us doing anything.
  root: "/Users/dominicwhite/statecraft-demos/demo-calendly-compiled",
  plugins: [
   react({ babel: { babelrc: false, configFile: false, plugins: ["@compiled/babel-plugin"] } }),
    tsconfigPaths({ projects: ["/Users/dominicwhite/statecraft-demos/demo-calendly-compiled/tsconfig.json"] }),
  ],
  // Engineer-supplied `--define KEY=VALUE` entries follow
  // (Affine's `BUILD_CONFIG`, version stamps, etc.).
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'bundle-entry.tsx'),
      formats: ['es'],
      fileName: () => 'bundle.js',
    },
    cssCodeSplit: false,
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "class-variance-authority", "clsx", "tailwind-merge", "@radix-ui/react-slot", "@emotion/react", "@emotion/styled", "@emotion/cache", "@ant-design/cssinjs", "@griffel/react", "styled-components", "styletron-react", "styletron-engine-atomic", "react-router-dom", "wouter", "wouter/memory-location", "@tanstack/react-router", "next/link", "next/navigation", "next/router"],
      output: {
        assetFileNames: 'bundle.css',
        inlineDynamicImports: true,
      },
    },
  },
});
