# Despliegue en Vercel

## Cómo funciona

Cada `git push` a `main` en GitHub (`Ozelot12100/david-ramirez-portfolio`) dispara
automáticamente un build y deployment de producción en Vercel. No hay pasos manuales.

- **Proyecto Vercel:** `david-ramirez-portfolio` · equipo *david's projects* (`davids-projects-e4cce3ca`)
- **Dashboard:** <https://vercel.com/davids-projects-e4cce3ca/david-ramirez-portfolio>
- **Framework preset:** Astro (autodetectado)
- **Install:** `pnpm install` (Vercel usa pnpm porque el repo versiona `pnpm-lock.yaml`)
- **Build:** `pnpm build` → ejecuta `astro check && astro build`
- **Output:** `dist/` (sitio 100% estático, sin funciones serverless)
- **Dominio de producción:** `www.davidramirez.com.mx` (ver [dominio-y-dns.md](./dominio-y-dns.md))

## Cosas que rompen el deploy (y cómo evitarlas)

1. **Errores de tipos.** `pnpm build` corre `astro check` primero: un error de tipos
   tumba el build en Vercel. **Ejecutar `pnpm build` en local antes de hacer push.**
2. **Lockfile desincronizado.** Vercel instala con lockfile congelado
   (`--frozen-lockfile`). Si cambias `package.json` sin regenerar `pnpm-lock.yaml`
   (es decir, sin usar `pnpm add/remove`), el install falla con
   `ERR_PNPM_OUTDATED_LOCKFILE`. **Añadir dependencias siempre con pnpm**, nunca
   editando `package.json` a mano ni con `npm install`.

## Ver por qué falló un build

Vercel → proyecto → **Deployments** → clic en el deployment rojo → **Build Logs**.
El error real suele estar en las últimas ~30 líneas.

## Rollback (volver a una versión anterior)

Vercel → proyecto → **Deployments** → menú `⋯` del último deployment bueno →
**Instant Rollback** (o *Promote to Production*). Es inmediato y no toca el repo;
después conviene arreglar `main` para que el siguiente push no re-despliegue el error.

## URLs

| URL | Qué es |
| --- | --- |
| `https://www.davidramirez.com.mx` | Producción (dominio propio) |
| `https://david-ramirez-portfolio-*.vercel.app` | URL interna de cada deployment (con protección de acceso de Vercel: pide login → redirección a `vercel.com/sso-api` es **normal**, no un error) |

> Nota: la protección de acceso en las URLs `*.vercel.app` internas hace que un `curl`
> devuelva `302 → vercel.com/sso-api`. El dominio de producción no pasa por eso.
