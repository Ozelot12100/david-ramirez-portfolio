# Mantenimiento del portafolio

## Flujo de trabajo estándar

```bash
pnpm install        # solo la primera vez o si cambió package.json
pnpm dev            # http://localhost:4321 — revisar el cambio en vivo
pnpm build          # OBLIGATORIO antes de push: astro check + build
git add ... && git commit && git push   # el push despliega a producción
```

> Si no tienes pnpm instalado globalmente: `npx pnpm@9 <comando>`.
> **No usar `npm install`** — desincroniza el lockfile y rompe el deploy (ver
> [despliegue-vercel.md](./despliegue-vercel.md)).

## Idiomas (ES / EN)

El sitio es bilingüe: **español en `/`, inglés en `/en/`**. Todo texto visible existe
en ambos idiomas, así que **cada cambio de contenido se hace en los dos**:

- Texto general (nav, títulos, Hero, biografía, footer, botones): `src/i18n/ui.ts`
  (objetos `ui.es` y `ui.en`).
- Contenido estructurado (proyectos, experiencia, skills): en su componente, con los
  campos como `{ es, en }`.

Prueba ambos con `pnpm dev`: `localhost:4321/` y `localhost:4321/en/`. El botón `ES/EN`
del encabezado alterna entre ellos.

## Dónde se edita cada cosa

| Quiero cambiar… | Archivo |
| --- | --- |
| Título/descripción SEO | `src/pages/index.astro` (props del `<Layout>`) |
| Nombre, pitch, botones de contacto | `src/components/Hero.astro` |
| Experiencia laboral | `src/components/Experience.astro` → array `EXPERIENCE` |
| Proyectos | `src/components/Projects.astro` → arrays `TAGS` y `PROJECTS` |
| Biografía | `src/components/AboutMe.astro` |
| Menú de navegación / email | `src/components/Header.astro` y `Footer.astro` |
| Meta tags OG / favicon | `src/layouts/Layout.astro` |

El texto de referencia vive en `Info para Portafolio David Alberto.md` (raíz del repo).
Mantenerlo sincronizado con lo que muestra la web.

## Añadir un proyecto nuevo

1. **Captura:** exportar una imagen del proyecto (idealmente 16:9, ≥1200px de ancho).
2. **Optimizar** (nunca subir PNG de 1–2 MB; el sitio usa WebP):
   ```bash
   node scripts/optimizar-imagenes.mjs public/projects/MiProyecto.png
   # genera MiProyecto.webp — borra el .png después de verificar
   ```
3. **Registrar** en `src/components/Projects.astro`, array `PROJECTS`. El sitio es
   bilingüe, así que `title`, `description` y `alt` van en los **dos idiomas**:
   ```js
   {
     title: { es: "Nombre del proyecto", en: "Project name" },
     description: {
       es: "Qué hace y qué problema resuelve.",
       en: "What it does and what problem it solves.",
     },
     link: "https://... o vacío",     // botón "Ver en vivo" (solo si hay demo pública)
     github: "",                        // ⚠️ ver nota de repos privados
     image: "/projects/MiProyecto.webp",
     alt: {
       es: "Descripción de la imagen para accesibilidad",
       en: "Image description for accessibility",
     },
     tags: [TAGS.FLUTTER, ...],         // añadir a TAGS si falta la tecnología
   }
   ```
4. Si la tecnología es nueva: crear el icono en `src/components/icons/` (SVG que
   acepte `class` por props, como los existentes) y darle entrada en `TAGS`.
5. `pnpm build` y push.

### ⚠️ Repos privados de clientes

Los 6 proyectos mostrados (Sistema Biométrico/Rocky Sushi, Palaliga, Hogarly, DropWear,
La Casa de Ramona, Estrella Brothers) son **trabajos pagados por clientes y sus repos son
privados**. Por eso tienen `github: ""` — el botón "Code" solo se renderiza cuando hay URL.
**No enlazar repos de clientes sin permiso escrito**: un enlace a un repo privado se ve
como 404 ante cualquier visitante, y hacer el repo público sin permiso puede violar el
acuerdo con el cliente.

## Checklist antes de dar por terminado un cambio

- [ ] `pnpm build` pasa sin errores ni warnings.
- [ ] Las imágenes nuevas son `.webp` y pesan < 100 KB.
- [ ] Los enlaces externos nuevos abren (sin 404) en una ventana de incógnito.
- [ ] El cambio se ve bien en móvil (`pnpm dev` + DevTools responsive) y en modo oscuro.

## Tareas pendientes conocidas

El backlog vivo está en **[pendientes.md](./pendientes.md)**: sección de testimonios,
dejar LinkedIn presentable y enlazarlo, JSON-LD (Person), imagen OG dedicada 1200×630, y
upgrade a Astro 5 / Tailwind 4.

> El portafolio muestra 6 proyectos (Sistema Biométrico/IA, Palaliga, Hogarly,
> DropWear, La Casa de Ramona, Estrella Brothers) y una sección de Tecnologías
> por categorías. El inventario completo de proyectos de David vive en `c:\dev`
> (hay más: homelab/DevOps, scripts de IA, ejercicios de CS) por si se quiere ampliar.
