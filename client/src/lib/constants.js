// Una vez conectado el dominio propio (vincentravel.tur.ar), definir VITE_SITE_URL
// en las variables de entorno de Vercel con ese dominio para que el SEO lo use.
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://client-beige-phi-94.vercel.app').replace(/\/$/, '');

// Devuelve la imagen de portada de un paquete: la marcada como "isCover", o si no hay
// ninguna marcada (paquetes viejos), la primera de la lista. Así nada se rompe con datos previos.
export function getCoverImage(pkg) {
  if (!pkg?.images?.length) return null;
  return pkg.images.find((img) => img.isCover) || pkg.images[0];
}

export const CATEGORIES = [
  { value: 'egresados-primarios', label: 'Egresados Primarios' },
  { value: 'egresados-secundarios', label: 'Egresados Secundarios' },
  { value: 'estudiantiles', label: 'Viajes Educativos' },
  { value: 'nacionales', label: 'Viajes Nacionales' },
  { value: 'internacionales', label: 'Viajes Internacionales' },
  { value: 'quince', label: 'Viajes de 15' },
];

export const CATEGORY_LABELS = CATEGORIES.reduce((acc, c) => {
  acc[c.value] = c.label;
  return acc;
}, {});

export const LOGO_URL = 'https://res.cloudinary.com/f2g59ctl/image/upload/v1789396117/vincent-travel/brand/yj0jqx79qlwffygqmlbu.png';

export const HERO_VIDEO_URL =
  'https://res.cloudinary.com/f2g59ctl/video/upload/v1789396122/vincent-travel/brand/vlilmeabhkshjfi2ife2.mp4';

// Número general/comercial: se usa en todo el sitio (Hero, Navbar, Contacto, botón flotante,
// y las consultas por paquete) salvo Viajes de 15, que tiene su propia línea.
export const WHATSAPP_NUMBER = '5493812123869';
// Línea dedicada a Viajes de 15.
export const WHATSAPP_NUMBER_QUINCE = '5493816378328';

export function buildWhatsAppLink(message, number = WHATSAPP_NUMBER) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${text}`;
}

// Devuelve el número que corresponde según las categorías de un paquete.
export function whatsappNumberForCategories(categories = []) {
  return categories.includes('quince') ? WHATSAPP_NUMBER_QUINCE : WHATSAPP_NUMBER;
}

export const WHATSAPP_MESSAGES = {
  general: 'Hola Vincent Travel! Quiero recibir información sobre sus viajes.',
  contacto: 'Hola! Vengo de la página web y quiero hacer una consulta.',
  package: (title) => `Hola! Me interesa el paquete "${title}". ¿Me pasan más información?`,
};

export const BRANCHES = [
  {
    name: 'Casa Central',
    address: '9 de Julio 188, San Miguel de Tucumán',
    hours: 'Lunes a Viernes de 9 a 13 y de 17 a 21 hs · Sábados de 9 a 13 hs',
  },
  {
    name: 'Sucursal Concepción',
    address: 'Alfonsín 1445, Concepción, Tucumán',
    hours: 'Lunes a Viernes de 9 a 13 y de 17 a 21 hs',
  },
];

export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/vincent.travel.oficial/',
  facebook: 'https://www.facebook.com/vincentraveloficial/',
  tiktok: 'https://www.tiktok.com/@vincenttraveloficial',
  youtube: 'https://www.youtube.com/@Vincentraveloficial/shorts',
};

// Todas las cuentas de redes sociales de la agencia. "scope" indica a qué sector pertenece
// (oficial = general, se usa en Contacto y en los servicios que no tienen cuenta propia).
export const SOCIAL_ACCOUNTS = [
  { platform: 'instagram', scope: 'oficial', handle: '@vincent.travel.oficial', url: 'https://www.instagram.com/vincent.travel.oficial/' },
  { platform: 'facebook', scope: 'oficial', handle: 'vincentraveloficial', url: 'https://www.facebook.com/vincentraveloficial/' },
  { platform: 'tiktok', scope: 'oficial', handle: '@vincenttraveloficial', url: 'https://www.tiktok.com/@vincenttraveloficial' },
  { platform: 'youtube', scope: 'oficial', handle: '@Vincentraveloficial', url: 'https://www.youtube.com/@Vincentraveloficial/shorts' },

  { platform: 'instagram', scope: 'secundarios', handle: '@vincent.travel.secundarios', url: 'https://www.instagram.com/vincent.travel.secundarios/' },
  { platform: 'tiktok', scope: 'secundarios', handle: '@vincent.bariloche', url: 'https://www.tiktok.com/@vincent.bariloche' },
  { platform: 'youtube', scope: 'secundarios', handle: '@VincentBariloche', url: 'https://www.youtube.com/@VincentBariloche/shorts' },

  { platform: 'instagram', scope: 'primarios', handle: '@vincent.travel.primarios', url: 'https://www.instagram.com/vincent.travel.primarios/' },
  { platform: 'tiktok', scope: 'primarios', handle: '@vincentravel20', url: 'https://www.tiktok.com/@vincentravel20' },
];
