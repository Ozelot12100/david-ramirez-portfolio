# 👨🏻‍💻 Portafolio — David A. Ramírez

Portafolio personal de **David Alberto Ramírez Vargas**, Desarrollador de Software Full Stack & Freelancer (Puerto Peñasco, Sonora, México).

Construido con **Astro** + **Tailwind CSS**. Sitio estático, rápido y orientado a SEO.

<div align="center">

![Astro Badge](https://img.shields.io/badge/Astro-FF3E00?logo=astro&logoColor=fff&style=flat)
![Tailwind CSS Badge](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=fff&style=flat)

</div>

## 🚀 Stack

- **[Astro](https://astro.build/) 4.4** — generador de sitios estáticos.
- **[Tailwind CSS](https://tailwindcss.com/) 3.4** — estilos utilitarios.
- **TypeScript** — chequeo de tipos (`astro check` en el build).
- **i18n nativo de Astro** — sitio **bilingüe** (ES en `/`, EN en `/en/`).
- **@astrojs/sitemap** — sitemap con `hreflang`; **astro-robots-txt** — `robots.txt`.
- **@vercel/analytics** — Web Analytics (visitas + parámetros UTM).
- **@fontsource-variable/onest** — tipografía Onest.
- **View Transitions** de Astro para navegación suave.

## 📦 Requisitos

- Node.js 18+ (recomendado 20+).
- pnpm (el repo versiona `pnpm-lock.yaml`). También funciona con npm.

## 🧞 Comandos

Desde la raíz del proyecto:

| Comando            | Acción                                                    |
| ------------------ | --------------------------------------------------------- |
| `pnpm install`     | Instala las dependencias                                  |
| `pnpm dev`         | Servidor local de desarrollo en `http://localhost:4321`   |
| `pnpm build`       | Ejecuta `astro check` y genera el sitio en `./dist/`      |
| `pnpm preview`     | Sirve el build de `./dist/` localmente                    |
| `pnpm astro ...`   | Ejecuta comandos de la CLI de Astro                        |

> Si usas npm, sustituye `pnpm` por `npm run` (p. ej. `npm run dev`).

## 🗂️ Estructura

```text
/
├── public/                  # Assets estáticos servidos tal cual
│   ├── david-ramirez.png    # Foto de perfil (Hero y AboutMe)
│   ├── favicon.svg
│   └── projects/            # Imágenes de los proyectos
├── src/
│   ├── components/            # Componentes .astro (secciones + UI)
│   │   ├── HomeSections.astro # Ensambla todas las secciones (compartido ES/EN)
│   │   └── icons/             # Iconos SVG como componentes
│   ├── i18n/
│   │   └── ui.ts             # Diccionario ES/EN + helpers de idioma
│   ├── layouts/
│   │   └── Layout.astro      # Layout base: <head>, fondo, Header, Footer, Analytics
│   └── pages/
│       ├── index.astro       # Home ES (/) — wrapper de HomeSections
│       ├── en/index.astro    # Home EN (/en/) — wrapper idéntico
│       └── components.astro   # Catálogo/design system de componentes
├── astro.config.mjs          # Integraciones, i18n y `site` (¡importante para SEO/robots!)
└── tailwind.config.mjs
```

## ✍️ Dónde editar el contenido

> 🌐 **El sitio es bilingüe (ES en `/`, EN en `/en/`).** Todo texto visible existe en los
> dos idiomas: edita siempre ambos. Detalle en [`docs/mantenimiento.md`](./docs/mantenimiento.md).

No hay CMS ni archivos de datos separados. El contenido vive en el diccionario i18n y dentro de los componentes:

| Sección                  | Archivo                                        | Qué contiene                                          |
| ------------------------ | ---------------------------------------------- | ----------------------------------------------------- |
| Texto general y meta SEO | `src/i18n/ui.ts`                               | Nav, títulos, pitch/bio, footer, botones, `meta.*` (en `ui.es` y `ui.en`) |
| Hero (inicio)            | `src/components/Hero.astro`                    | Nombre, email, redes sociales                         |
| Experiencia laboral      | `src/components/Experience.astro`              | Array `EXPERIENCE`                                    |
| Proyectos                | `src/components/Projects.astro`                | Arrays `TAGS` y `PROJECTS` (campos `{ es, en }`)      |
| Tecnologías              | `src/components/Skills.astro`                  | Array `SKILLS` (sección `#tecnologias`)               |
| Sobre mí                 | `src/components/AboutMe.astro`                 | Biografía                                             |
| Navegación / contacto    | `src/components/Header.astro` / `Footer.astro` | Enlaces del menú y email                              |

La información de referencia (fuente de verdad del contenido) está en [`Info para Portafolio David Alberto.md`](./Info%20para%20Portafolio%20David%20Alberto.md).

## ☁️ Despliegue (Vercel)

El sitio es **estático**, así que Vercel lo detecta como proyecto Astro sin configuración extra:

- **Framework Preset:** Astro
- **Build Command:** `pnpm build` (o `npm run build`)
- **Output Directory:** `dist`
- **Install Command:** `pnpm install`

Para desplegar:

1. En [vercel.com](https://vercel.com) → **Add New… → Project**.
2. Importa el repositorio de GitHub `Ozelot12100/david-ramirez-portfolio`.
3. Vercel autodetecta Astro. Pulsa **Deploy**.

A partir de ahí, cada `git push` a `main` genera un nuevo despliegue automático.

El proyecto ya existe en Vercel (`david-ramirez-portfolio`, equipo *david's projects*) y
su dominio de producción es **`www.davidramirez.com.mx`** (configurado en `site` de
[`astro.config.mjs`](./astro.config.mjs), que alimenta el sitemap y `robots.txt`).

> ⚠️ **El dominio depende de DNS en Cloudflare.** Si el sitio no carga, casi siempre es que
> faltan los registros DNS que apuntan a Vercel (ver sección siguiente), no un problema del
> código ni del build.

### Dominio y DNS (Cloudflare → Vercel)

`davidramirez.com.mx` usa **Cloudflare** como DNS (nameservers `*.ns.cloudflare.com`).
Para que el dominio resuelva a Vercel deben existir estos registros en el panel de Cloudflare:

| Tipo  | Nombre | Valor                   | Proxy            |
| ----- | ------ | ----------------------- | ---------------- |
| CNAME | `www`  | `cname.vercel-dns.com`  | DNS only (gris)  |
| A     | `@`    | `76.76.21.21`           | DNS only (gris)  |

Usa los valores **exactos** que muestra Vercel en *Project → Settings → Domains*.
Mantén el proxy en **DNS only** para que Vercel gestione el certificado SSL.

## 📚 Documentación operativa

En [`docs/`](./docs/) está la documentación de operación del sitio:

- [`docs/dominio-y-dns.md`](./docs/dominio-y-dns.md) — dominio, registros DNS en Cloudflare y qué revisar si **"no carga la página"**.
- [`docs/despliegue-vercel.md`](./docs/despliegue-vercel.md) — pipeline de despliegue, logs y rollback.
- [`docs/mantenimiento.md`](./docs/mantenimiento.md) — editar contenido, añadir proyectos y optimizar imágenes.
- [`docs/pendientes.md`](./docs/pendientes.md) — backlog vivo: testimonios, LinkedIn, SEO y upgrades pendientes.

## 📄 Licencia y créditos

Basado en la plantilla open source [porfolio.dev de midudev](https://github.com/midudev/porfolio.dev) (MIT). Ver [`LICENSE.md`](./LICENSE.md).
