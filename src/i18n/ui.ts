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
      "<strong>Desarrollador de Software Full Stack</strong> y freelancer. Construyo soluciones integrales de extremo a extremo: desde aplicaciones móviles con <strong>Flutter</strong> hasta sistemas con <strong>Inteligencia Artificial</strong> y reconocimiento facial. Estudiante de Ingeniería en Sistemas.",
    "hero.contact": "Contáctame",

    "project.viewLive": "Ver en vivo",
    "project.code": "Código",

    "about.p1":
      "¡Hola! Soy David, un desarrollador apasionado por la resolución de problemas a través del código. Mi camino en el desarrollo de software comenzó hace dos años, y desde 2023 complemento esta pasión con mis estudios en <strong>Ingeniería en Sistemas Computacionales</strong>.",
    "about.p2":
      "Mi enfoque es versátil: me siento igual de cómodo diseñando interfaces intuitivas como optimizando consultas en bases de datos SQL o desarrollando APIs en Python. Como freelancer, me especializo en digitalizar negocios locales en mi ciudad, <strong>Puerto Peñasco</strong>.",
    "about.p3":
      "Me motiva ver cómo una aplicación o una web bien construida puede transformar la operación de un negocio. Mi stack es diverso (<strong>Flutter, TypeScript, Python, C#, Astro</strong>), lo que me permite elegir la herramienta adecuada para cada reto, ya sea en el frontend, backend, la gestión de bases de datos o la integración de <strong>Inteligencia Artificial</strong>.",

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
      "<strong>Full Stack Software Developer</strong> and freelancer. I build complete, end-to-end solutions — from mobile apps with <strong>Flutter</strong> to systems powered by <strong>Artificial Intelligence</strong> and facial recognition. Systems Engineering student.",
    "hero.contact": "Contact me",

    "project.viewLive": "View live",
    "project.code": "Code",

    "about.p1":
      "Hi! I'm David, a developer passionate about solving problems through code. My journey in software development began two years ago, and since 2023 I've complemented that passion with my studies in <strong>Computer Systems Engineering</strong>.",
    "about.p2":
      "My approach is versatile: I'm equally comfortable designing intuitive interfaces, optimizing SQL database queries, or building APIs in Python. As a freelancer, I specialize in digitizing local businesses in my city, <strong>Puerto Peñasco</strong>.",
    "about.p3":
      "It motivates me to see how a well-built app or website can transform how a business operates. My stack is diverse (<strong>Flutter, TypeScript, Python, C#, Astro</strong>), which lets me pick the right tool for each challenge — whether on the frontend, backend, database management, or integrating <strong>Artificial Intelligence</strong>.",

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
