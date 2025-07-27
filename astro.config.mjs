// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config

export default defineConfig({
  vite: {
    build: {
      rollupOptions: {
        // не пытаться бандлить rss-parser в клиентские чанки
        external: ['rss-parser']
      }
    }
  }
});
