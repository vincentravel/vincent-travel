import { useEffect } from 'react';
import { LOGO_URL, SITE_URL } from '../../lib/constants';

const SITE_NAME = 'Vincent Travel';
const DEFAULT_DESCRIPTION =
  'Agencia de viajes en San Miguel de Tucumán con más de 17 años de trayectoria. Viajes de egresados, educativos, nacionales, internacionales y de 15.';

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function removeMeta(attr, key) {
  document.head.querySelector(`meta[${attr}="${key}"]`)?.remove();
}

function upsertCanonical(url) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', url);
}

function upsertJsonLd(data) {
  let el = document.getElementById('seo-jsonld');
  if (!data) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('script');
    el.id = 'seo-jsonld';
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

// Actualiza en el lugar los tags <title>/<meta> que ya vienen en index.html (en vez de
// agregar unos nuevos al lado), así nunca quedan duplicados ni desactualizados por ruta.
export default function SEO({ title, description = DEFAULT_DESCRIPTION, path = '', image = LOGO_URL, noindex = false, jsonLd }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Agencia de Viajes en Tucumán`;
    const url = `${SITE_URL}${path}`;

    document.title = fullTitle;
    upsertMeta('name', 'description', description);
    upsertCanonical(url);

    if (noindex) {
      upsertMeta('name', 'robots', 'noindex, nofollow');
    } else {
      removeMeta('name', 'robots');
    }

    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', image);

    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', image);

    upsertJsonLd(jsonLd);
  }, [title, description, path, image, noindex, jsonLd]);

  return null;
}
