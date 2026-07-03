/**
 * Convierte imágenes PNG/JPG a WebP optimizado para el portafolio.
 *
 * Uso:
 *   node scripts/optimizar-imagenes.mjs <ruta-imagen> [ancho]
 *
 * Ejemplos:
 *   node scripts/optimizar-imagenes.mjs public/projects/NuevoProyecto.png
 *   node scripts/optimizar-imagenes.mjs public/foto.png 300
 *
 * Genera un .webp junto al original (el original NO se borra; bórralo a mano
 * cuando verifiques el resultado). Las capturas de proyectos se muestran a
 * ~450px de ancho, así que 1200px (el ancho por defecto) cubre pantallas retina.
 */
import sharp from "sharp";
import { statSync } from "node:fs";

const [, , input, widthArg] = process.argv;

if (!input) {
  console.error("Uso: node scripts/optimizar-imagenes.mjs <ruta-imagen> [ancho=1200]");
  process.exit(1);
}

const width = widthArg ? parseInt(widthArg, 10) : 1200;
const output = input.replace(/\.(png|jpe?g)$/i, ".webp");

if (output === input) {
  console.error("La imagen debe ser .png, .jpg o .jpeg");
  process.exit(1);
}

const pipeline = sharp(input);
const meta = await pipeline.metadata();
// no agrandar imágenes que ya son más pequeñas que el ancho pedido
if (meta.width > width) pipeline.resize({ width });
await pipeline.webp({ quality: 80 }).toFile(output);

const kb = (p) => (statSync(p).size / 1024).toFixed(0) + " KB";
console.log(`${input} (${kb(input)}) → ${output} (${kb(output)})`);
