# Tareas para Gemini

Archivo de trabajo compartido. **Gemini ejecuta, Claude coordina y revisa.**

## Cómo funciona

1. **Claude** escribe aquí las tareas (sección *Tareas asignadas*), con datos exactos y
   criterios de aceptación.
2. **Gemini** lee este archivo, hace el trabajo y **escribe su reporte** al final, en
   *Bitácora de trabajo*, con el formato indicado. No borra tareas ni reescribe el brief:
   solo añade su reporte y marca el estado.
3. **Claude** lee la bitácora, revisa contra los criterios y decide si cierra la tarea o
   pide correcciones.

> **Gemini: si algo del brief te bloquea o crees que está mal, no lo adivines.**
> Anótalo en tu reporte como `Bloqueado` o `Duda` y sigue con lo que sí puedas hacer.
> Un dato inventado (un correo, una medida) cuesta más que una pregunta.

---

## Contexto permanente

**Cliente:** David Alberto Ramírez Vargas — desarrollador de software full stack y
freelancer, Puerto Peñasco, Sonora, México. Trabaja para negocios en **México y Estados
Unidos**.

**Portafolio:** <https://davidramirez.com.mx> (Astro + Tailwind, bilingüe ES/EN).

**Objetivo comercial:** conseguir clientes. Mucha gente le pregunta *"¿a qué te dedicas?"*,
así que los materiales deben responder eso **en español llano**, sin jerga técnica. "Full
Stack" no le dice nada al dueño de un restaurante.

### Identidad visual (no la cambies sin avisar)

| Elemento | Valor | Uso |
| --- | --- | --- |
| Fondo | `#0A1020` | Azul-noche muy oscuro, con sesgo azul (no negro puro) |
| Acento | `#FACC15` | Amarillo. **Único** color de acento |
| Texto principal | `#FFFFFF` | Blanco puro |
| Texto secundario | `#8FA0C0` | Gris azulado, para datos de menor jerarquía |
| Tipografía | **Onest** | Geométrica redondeada. Alternativas: Poppins, Sora |

Estos valores vienen del sitio web, no son decorativos: la tarjeta, el portafolio y LinkedIn
tienen que verse como la misma persona. Hay una captura del sitio en
`C:\Users\CUENT\Desktop\tarjeta-presentacion\REFERENCIA-1-portafolio-hero.png`.

### Datos de contacto — copia exacta, no los reescribas

```
Nombre:     David A. Ramírez
Rol:        Desarrollador de Software
Web:        davidramirez.com.mx
Correo:     david@davidramirez.com.mx
WhatsApp:   +52 638 384 0668
Ubicación:  Puerto Peñasco, Son.
```

Cuidado con los acentos: **Ramírez**, **Peñasco**. Un acento perdido en algo impreso no se
corrige después.

### Reglas permanentes

1. ⛔ **Nunca generes un código QR.** Los modelos de imagen producen patrones que *parecen*
   QR pero no escanean. Ya hay QR reales, verificados y funcionando, en
   `C:\Users\CUENT\Desktop\tarjeta-presentacion\`:
   - `QR-negro-transparente.png` — para colocar sobre fondo claro
   - `QR-sobre-placa-blanca.png` — el más fiable para impresión

   Ambos apuntan a `davidramirez.com.mx/?utm_source=tarjeta` (ese parámetro permite medir
   cuánta gente escanea la tarjeta). **Insértalos como imagen**; si no puedes, deja el hueco
   en blanco con las medidas indicadas.
2. ⛔ **No inventes datos.** Ni correos, ni teléfonos, ni títulos, ni URLs.
3. ✅ **Respeta las medidas de imprenta al milímetro.** Si entregas 96.4 mm en vez de 96, el
   corte queda descuadrado.
4. ✅ **Reporta siempre**, aunque la tarea salga perfecta.

---

## Tareas asignadas

### T-01 · Diseñar la tarjeta de presentación · 🔴 pendiente

Diseñar la tarjeta desde cero (el diseño anterior se descartó a propósito; no hay que
imitarlo).

**Especificaciones de imprenta — obligatorias:**

| Dato | Valor |
| --- | --- |
| Tamaño final (trim) | **90 × 50 mm** (estándar en México) |
| Rebase (bleed) | **3 mm por lado** → el archivo mide **96 × 56 mm** |
| Zona segura | Nada importante a menos de **5 mm** del corte |
| Resolución | **300 dpi** → 1134 × 661 px con rebase |
| Caras | 2 (frente y reverso), a color |
| Formato de entrega | PDF vectorial de 2 páginas **y** PNG 300 dpi por cara |

**Contenido del frente:**
- Nombre: `David A. Ramírez` — el elemento más grande
- Rol: `Desarrollador de Software`
- Una frase que responda "¿a qué se dedica?" en lenguaje de cliente, no de programador.
  Ejemplo de tono (puedes proponer otra): *"Apps, sistemas y sitios web a la medida de tu
  negocio."*
- Web: `davidramirez.com.mx`

**Contenido del reverso:**
- El QR (mínimo **22 × 22 mm**, idealmente 25 mm) con su zona de silencio blanca alrededor
- Una llamada a la acción corta, tipo *"Escanea y mira mi trabajo"*
- Correo y WhatsApp
- Ubicación

**Criterios de aceptación** (así lo voy a revisar):
- [ ] Medidas exactas: 96 × 56 mm con rebase, 300 dpi
- [ ] Ortografía perfecta, con acentos correctos
- [ ] Zona segura respetada
- [ ] QR real insertado (no dibujado) y de al menos 22 mm
- [ ] Paleta e identidad respetadas
- [ ] El texto se lee sin esfuerzo a tamaño real (imprime una prueba en papel y míralo)

**Entrega en:** `C:\Users\CUENT\Desktop\tarjeta-presentacion\`, con nombres que empiecen por
`GEMINI-` para distinguirlos.

> ⚠️ **Aviso importante que debes conservar en tu reporte:** el correo
> `david@davidramirez.com.mx` **todavía no está activo**. Si David manda a imprimir antes de
> activarlo, los correos rebotarán. Recuérdaselo al entregar.

---

## Bitácora de trabajo

Gemini escribe aquí. **Lo más reciente arriba.** Formato:

```markdown
### [AAAA-MM-DD] T-01 — <título corto>
**Estado:** completada · parcial · bloqueada
**Qué hice:** (2-4 líneas, concreto)
**Archivos entregados:** (rutas completas)
**Decisiones que tomé:** (qué elegiste y por qué, sobre todo si te saliste del brief)
**Problemas / dudas para Claude:** (o "ninguno")
```

<!-- ↓↓↓ Gemini: escribe tu reporte debajo de esta línea ↓↓↓ -->

_(Sin reportes todavía.)_
