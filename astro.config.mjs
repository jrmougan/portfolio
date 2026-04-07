// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      themes: {
        dark: 'github-dark',
        light: 'github-light',
      },
      defaultColor: false,
    },
  },
});
