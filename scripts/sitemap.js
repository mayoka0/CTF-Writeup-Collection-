const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://ctf-writeups.example.com'; // Replace with actual URL

function generateSitemap() {
  const contentDir = path.join(process.cwd(), 'content');
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx'));
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${files.map(file => {
    const slug = file.replace('.mdx', '');
    return `
  <url>
    <loc>${SITE_URL}/writeups/${slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }).join('')}
</urlset>`;

  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
  console.log('[+] Sitemap generated successfully in public/sitemap.xml');
}

if (!fs.existsSync(path.join(process.cwd(), 'public'))) {
  fs.mkdirSync(path.join(process.cwd(), 'public'));
}

generateSitemap();
