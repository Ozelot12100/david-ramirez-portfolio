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
- `src/pages/index.astro` es la única página real de contenido: importa y ensambla las secciones dentro de `Layout.astro`.
- `src/pages/components.astro` es un catálogo de componentes (design system), no parte del portafolio público.
- `Layout.astro` define `<head>`, el fondo con gradiente, `Header`, `Footer`, estilos globales y las View Transitions.
- Alias de import: `@/*` → `src/*` (ver `tsconfig.json`). Algunos componentes usan rutas relativas; ambas conviven.

## Dónde vive el contenido

No hay CMS ni archivos de datos. El contenido está **hardcodeado dentro de cada componente**, normalmente como arrays/objetos en el frontmatter:

- `Hero.astro` — nombre, pitch, email, enlaces sociales.
- `Experience.astro` — array `EXPERIENCE`.
- `Projects.astro` — objeto `TAGS` (tecnologías) y array `PROJECTS`.
- `AboutMe.astro` — biografía (texto en el markup).
- `Header.astro` / `Footer.astro` — navegación, email de contacto.

Fuente de verdad del contenido redactado: `Info para Portafolio David Alberto.md`.

Imágenes en `public/` (servidas en la raíz): `david-ramirez.png` (perfil), `projects/*.png`.

## Convenciones

- Estilos: utilidades de Tailwind inline en el markup. Modo oscuro vía clases `dark:` (`darkMode: 'class'`).
- Iconos: cada icono es un componente `.astro` en `src/components/icons/` que acepta props (p. ej. `class="size-4"`) y las pasa al `<svg>`.
- Componentes nuevos: seguir el patrón existente (frontmatter con `interface Props`, `Astro.props`).

## Notas y deuda técnica conocida

- **Los repos de los proyectos mostrados son privados** (trabajos pagados por clientes). Por eso las entradas de `PROJECTS` tienen `github: ""` — el botón "Code" solo se renderiza si hay URL. No volver a enlazar esos repos salvo que se hagan públicos o haya permiso del cliente.
- Imágenes de proyectos en `public/projects/*.webp` (optimizadas con sharp, 1200px de ancho, q80). Si se añade un proyecto nuevo, convertir la captura a WebP igual; no subir PNG de 1-2 MB.
- El sitemap excluye `/components` (catálogo interno) vía `filter` en `astro.config.mjs`, y `robots.txt` lo tiene en `Disallow`. La página 404 la excluye la integración automáticamente.
- SEO por hacer: JSON-LD (Person), y una imagen OG dedicada de 1200×630 (hoy `og:image` usa `/david-ramirez.png`, que se conserva en PNG precisamente para eso — los crawlers manejan mal WebP).
- Contenido pendiente (ver `Info para Portafolio David Alberto.md`): sección Skills, proyecto "Checador Facial con IA", perfil de LinkedIn (icono comentado en `Hero.astro`).
- Dependencias de febrero 2024: Astro 4.4 (existe Astro 5) y Tailwind 3.4 (existe v4). Actualizar con calma en una rama.

## Origen

Fork/personalización de la plantilla open source [midudev/porfolio.dev](https://github.com/midudev/porfolio.dev) (licencia MIT, ver `LICENSE.md`).
