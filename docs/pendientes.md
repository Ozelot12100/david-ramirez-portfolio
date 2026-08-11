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

### 2. Enlazar LinkedIn en el Hero

**El contenido ya está redactado** (titular, "Acerca de", experiencia, aptitudes y banner
1584×396, en ES y EN) — ver "Activos de marca" abajo. Falta que David lo pegue en LinkedIn
y pase la URL del perfil.

- **Cuando haya URL:** `Hero.astro` hoy solo tiene Mail y GitHub. El componente
  `src/components/icons/LinkedIn.astro` ya existe (solo se usa en el catálogo
  `components.astro` con un placeholder `midudev`). Importar el icono en `Hero.astro` y
  añadir un `<SocialPill href="https://linkedin.com/in/…">`, patrón idéntico al de GitHub.
- **Nota:** la edición de LinkedIn **no se puede automatizar** (sus términos prohíben el
  acceso automatizado y arriesgan la cuenta). El trabajo es de redacción; David copia y pega.

### 3. Cambiar el correo de contacto al del dominio

Cuando `david@davidramirez.com.mx` esté activo (Cloudflare Email Routing → reenvío al Gmail),
sustituir `garrapatin12100@gmail.com` en los **4 sitios** donde aparece:

| Archivo | Línea aprox. | Contexto |
| --- | --- | --- |
| `src/components/Hero.astro` | 20 | botón "Contáctame" |
| `src/components/Hero.astro` | 38 | `SocialPill` de Mail |
| `src/components/Footer.astro` | 33 | enlace del pie |
| `src/components/Header.astro` | 34 | ítem "Contacto" del nav |

> ⚠️ **Es urgente si ya se imprimieron tarjetas:** la tarjeta de presentación lleva impreso
> `david@davidramirez.com.mx`. Mientras esa cuenta no exista, los correos rebotan.
>
> El conector MCP de Cloudflare **no puede** activarlo: tiene permisos de DNS pero no de
> Email Routing (`10000: Authentication error` en los 3 endpoints, mientras la lectura de DNS
> sí funciona). Además Cloudflare exige verificar el destino por correo, así que el paso es
> manual de todas formas.

## Prioridad media

### 4. Evaluar proyectos nuevos para la sección Proyectos

`c:\dev` ya tiene más trabajo que los 6 proyectos publicados. Evaluación (**agosto 2026**)
de los candidatos, para no repetir el análisis:

| Proyecto | Estado real | Veredicto |
| --- | --- | --- |
| **ClipCourt** (`clipcourt`) | Backend MVP completo, bucle edge→clip→PWA→panel funcionando en dev. **Sin desplegar** (`ESTADO.md`: falta edge real y despliegue) | ⭐ El más fuerte técnicamente: multi-tenant white-label, vídeo H.265/4K, edge Python+FFmpeg, monorepo de 4 apps (NestJS+Prisma, PWA, panel, super-admin), RLS de doble candado, Cloudflare R2. Cliente real: Desert Club. **Entra sin `link`** (como Rocky Sushi/DropWear), capturando la PWA en local |
| **CostaPay** (`billpayment app`) | 🟢 Producción: <https://costapay.app> | ⭐ Landing muy pulida, bilingüe ES/EN, Next.js + Supabase + next-intl. Ojo: es **MVP de demostración sin dinero real** — describirlo con honestidad |
| **Inventario San José** (`San_Jose_administraci-n_stock`) | 🟢 Producción: <https://san-jose-inventario.vercel.app> | ⭐ Cliente real (clínicas). **Flutter Web** PWA + Supabase multi-tenant, ledger inmutable, RPCs transaccionales con `FOR UPDATE`. Complementa el Flutter móvil de Palaliga. Es login: requiere captura con datos |
| **La Zona FC** (`la-zona-fc-web`) | 🟢 Producción: <https://lazonafc.com> | Identidad de marca muy lograda (Astro 7 + Tailwind 4). Pero sería el **3.er sitio de "presencia digital"** tras Ramona y Estrella — aporta poca variedad, y su contenido aún es de ejemplo |
| **Queor** (`Finanzas-personales`) | 🟢 Producción: <https://queor.vercel.app> | Diseño "terminal" distintivo y buena ingeniería de invariantes, pero es **proyecto personal**, no de cliente: vende menos servicios |
| **Palenque P2P** (`palenque-p2p`) | 🟡 Staging: <https://palenque-p2p.vercel.app> | ⛔ **No publicar.** Apuestas sobre peleas de gallos: actividad ilegal en EE. UU. (delito federal), y el portafolio se dirige explícitamente a clientes de **México y Estados Unidos**. El riesgo reputacional supera al mérito técnico |

