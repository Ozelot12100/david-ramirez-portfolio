import { defineConfig } from 'astro/config'
import tailwind from "@astrojs/tailwind"
import sitemap from "@astrojs/sitemap"

import robotsTxt from "astro-robots-txt"

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    sitemap({
      // /components es el catálogo interno de componentes, no contenido público
      filter: (page) => !page.includes('/components'),
    }),
    robotsTxt({
      policy: [{ userAgent: '*', allow: '/', disallow: '/components' }],
    }),
  ],
  site: 'https://www.davidramirez.com.mx',
})
