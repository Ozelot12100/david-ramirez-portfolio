# Pendientes y roadmap

Backlog vivo del portafolio. **Fuente única** de tareas pendientes: el resto de la
documentación y `CLAUDE.md` apuntan aquí. Al completar algo, muévelo a "Hecho reciente".

## Prioridad alta — prueba social y presencia profesional

### 1. Sección de Testimonios en el portafolio

Añadir una sección **"Testimonios / Testimonials"** (bilingüe, con el estilo de las
tarjetas existentes) con opiniones de clientes reales.

- **Por qué:** la prueba social es de los factores que más convierten para un freelancer.
- **Curado, no formulario:** el sitio es estático → nada de formularios públicos de reseñas
  (necesitarían backend y, además, conviene moderar lo que se muestra). David recolecta las
  frases por WhatsApp/correo y se agregan al componente.
- **Contenido a reunir** (por cliente): 1-2 frases, nombre, rol/empresa, logo o foto.
  Clientes candidatos: Rocky Sushi, Palaliga, Hogarly, La Casa de Ramona, Estrella Brothers,
  DropWear.
- **Implementación:** nuevo `src/components/Testimonials.astro` con un array `TESTIMONIALS`
  (la cita en `{ es, en }`; nombre/empresa suelen ser iguales en ambos idiomas); añadirlo a
  `HomeSections.astro`; el título de la sección en `src/i18n/ui.ts` (`ui.es`/`ui.en`); y, si
  se quiere ancla, un enlace "Testimonios" en `Header.astro`.
- **Complemento externo:** pedir a esos mismos clientes una **recomendación en LinkedIn**
  (verificable, ligada a su identidad real). Ver plantilla al final.

### 2. Dejar LinkedIn presentable y enlazarlo

- **Redactar** (bilingüe, alineado con el pitch del portafolio): titular, "Acerca de",
  descripciones de experiencia, sección Destacado (enlazar portafolio + demos), orden de
  aptitudes. Opcional: banner 1584×396.
- **Enlazar en el Hero:** hoy `Hero.astro` solo tiene Mail y GitHub. El componente
  `src/components/icons/LinkedIn.astro` ya existe (solo se usa en el catálogo
  `components.astro` con un placeholder `midudev`). Cuando haya URL de perfil: importar el
  icono en `Hero.astro` y añadir un `<SocialPill href="https://linkedin.com/in/…">` (patrón
  idéntico al de GitHub).
- **Nota:** la edición de LinkedIn **no se puede automatizar** (sus términos prohíben el
  acceso automatizado y arriesgan la cuenta). El trabajo es de redacción; David copia y pega.

**Plantilla para pedir testimonio + recomendación a un cliente:**
> Hola [nombre] 👋 Estoy armando mi portafolio y me encantaría incluir tu opinión sobre el
> proyecto que hicimos. ¿Me podrías mandar 1-2 frases sobre cómo fue trabajar conmigo y el
> resultado? Si te animas, también me ayudaría muchísimo una recomendación en LinkedIn (te
> paso el link). ¡Gracias!

## Prioridad media — SEO

### 3. JSON-LD (Person)

Añadir datos estructurados `schema.org/Person` en `Layout.astro` (nombre, rol, URL,
`sameAs` con GitHub/LinkedIn, ubicación) para rich results.

### 4. Imagen OG dedicada 1200×630

Hoy `og:image` usa `/david-ramirez.png` (por eso ese archivo se conserva en **PNG**: los
crawlers manejan mal WebP). Diseñar una imagen OG 1200×630 y apuntar `og:image` y
`twitter:image` a ella en `Layout.astro`.

## Prioridad baja — mantenimiento técnico

### 5. Upgrade de dependencias

Astro 4.4 → 5 y Tailwind 3.4 → 4. Hacerlo **en una rama**, con calma, verificando el build
(`astro check`) y el render en ambos idiomas y en modo oscuro.

## Hecho reciente

- ✅ **Web Analytics de Vercel** — instalado (`@vercel/analytics`, `<Analytics />` en
  `Layout.astro`) y **activado** en el dashboard del proyecto (jul 2026). Recoge visitas y
  los parámetros UTM de los footers de los sitios de cliente.
- ✅ **Capturas reales de UI** para DropWear (panel "Resumen Ejecutivo" del rediseño) y
  Hogarly (landing en vivo) — reemplazó el logo/branding anterior. Las 6 tarjetas muestran
  ya producto o foto real.
- ✅ **Créditos con UTM** "Diseñado y desarrollado por David A. Ramírez" en los footers de
  los sitios de cliente (lacasaderamona, estrellabrothers, dropwear, palaliga, hogarly,
  barcopirata), enlazando al portafolio.
- ✅ **Sitio bilingüe ES/EN** (i18n nativo de Astro).
- ✅ **DNS en Cloudflare** recreado (jun 2026) — ver [dominio-y-dns.md](./dominio-y-dns.md).
