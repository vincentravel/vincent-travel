export const CATEGORIES = [
  { value: 'egresados-primarios', label: 'Egresados Primarios' },
  { value: 'egresados-secundarios', label: 'Egresados Secundarios' },
  { value: 'estudiantiles', label: 'Viajes Estudiantiles' },
  { value: 'nacionales', label: 'Viajes Nacionales' },
  { value: 'internacionales', label: 'Viajes Internacionales' },
  { value: 'quince', label: 'Viajes de 15' },
];

export const CATEGORY_LABELS = CATEGORIES.reduce((acc, c) => {
  acc[c.value] = c.label;
  return acc;
}, {});

export const LOGO_URL = 'https://res.cloudinary.com/dabikk5ei/image/upload/v1788456765/logo_hyowdu.png';

export const HERO_VIDEO_URL =
  'https://res.cloudinary.com/dabikk5ei/video/upload/v1788455549/video_7861b9e7750f_evjpig_spskh4.mp4';

export const WHATSAPP_NUMBER = '5493816378328';

export function buildWhatsAppLink(message) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
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
  tiktok: 'https://www.tiktok.com/@vincent.bariloche',
};

// Todas las cuentas de redes sociales de la agencia (se listan completas en Contacto)
export const SOCIAL_ACCOUNTS = [
  { platform: 'instagram', handle: '@vincent.travel.oficial', url: 'https://www.instagram.com/vincent.travel.oficial/' },
  { platform: 'instagram', handle: '@vincent.travel.secundarios', url: 'https://www.instagram.com/vincent.travel.secundarios/' },
  { platform: 'instagram', handle: '@vincent.travel.primarios', url: 'https://www.instagram.com/vincent.travel.primarios/' },
  { platform: 'facebook', handle: 'vincentraveloficial', url: 'https://www.facebook.com/vincentraveloficial/' },
  { platform: 'tiktok', handle: '@vincentravel20', url: 'https://www.tiktok.com/@vincentravel20' },
  { platform: 'tiktok', handle: '@vincent.bariloche', url: 'https://www.tiktok.com/@vincent.bariloche' },
];
