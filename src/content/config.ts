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

      // Thème éditorial — les trois piliers du Levier, plus une case pour les
      // sujets qui mélangent les trois.
      theme: z.enum(['Économie', 'Géopolitique', 'Finance', 'Transversal']).default('Économie'),

      // Format éditorial, pour la rotation.
      // - Décryptage : un mécanisme expliqué pas à pas
      // - Actu commentée : un événement récent remis en perspective
      // - Chiffre du moment : toute la vidéo/l'article part d'une seule donnée
      // - Les bases : un concept 101, pour quelqu'un qui part de zéro
      format: z.enum(['Décryptage', 'Actu commentée', 'Chiffre du moment', 'Les bases']).optional(),

      // Le chiffre qui sert de point d'appui à l'article (ex: "312 Mds $").
      // C'est la place de "l'approche data" dans le projet : un chiffre qui
      // ancre le propos, jamais un tableau ou du code affiché à l'écran.
      // Laisser vide si l'article ne s'articule pas autour d'un chiffre précis.
      keyStat: z.string().optional(),

      // Une phrase qui explique ce que ce chiffre veut dire — affichée juste
      // sous le chiffre, dans l'encart en haut de l'article.
      keyStatCaption: z.string().optional(),

      // Image utilisée pour les partages (réseaux sociaux) et l'aperçu Google.
      // Optionnelle : une image par défaut est utilisée si absente.
      ogImage: image().optional(),

      // Articles liés (slugs), pour le maillage interne — voir le README.
      relatedSlugs: z.array(z.string()).default([]),

      // Masque l'article du site (brouillon) sans le supprimer.
      draft: z.boolean().default(false),
    }),
});

export const collections = { articles };
