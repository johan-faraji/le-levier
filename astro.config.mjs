import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// Le Levier — le-levier.fr
// Site statique : chaque page est générée à l'avance (meilleur SEO, meilleure
// vitesse de chargement, hébergement gratuit sur Netlify ou Cloudflare Pages).
export default defineConfig({
  site: 'https://le-levier.fr',
  trailingSlash: 'never',
  integrations: [
    sitemap(), // génère automatiquement /sitemap-index.xml à chaque build
    mdx(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
