# xhrouet.be

Mon site perso **Xh-périences**, construit avec [Astro](https://astro.build) et publié automatiquement sur GitHub Pages.

## Écrire en local

Prérequis : [Node.js](https://nodejs.org) 22 ou plus récent.

```powershell
npm install        # une seule fois
npm run dev        # aperçu sur http://localhost:4321 (brouillons visibles)
npm run build      # vérifier que le site se construit sans erreur
```

## Où sont les contenus

| Quoi | Dossier | Adresse sur le site |
| --- | --- | --- |
| Pages « Ma maison » (une par tableau de bord HA) | `src/content/domotique/maison/` | `/domotique/maison/<nom-du-fichier>/` |
| Fiches matériel | `src/content/domotique/materiel/` | `/domotique/materiel/<nom-du-fichier>/` |
| Thèmes du site | `src/data/themes.ts` | `/<thème>/` |

Le **nom du fichier devient l'adresse** : minuscules, sans accents, mots séparés par des tirets (`porte-de-garage.mdx`).

## Le statut d'une page

Dans l'en-tête de chaque fichier (`statut:`) :

- `brouillon` : visible uniquement en local avec `npm run dev`, jamais en ligne ;
- `a-venir` : apparaît en ligne comme « Bientôt », sans page ;
- `publie` : en ligne.

## Ajouter une page « Ma maison »

1. Partir de `src/content/domotique/maison/chauffage.mdx` (exemple).
2. Remplir l'en-tête : `titre`, `resume`, `materiel` (noms des fiches matériel, sans `.mdx`), `integrations`, `voirAussi`.
3. Écrire le texte librement en Markdown (`## Intertitre`, `**gras**`, `- liste`).
   Ce qui est entre `{/*` et `*/}` est un commentaire, invisible sur le site.
   Option : pour montrer une automatisation précise, le bloc `<Automatisation nom="" quand="" si="" alors="">` existe toujours.
4. Images : les mettre dans un dossier `images/` à côté du fichier et les référencer avec `image: ./images/mon-image.png`.

## Ajouter une fiche matériel

Copier `src/content/domotique/materiel/exemple-produit.mdx`, le renommer (`shelly-plus-1pm.mdx`) et le remplir.
Si un lien est affilié, mettre `affiliation: true` : la mention légale s'affiche alors automatiquement.

## Publier

```powershell
git add .
git commit -m "Ajout de la page Chauffage"
git push
```

GitHub Actions construit et publie le site en une à deux minutes (onglet **Actions** du dépôt).
