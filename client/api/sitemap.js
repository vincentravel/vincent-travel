const SITE_URL = (process.env.VITE_SITE_URL || 'https://client-beige-phi-94.vercel.app').replace(/\/$/, '');
const API_URL = process.env.VITE_API_URL || 'https://server-nine-rust-34.vercel.app/api';

const STATIC_ROUTES = ['', '/paquetes'];

function escapeXml(value) {
  return String(value).replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]));
}

export default async function handler(req, res) {
  let packages = [];
  try {
    const apiRes = await fetch(`${API_URL}/packages`);
    const data = await apiRes.json();
    packages = data.packages || [];
  } catch {
    // si falla el fetch, igual devolvemos el sitemap con las rutas estáticas
  }

  const urls = [
    ...STATIC_ROUTES.map((route) => ({ loc: `${SITE_URL}${route}`, changefreq: 'weekly', priority: route === '' ? '1.0' : '0.9' })),
    ...packages.map((p) => ({
      loc: `${SITE_URL}/paquetes/${p.slug}`,
      lastmod: p.updatedAt ? new Date(p.updatedAt).toISOString() : undefined,
      changefreq: 'weekly',
      priority: '0.8',
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${escapeXml(u.loc)}</loc>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.status(200).send(xml);
}
