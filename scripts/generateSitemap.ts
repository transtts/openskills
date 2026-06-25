import fs from 'fs';
import path from 'path';
import { initialSkills } from '../src/data';

const BASE_URL = 'https://www.openskills.in';

function generateSitemap() {
  const urls = [
    { loc: `${BASE_URL}/`, priority: '1.0', changefreq: 'daily' },
    { loc: `${BASE_URL}/#categories`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${BASE_URL}/#collections`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${BASE_URL}/#resources`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${BASE_URL}/#prompts`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${BASE_URL}/#submit`, priority: '0.7', changefreq: 'monthly' }
  ];

  // Add individual skills
  initialSkills.forEach(skill => {
    const slug = skill.seo?.canonicalUrl || `${BASE_URL}/skills/${skill.id}`;
    const loc = slug.startsWith('http') ? slug : `${BASE_URL}${slug}`;
    urls.push({
      loc,
      priority: '0.9',
      changefreq: 'weekly'
    });
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

  const outputPath = path.resolve('public', 'sitemap.xml');
  fs.writeFileSync(outputPath, xml, 'utf8');
  console.log(`🎉 Sitemap successfully generated with ${urls.length} URLs at ${outputPath}`);
}

generateSitemap();
