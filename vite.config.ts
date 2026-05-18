import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Compiled's babel plugin nests INSIDE plugin-react's babel chain —
// same path Statecraft's kind:live bundler uses
// (daemon/core/src/importer/css_engines.rs — COMPILED spec, `react_babel_plugins`).
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['@compiled/babel-plugin'],
      },
    }),
  ],
});