**Recomendación:** el portafolio ya muestra 6 proyectos; pasar de 8 alarga demasiado el
scroll. Añadir **ClipCourt** (capacidad única: vídeo/edge/multi-tenant) y **uno** de
CostaPay / San José, según qué se quiera vender.

### 5. JSON-LD (Person)

Añadir datos estructurados `schema.org/Person` en `Layout.astro` (nombre, rol, URL,
`sameAs` con GitHub/LinkedIn, ubicación) para rich results.

### 6. Imagen OG dedicada 1200×630

Hoy `og:image` usa `/david-ramirez.png` (por eso ese archivo se conserva en **PNG**: los
crawlers manejan mal WebP). Diseñar una imagen OG 1200×630 y apuntar `og:image` y
`twitter:image` a ella en `Layout.astro`.

## Prioridad baja — mantenimiento técnico

### 7. Upgrade de dependencias

Astro 4.4 → 5 y Tailwind 3.4 → 4. Hacerlo **en una rama**, con calma, verificando el build
(`astro check`) y el render en ambos idiomas y en modo oscuro.

## Activos de marca (fuera del repo)

Materiales generados en agosto 2026 que **no se versionan aquí** pero forman parte de la
identidad. Están en `C:\Users\CUENT\Desktop\tarjeta-presentacion\`:

| Archivo | Qué es |
| --- | --- |
| `tarjeta-DavidRamirez-imprenta.pdf` | Tarjeta 90×50 mm + 3 mm de rebase, 2 páginas (frente/reverso), vectorial |
| `IMPRENTA-{frente,reverso}-300dpi.png` | Misma tarjeta rasterizada — respaldo sin riesgo de sustitución de fuentes |
| `LINKEDIN-banner-1584x396.png` | Banner de LinkedIn a juego |
| `REFERENCIA-*.png` | Capturas de referencia para pedir variantes a un generador de imágenes |

Comparten la identidad del sitio: fondo `#0A1020`, acento `#FACC15` y tipografía **Onest**
(la misma de la web, incrustada desde `node_modules/@fontsource-variable/onest`).

**El QR de la tarjeta apunta a `davidramirez.com.mx/?utm_source=tarjeta`**, así que las
visitas desde la tarjeta se pueden medir en Vercel Analytics. Un QR debe generarse con una
librería real (aquí, `qrcode`) y **verificarse decodificándolo**: los generadores de imágenes
por IA producen patrones que parecen QR pero no escanean.

## Hecho reciente

- ✅ **Tarjeta de presentación y kit de LinkedIn** (ago 2026) — ver "Activos de marca".
- ✅ **Nav móvil**: la píldora se centraba sin `overflow`, así que en móvil el primer enlace
  caía fuera de pantalla ("Experiencia" se leía "…eriencia"). Ahora `.nav-pill` contiene un
  `nav` desplazable y los toggles quedan fuera de él — si no, `overflow-x` recortaba el menú
  del selector de tema.
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

---

**Plantilla para pedir testimonio + recomendación a un cliente:**
> Hola [nombre] 👋 Estoy armando mi portafolio y me encantaría incluir tu opinión sobre el
> proyecto que hicimos. ¿Me podrías mandar 1-2 frases sobre cómo fue trabajar conmigo y el
> resultado? Si te animas, también me ayudaría muchísimo una recomendación en LinkedIn (te
> paso el link). ¡Gracias!
