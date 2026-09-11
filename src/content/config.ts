import { defineCollection, z } from 'astro:content';

// Schéma d'un article. Chaque champ correspond à un contrôle SEO précis —
// voir le README pour le guide "comment ajouter un article" en langage simple.
const articles = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      // Titre affiché en <h1> et dans l'onglet du navigateur (balise <title>).
      // C'est le titre "SEO" : pense requête tapée dans Google.
      title: z.string(),

      // Titre de la vidéo YouTube correspondante, si différent du titre SEO.
      // Sert uniquement d'info dans l'encart vidéo — n'affecte pas le <title>.
      youtubeTitle: z.string().optional(),

      // Résumé de 1 à 2 phrases. Devient la balise <meta name="description">
      // ET le texte de la carte sur la page de listing des articles.
      description: z.string().max(300),

      // Mot-clé principal visé (pour ton propre suivi, n'apparaît nulle part
      // sur le site — sert juste de rappel de l'intention de la page).
      targetKeyword: z.string().optional(),

      // Dates au format AAAA-MM-JJ.
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),

      // Identifiant de la vidéo YouTube (la partie après "v=" dans l'URL).
      // Laisser vide tant que la vidéo n'est pas tournée : l'article publie
      // sans encart vidéo, et il suffit d'ajouter ce champ plus tard.
      videoId: z.string().optional(),

      // Série éditoriale — voir le plan de lancement.
      series: z.enum(['A', 'B']).default('A'),

      // Format éditorial, pour la rotation à 4 semaines.
      format: z.enum(['Comparatif', 'Tuto', 'Avis', 'Problème→solution']).optional(),

      // Image utilisée pour les partages (réseaux sociaux) et l'aperçu Google.
      // Optionnelle : une image par défaut est utilisée si absente.
      ogImage: image().optional(),

      // Passe à true pour un produit dont tu es affilié dans cet article :
      // affiche automatiquement la mention légale "contient des liens
      // affiliés" en haut de la page (obligatoire dès qu'un lien affilié
      // est présent — voir la loi du 9 juin 2023 citée dans le plan).
      containsAffiliateLinks: z.boolean().default(true),

      // Articles liés (slugs), pour le maillage interne — voir le README.
      relatedSlugs: z.array(z.string()).default([]),

      // Masque l'article du site (brouillon) sans le supprimer.
      draft: z.boolean().default(false),
    }),
});

export const collections = { articles };
