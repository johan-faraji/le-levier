# Le Levier — le site

Ce dossier contient tout le site de le-levier.fr. Ce README explique comment
l'utiliser sans avoir besoin de coder.

## Comment ajouter un article

1. Va dans le dossier `src/content/articles/`.
2. Copie un des deux fichiers existants (`pourquoi-le-dollar-reste-roi.md`
   ou `inflation-expliquee-simplement.md`) et renomme la copie — le nom du
   fichier devient l'adresse de la page (ex : `mon-nouvel-article.md` donne
   `le-levier.fr/articles/mon-nouvel-article`).
3. En haut du fichier, entre les deux lignes `---`, remplis les champs :
   - `title` : le titre affiché sur la page et dans Google.
   - `youtubeTitle` : le titre de la vidéo YouTube, si différent.
   - `description` : un résumé de 1-2 phrases (apparaît dans les résultats Google).
   - `pubDate` : la date de publication, format `2026-09-15`.
   - `videoId` : l'identifiant YouTube — la partie après `v=` dans l'URL de la
     vidéo (ex : pour `youtube.com/watch?v=Ab12Cd34`, c'est `Ab12Cd34`).
     Laisse ce champ absent tant que la vidéo n'est pas en ligne : l'article
     se publie sans encart vidéo.
   - `theme` : `Économie`, `Géopolitique`, `Finance`, ou `Transversal` si le
     sujet mélange plusieurs de ces thèmes.
   - `format` : `Décryptage`, `Actu commentée`, `Chiffre du moment` ou `Les bases`.
   - `keyStat` et `keyStatCaption` : le chiffre qui sert de point d'appui à
     l'article (ex : `"58 %"`), et la phrase qui explique ce qu'il veut dire.
     Ça s'affiche dans un encart juste sous le titre. Laisse les deux champs
     absents si l'article ne s'articule pas autour d'un chiffre précis —
     c'est la seule place pour une donnée isolée, le reste du texte doit
     rester écrit comme on parle.
   - `relatedSlugs` : les noms de fichiers (sans `.md`) des articles à
     suggérer en bas de page.
   - `draft` : mets `true` tant que l'article n'est pas prêt (il reste invisible
     sur le site), `false` pour le publier.
4. En dessous de la deuxième ligne `---`, écris le corps de l'article. Utilise
   `##` pour les grands titres de section, `###` pour les sous-titres. Un
   lien vers un autre article s'écrit `[texte du lien](/articles/nom-du-fichier)`.
5. Enregistre. Si le site est connecté à Netlify (voir plus bas), la nouvelle
   version se publie automatiquement en 1 à 2 minutes après l'enregistrement.

Tu peux faire tout ça directement depuis l'interface web de GitHub (bouton
"Add file" dans le dossier `src/content/articles/`), sans installer aucun
logiciel — voir la section Déploiement plus bas.

## Voir le site avant de publier (optionnel)

Si tu veux voir le rendu avant de mettre en ligne, sur un ordinateur avec
Node.js installé :

```
npm install
npm run dev
```

Puis ouvre `http://localhost:4321` dans le navigateur. `Ctrl+C` pour arrêter.

Ce n'est pas obligatoire : Netlify te montre aussi un aperçu automatique de
chaque changement avant qu'il ne soit visible publiquement (voir plus bas).

## Déploiement (mise en ligne)

Le plus simple, sans jamais toucher à une ligne de commande :

1. Crée un compte gratuit sur [github.com](https://github.com) si tu n'en as
   pas déjà un, et crée un nouveau dépôt (repository) — mets-y tout ce
   dossier.
2. Crée un compte gratuit sur [netlify.com](https://netlify.com), connecte-le
   à ton compte GitHub, et choisis "Import an existing project" → sélectionne
   le dépôt. Netlify détecte automatiquement les réglages grâce au fichier
   `netlify.toml` déjà présent dans ce dossier (rien à configurer).
3. Une fois le premier déploiement terminé, va dans Netlify → Domain settings
   → "Add a domain" et entre `le-levier.fr`. Netlify te donne les
   enregistrements DNS à ajouter chez IONOS (généralement un enregistrement
   A ou des enregistrements CNAME) — copie-les dans la zone DNS d'IONOS.
4. À partir de là, chaque modification enregistrée sur GitHub republie le
   site automatiquement en 1 à 2 minutes, sans aucune autre action.

## Les pages à compléter avant le vrai lancement

Plusieurs fichiers contiennent des `[TODO]` à remplacer par tes vraies
informations avant la mise en ligne publique :

- `src/pages/mentions-legales.astro` — raison sociale exacte, SIRET, adresse
  du siège de la SAS (à faire valider par le comptable).
- Les deux articles d'exemple dans `src/content/articles/` sont des
  gabarits (`draft: true`, donc invisibles sur le site) — à garder comme
  modèle de structure, pas à publier tels quels. Ils contiennent chacun
  plusieurs `[TODO]` à remplacer par tes chiffres vérifiés une fois le
  sujet travaillé.
- Le formulaire de newsletter sur la page d'accueil (`src/pages/index.astro`)
  est un formulaire vide : une fois ton compte Kit créé, remplace-le par le
  code d'intégration que Kit te fournit (Paramètres → Formulaires → Intégrer).
- `public/og-default.svg` est l'image utilisée par défaut quand un lien vers
  le site est partagé sur les réseaux — tu peux la remplacer par une vraie
  image (format PNG ou JPG, 1200×630 px) une fois ton identité visuelle
  définitive choisie.

## Ce qui est déjà réglé (SEO)

- **Titre et description** de chaque page sont contrôlés par les champs
  `title` et `description` de chaque article, ou directement dans chaque
  fichier `.astro` pour les pages fixes.
- **Sitemap** (`/sitemap-index.xml`) et **robots.txt** sont générés
  automatiquement à chaque publication.
- **Flux RSS** disponible sur `/rss.xml`.
- **Vidéos YouTube** : chargées en "façade légère" (juste la miniature tant
  que personne ne clique) pour ne pas ralentir le chargement de la page —
  bon pour le classement Google, bon pour l'expérience de lecture.
- **Maillage interne** : le champ `relatedSlugs` de chaque article affiche
  automatiquement des liens vers les articles liés en bas de page.
- **Encart "chiffre qui compte"** : affiché automatiquement sous le titre
  dès que les champs `keyStat` et `keyStatCaption` sont renseignés.
