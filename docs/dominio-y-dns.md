# Dominio y DNS

## Arquitectura

```
Navegador → DNS (Cloudflare) → Vercel (hosting) → sitio estático (dist/)
```

- **Dominio:** `davidramirez.com.mx` (producción: `www.davidramirez.com.mx`)
- **DNS:** Cloudflare — nameservers `hattie.ns.cloudflare.com` y `reese.ns.cloudflare.com`
  - Zona: `davidramirez.com.mx` · Zone ID: `d04ef4468d7d2eb73a5ed85dd224a32b`
  - Cuenta Cloudflare: la de `garrapatin12100@gmail.com` (ID `6d96d54ef16e0f297575b503891a6177`)
- **Hosting:** Vercel — proyecto `david-ramirez-portfolio`, equipo *david's projects* (`davids-projects-e4cce3ca`)

## Registros DNS requeridos

Estos son los **únicos** registros que el sitio necesita para funcionar. Deben existir en
Cloudflare → `davidramirez.com.mx` → **DNS → Records**:

| Tipo  | Nombre (Name) | Contenido (Target/Content) | Proxy status | TTL  |
| ----- | ------------- | -------------------------- | ------------ | ---- |
| CNAME | `www`         | `cname.vercel-dns.com`     | **DNS only** (nube gris) | Auto |
| A     | `@`           | `76.76.21.21`              | **DNS only** (nube gris) | Auto |

> 🔑 **El proxy debe quedar en "DNS only" (nube GRIS), no "Proxied" (naranja).**
> Con el proxy naranja, Cloudflare se interpone entre el visitante y Vercel: el
> certificado SSL de Vercel no se puede emitir/renovar y aparecen errores de SSL o
> bucles de redirección. Con DNS only, Vercel gestiona el certificado automáticamente.

Si Vercel muestra valores distintos en *Project → Settings → Domains* (p. ej. otro
CNAME o TXT de verificación `_vercel`), **los del panel de Vercel mandan**.

## Verificar que todo está bien

1. **DNS resuelve:**
   ```bash
   nslookup www.davidramirez.com.mx   # debe devolver IPs (vía cname.vercel-dns.com)
   ```
   O en el navegador: <https://dns.google/resolve?name=www.davidramirez.com.mx&type=A>
2. **Vercel valida el dominio:** Vercel → proyecto → *Settings → Domains* →
   `www.davidramirez.com.mx` debe decir **"Valid Configuration"** (usa el botón *Refresh*).
3. **El sitio carga con candado (SSL):** `https://www.davidramirez.com.mx` y
   `https://davidramirez.com.mx` (el apex redirige a `www`).

La propagación con Cloudflare suele tardar de 1 a 5 minutos.

## Si "no carga la página" — checklist en orden

1. **¿Resuelve el DNS?** (paso 1 de arriba). Si no resuelve → falta(n) los registros de
   la tabla o los borraron. Este fue el problema en **junio 2026**: la zona de Cloudflare
   estaba activa pero **sin ningún registro**, mientras el deployment de Vercel estaba
   perfectamente sano. Recrear los registros lo arregla.
2. **¿El deployment está READY?** Vercel → proyecto → *Deployments*. Si el último build
   falló, ver [despliegue-vercel.md](./despliegue-vercel.md).
3. **¿Error de SSL o redirección infinita?** Casi seguro el registro quedó en modo
   *Proxied* (naranja) — cambiarlo a *DNS only* (gris).
4. **¿El dominio expiró?** Revisar el registrador del `.com.mx` y en Cloudflare → Overview
   que la zona siga *Active*.

## Acceso por API / MCP (para automatizar)

- El conector MCP de Cloudflare conectado a Claude con OAuth puede quedar en **solo
  lectura** (listar zonas/registros funciona, crear/editar devuelve
  `10000: Authentication error`). Para escritura, re-autorizar el conector concediendo
  permisos de edición de DNS, o usar un **API token** con la plantilla *"Edit zone DNS"*
  limitado a la zona `davidramirez.com.mx`
  ([dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)).
  Revocar el token después de usarlo.
- Creación de los registros por API REST:
  ```bash
  # CNAME www → Vercel
  curl -X POST "https://api.cloudflare.com/client/v4/zones/d04ef4468d7d2eb73a5ed85dd224a32b/dns_records" \
    -H "Authorization: Bearer $CF_TOKEN" -H "Content-Type: application/json" \
    --data '{"type":"CNAME","name":"www","content":"cname.vercel-dns.com","proxied":false,"ttl":1}'

  # A apex → Vercel
  curl -X POST "https://api.cloudflare.com/client/v4/zones/d04ef4468d7d2eb73a5ed85dd224a32b/dns_records" \
    -H "Authorization: Bearer $CF_TOKEN" -H "Content-Type: application/json" \
    --data '{"type":"A","name":"@","content":"76.76.21.21","proxied":false,"ttl":1}'
  ```

## Historial de incidentes

| Fecha | Síntoma | Causa | Solución |
| --- | --- | --- | --- |
| jun 2026 | El dominio no cargaba (NXDOMAIN); "antes funcionaba" | La zona de Cloudflare quedó **sin registros DNS** (apex sin A, `www` inexistente). Build y deployment de Vercel sanos. | **Resuelto (30 jun 2026):** se recrearon los 2 registros de la tabla vía API (conector MCP de Cloudflare con permisos de escritura). DNS propagado en <5 min; el SSL lo re-emitió Vercel automáticamente al detectar el DNS válido. |
