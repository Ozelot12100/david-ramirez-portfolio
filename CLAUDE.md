# CLAUDE.md

Guía para trabajar en este repositorio con Claude Code.

## Qué es

Portafolio personal estático de **David Alberto Ramírez Vargas** (Desarrollador Full Stack & Freelancer). Construido con **Astro 4** + **Tailwind CSS 3**. No tiene backend ni rutas dinámicas: es un sitio estático que se compila a HTML.

Repo de GitHub: `Ozelot12100/david-ramirez-portfolio`. Se despliega en Vercel (proyecto `david-ramirez-portfolio`, equipo *david's projects*) como sitio estático (output `dist/`). Dominio de producción: `www.davidramirez.com.mx`, con DNS gestionado en **Cloudflare**.

> Si "no carga la página": lo más probable es DNS, no el código. El dominio en Cloudflare
> necesita un CNAME `www → cname.vercel-dns.com` (y A `@ → 76.76.21.21`) en modo **DNS only**.
> El build y el deployment de Vercel suelen estar sanos.

**Documentación operativa en `docs/`**: [dominio y DNS](docs/dominio-y-dns.md) (checklist de
"no carga"), [despliegue en Vercel](docs/despliegue-vercel.md), [mantenimiento](docs/mantenimiento.md)
(cómo añadir proyectos y optimizar imágenes con `scripts/optimizar-imagenes.mjs`).

## Comandos

```bash
pnpm install      # instalar dependencias (el repo versiona pnpm-lock.yaml)
pnpm dev          # dev server en http://localhost:4321
pnpm build        # astro check (tipos) + astro build → dist/
pnpm preview      # sirve dist/ localmente
```

`pnpm build` ejecuta `astro check` primero: **un error de tipos rompe el build** (y, por tanto, el despliegue en Vercel). Verifica siempre con `pnpm build` antes de dar por terminado un cambio.

## Arquitectura

- Sitio 100% estático. Astro renderiza `.astro` a HTML en build; el único JS de cliente está en `<script>` de `Header.astro` (resaltado de sección al hacer scroll) y en `ThemeToggle.astro`.
- **Bilingüe (i18n nativo de Astro)**: español en `/` e inglés en `/en/` (`defaultLocale: 'es'`, `prefixDefaultLocale: false` en `astro.config.mjs`). El ensamblado de secciones vive en `src/components/HomeSections.astro`; `src/pages/index.astro` (ES) y `src/pages/en/index.astro` (EN) son wrappers idénticos que solo cambian por su URL. Cada componente deriva su idioma con `getLangFromUrl(Astro.url)` (helper de `src/i18n/ui.ts`), sin prop drilling.
- `src/pages/components.astro` es un catálogo de componentes (design system), no parte del portafolio público.
- `Layout.astro` define `<head>`, el fondo con gradiente, `Header`, `Footer`, estilos globales y las View Transitions.
- Alias de import: `@/*` → `src/*` (ver `tsconfig.json`). Algunos componentes usan rutas relativas; ambas conviven.

## Dónde vive el contenido

No hay CMS ni archivos de datos. El sitio es **bilingüe (ES/EN)**, así que **todo texto visible existe en ambos idiomas**:

- **Texto de "chrome" y prosa** (nav, títulos de sección, pitch del Hero, biografía, footer, botones, meta): en el diccionario `src/i18n/ui.ts` (objetos `ui.es` y `ui.en`). Se leen con `useTranslations(lang)`. La prosa con `<strong>` (Hero/AboutMe) se guarda como HTML y se pinta con `set:html`.
- **Contenido estructurado** (`Projects.astro` → `PROJECTS`, `Experience.astro` → `EXPERIENCE`, `Skills.astro` → `SKILLS`): vive en su componente, con los campos de texto como `{ es, en }` y se elige con `[lang]`. Los nombres de tecnología en `TAGS`/skills que son iguales en ambos idiomas quedan como string plano.

**Al editar contenido, hazlo en los DOS idiomas.** El resto de datos por componente:

- `Hero.astro` — nombre, pitch (Full Stack + IA), email, enlaces sociales.
- `Experience.astro` — array `EXPERIENCE`.
- `Projects.astro` — objeto `TAGS` (tecnologías) y array `PROJECTS` (6 proyectos: Sistema Biométrico/IA, Palaliga, Hogarly, DropWear, La Casa de Ramona, Estrella Brothers). Cada proyecto tiene `link` (demo en vivo, solo si es pública), `github` (vacío = repo privado de cliente), `image` y `alt`.
- `Skills.astro` — array `SKILLS` (tecnologías agrupadas por categoría). Se muestra en la sección "Tecnologías" (`id="tecnologias"`).
- `AboutMe.astro` — biografía (texto en el markup).
- `Header.astro` / `Footer.astro` — navegación, email de contacto.

Iconos de tecnologías en `src/components/icons/` (SVG que aceptan `class` por props). Al añadir un tag nuevo en `TAGS`, crear su icono siguiendo el patrón existente.

Fuente de verdad del contenido redactado: `Info para Portafolio David Alberto.md` (parcialmente desfasado; el catálogo real de proyectos y tecnologías vive ya en `Projects.astro`/`Skills.astro`).

Imágenes en `public/` (servidas en la raíz): `david-ramirez.png` (perfil), `projects/*.png`.

## Convenciones

- Estilos: utilidades de Tailwind inline en el markup. Modo oscuro vía clases `dark:` (`darkMode: 'class'`).
- Iconos: cada icono es un componente `.astro` en `src/components/icons/` que acepta props (p. ej. `class="size-4"`) y las pasa al `<svg>`.
- Componentes nuevos: seguir el patrón existente (frontmatter con `interface Props`, `Astro.props`).

## Notas y deuda técnica conocida

- **Los repos de los proyectos mostrados son privados** (trabajos pagados por clientes). Por eso las entradas de `PROJECTS` tienen `github: ""` — el botón "Código" solo se renderiza si hay URL. No volver a enlazar esos repos salvo que se hagan públicos o haya permiso del cliente. Las demos en vivo (`link`) sí son públicas y verificadas (Palaliga, Hogarly, La Casa de Ramona, Estrella Brothers).
- Imágenes de proyectos en `public/projects/*.webp` (optimizadas con sharp vía `scripts/optimizar-imagenes.mjs`). DropWear y Hogarly usan logo/branding; el resto, capturas o foto real. Si se añade un proyecto nuevo, convertir la imagen a WebP igual; no subir PNG de 1-2 MB.
- El sitemap excluye `/components` (catálogo interno) vía `filter` en `astro.config.mjs`, y `robots.txt` lo tiene en `Disallow`. La página 404 la excluye la integración automáticamente.
- SEO por hacer: JSON-LD (Person), y una imagen OG dedicada de 1200×630 (hoy `og:image` usa `/david-ramirez.png`, que se conserva en PNG precisamente para eso — los crawlers manejan mal WebP).
- Contenido pendiente: perfil de LinkedIn (icono comentado en `Hero.astro`), imagen OG dedicada 1200×630, y opcionalmente reemplazar el logo de DropWear/Hogarly por capturas reales de la UI.
- Dependencias de febrero 2024: Astro 4.4 (existe Astro 5) y Tailwind 3.4 (existe v4). Actualizar con calma en una rama.

## Origen

Fork/personalización de la plantilla open source [midudev/porfolio.dev](https://github.com/midudev/porfolio.dev) (licencia MIT, ver `LICENSE.md`).
