import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Publication status shared by all content.
// - "publie": visible on the live site
// - "brouillon": visible only with `npm run dev`, never in production
// - "a-venir": listed as "Bientôt" on the live site, no page generated
const statut = z.enum(['publie', 'brouillon', 'a-venir']).default('brouillon');

// One page per Home Assistant dashboard (Chauffage, Climatisation, ...)
const maison = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/domotique/maison' }),
  schema: ({ image }) =>
    z.object({
      titre: z.string(),
      resume: z.string().optional(),
      ordre: z.number().default(100),
      statut,
      miseAJour: z.coerce.date().optional(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      materiel: z.array(reference('materiel')).default([]),
      integrations: z.array(z.string()).default([]),
      voirAussi: z.array(reference('maison')).default([]),
    }),
});

// One sheet per piece of hardware (Shelly, Sonoff, Zigbee, ...)
const materiel = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/domotique/materiel' }),
  schema: ({ image }) =>
    z.object({
      titre: z.string(),
      marque: z.string(),
      protocole: z.array(z.string()).default([]),
      avis: z.string().optional(),
      note: z.number().min(0).max(5).optional(),
      boutique: z.string().optional(),
      lien: z.url().optional(),
      prix: z.string().optional(),
      dateAchat: z.coerce.date().optional(),
      affiliation: z.boolean().default(false),
      statut,
      miseAJour: z.coerce.date().optional(),
      image: image().optional(),
      imageAlt: z.string().optional(),
    }),
});

export const collections = { maison, materiel };
