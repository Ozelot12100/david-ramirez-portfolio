import { defineConfig } from 'astro/config'
import tailwind from "@astrojs/tailwind"
import sitemap from "@astrojs/sitemap"

import robotsTxt from "astro-robots-txt"

// https://astro.build/config
export default defineConfig({
  site: 'https://www.davidramirez.com.mx',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false, // español en /, inglés en /en/
    },
  },
  integrations: [
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es-MX', en: 'en-US' },
      },
      // /components es el catálogo interno de componentes, no contenido público
      filter: (page) => !page.includes('/components'),
    }),
    robotsTxt({
      policy: [{ userAgent: '*', allow: '/', disallow: '/components' }],
    }),
  ],
})
