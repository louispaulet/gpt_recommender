#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const appFile = path.join(__dirname, '..', 'gpt_reco_app', 'src', 'App.jsx');
const sitemapFile = path.join(__dirname, '..', 'gpt_reco_app', 'public', 'sitemap.xml');
const baseUrl = 'https://gpt-reco.thefrenchartist.dev';

const content = fs.readFileSync(appFile, 'utf-8');
const routeRegex = /<Route\s+path=["']([^"']+)["']/g;
const paths = new Set();
let match;
while ((match = routeRegex.exec(content))) {
  const p = match[1];
  if (p && p !== '*') {
    paths.add(p);
  }
}

const urls = Array.from(paths).map((p) => {
  const sanitized = p.startsWith('/') ? p : `/${p}`;
  return `  <url>\n    <loc>${baseUrl}/#${sanitized}</loc>\n  </url>`;
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;

fs.writeFileSync(sitemapFile, xml, 'utf-8');
console.log(`Updated sitemap with ${urls.length} routes.`);
