export const languages = {
  es: "Español",
  en: "English",
} as const;

export const defaultLang = "es";
export type Lang = keyof typeof ui;

export const ui = {
  es: {
    "meta.title":
      "Portafolio de David A. Ramírez - Desarrollador de Software Full Stack & Freelancer",
    "meta.description":
      "Portafolio de David Alberto Ramírez Vargas. Desarrollador de Software Full Stack especializado en Flutter, Python, Inteligencia Artificial y soluciones web a medida.",

    "nav.experience": "Experiencia",
    "nav.projects": "Proyectos",
    "nav.tech": "Tecnologías",
    "nav.about": "Sobre mí",
    "nav.contact": "Contacto",

    "section.experience": "Experiencia laboral",
    "section.projects": "Proyectos",
    "section.tech": "Tecnologías",
    "section.about": "Sobre mí",

    "hero.badge": "Disponible para trabajar",
    "hero.pitch":
      "<strong>Desarrollador de Software Full Stack.</strong> Llevo productos completos de la idea a producción yo solo: <strong>backend con IA</strong>, apps móviles y de escritorio, e instaladores listos para el cliente. He construido desde un sistema de <strong>reconocimiento facial</strong> hasta plataformas SaaS multi-tenant, para negocios en <strong>México y Estados Unidos</strong>.",
    "hero.contact": "Contáctame",

    "project.viewLive": "Ver en vivo",
    "project.code": "Código",

    "about.p1":
      "Soy David, desarrollador de software full stack. Lo que me distingue: <strong>construyo productos completos de principio a fin</strong>, yo solo. Diseño la base de datos, levanto el backend, desarrollo la app móvil o de escritorio y la entrego empaquetada y desplegada, sin depender de un equipo para llevar una idea a producción.",
    "about.p2":
      "Mi trabajo va de lo complejo a lo comercial: un <strong>sistema de asistencia con reconocimiento facial (IA)</strong> en producción, plataformas <strong>SaaS multi-tenant</strong> en tiempo real y sitios web que convierten. Elijo la herramienta correcta para cada reto (<strong>Flutter, TypeScript, Python/FastAPI, C#</strong>), en frontend, backend, bases de datos o IA.",
    "about.p3":
      "Trabajo como freelancer para negocios en <strong>Puerto Peñasco y Estados Unidos</strong> —bilingüe y en el mismo huso horario que EE. UU.— mientras estudio <strong>Ingeniería en Sistemas Computacionales</strong>. Me mueve resolver problemas reales de negocio con software bien construido: rápido, mantenible y que de verdad se use.",

    "footer.about": "Sobre mí",
    "footer.contact": "Contacto",

    "lang.switchTo": "English",
    "lang.switchLabel": "Ver en inglés",

    "notFound.title": "Página no encontrada",
    "notFound.text": "La página que buscas no existe o fue movida.",
    "notFound.back": "Volver al inicio",
  },
  en: {
    "meta.title":
      "David A. Ramírez — Full Stack Software Developer & Freelancer",
    "meta.description":
      "Portfolio of David Alberto Ramírez Vargas. Full Stack Software Developer specialized in Flutter, Python, Artificial Intelligence and custom web solutions.",

    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.tech": "Technologies",
    "nav.about": "About",
    "nav.contact": "Contact",

    "section.experience": "Work experience",
    "section.projects": "Projects",
    "section.tech": "Technologies",
    "section.about": "About me",

    "hero.badge": "Available for work",
    "hero.pitch":
      "<strong>Full Stack Software Developer.</strong> I take complete products from idea to production on my own: <strong>AI-powered backends</strong>, mobile and desktop apps, and client-ready installers. I've built everything from a <strong>facial-recognition</strong> system to multi-tenant SaaS platforms, for businesses across <strong>Mexico and the United States</strong>.",
    "hero.contact": "Contact me",

    "project.viewLive": "View live",
    "project.code": "Code",

    "about.p1":
      "I'm David, a full stack software developer. What sets me apart: <strong>I build complete products end to end</strong>, on my own. I design the database, stand up the backend, build the mobile or desktop app, and ship it packaged and deployed — no team needed to take an idea to production.",
    "about.p2":
      "My work ranges from the complex to the commercial: a <strong>facial-recognition (AI) attendance system</strong> running in production, real-time <strong>multi-tenant SaaS</strong> platforms, and websites that convert. I pick the right tool for each challenge (<strong>Flutter, TypeScript, Python/FastAPI, C#</strong>) — across frontend, backend, databases, and AI.",
    "about.p3":
      "I work as a freelancer for businesses in <strong>Puerto Peñasco and the United States</strong> — bilingual, and in the same time zone as the U.S. — while studying <strong>Computer Systems Engineering</strong>. I'm driven by solving real business problems with well-built software: fast, maintainable, and actually used.",

    "footer.about": "About",
    "footer.contact": "Contact",

    "lang.switchTo": "Español",
    "lang.switchLabel": "View in Spanish",

    "notFound.title": "Page not found",
    "notFound.text": "The page you're looking for doesn't exist or was moved.",
    "notFound.back": "Back to home",
  },
} as const;

/** Deriva el idioma a partir del primer segmento de la ruta (/en/... → en). */
export function getLangFromUrl(url: URL): Lang {
  const [, maybeLang] = url.pathname.split("/");
  if (maybeLang in ui) return maybeLang as Lang;
  return defaultLang;
}

/** Devuelve la función de traducción para un idioma. */
export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/** Ruta lógica sin el prefijo de idioma (/en/algo → /algo, /en → /). */
export function getPathWithoutLang(url: URL): string {
  const segments = url.pathname.split("/");
  if (segments[1] in ui && segments[1] !== defaultLang) {
    segments.splice(1, 1);
  }
  const path = segments.join("/") || "/";
  return path === "" ? "/" : path;
}

/** Antepone el prefijo de idioma a una ruta que empieza con "/". */
export function localizePath(path: string, lang: Lang): string {
  if (lang === defaultLang) return path;
  return `/${lang}${path === "/" ? "/" : path}`;
}

/** URLs absolutas equivalentes en cada idioma (para hreflang/canonical). */
export function getAlternateUrls(url: URL, site: URL | undefined) {
  const base = site ?? new URL(`${url.protocol}//${url.host}`);
  const path = getPathWithoutLang(url);
  return {
    es: new URL(localizePath(path, "es"), base).href,
    en: new URL(localizePath(path, "en"), base).href,
  };
}
