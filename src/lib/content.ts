import { getCollection, type CollectionEntry } from 'astro:content';

type Entry = CollectionEntry<'maison'> | CollectionEntry<'materiel'>;

// Drafts are shown while writing (`npm run dev`) but never on the live site.
const showDrafts = import.meta.env.DEV;

/** True when the entry gets its own page. */
export function hasPage(entry: Entry): boolean {
  const s = entry.data.statut;
  return s === 'publie' || (showDrafts && s === 'brouillon');
}

/** True when the entry appears in lists (published, draft in dev, or "coming soon"). */
export function isListed(entry: Entry): boolean {
  return hasPage(entry) || entry.data.statut === 'a-venir';
}

export async function getMaison() {
  // "Ma maison" pages: drafts are listed too, shown online as "Bientôt"
  const all = await getCollection('maison');
  return all
    .sort((a, b) => a.data.ordre - b.data.ordre || a.data.titre.localeCompare(b.data.titre, 'fr'));
}

export async function getMateriel() {
  const all = await getCollection('materiel');
  return all
    .filter(isListed)
    .sort((a, b) => a.data.marque.localeCompare(b.data.marque, 'fr') || a.data.titre.localeCompare(b.data.titre, 'fr'));
}

/** For each hardware id, the "Ma maison" pages that use it. */
export async function getUsagesByMateriel() {
  const maison = await getMaison();
  const map = new Map<string, { titre: string; url: string | null }[]>();
  for (const page of maison) {
    for (const ref of page.data.materiel) {
      const list = map.get(ref.id) ?? [];
      list.push({ titre: page.data.titre, url: hasPage(page) ? `/domotique/maison/${page.id}/` : null });
      map.set(ref.id, list);
    }
  }
  return map;
}

/** Latest updated pages across the site, for the home page. */
export async function getDernieresMisesAJour(limit = 6) {
  const [maison, materiel] = await Promise.all([getCollection('maison'), getCollection('materiel')]);
  const items = [
    ...maison.filter(hasPage).map((e) => ({
      titre: e.data.titre,
      type: 'Ma maison',
      url: `/domotique/maison/${e.id}/`,
      date: e.data.miseAJour,
    })),
    ...materiel.filter(hasPage).map((e) => ({
      titre: e.data.titre,
      type: 'Matériel',
      url: `/domotique/materiel/${e.id}/`,
      date: e.data.miseAJour,
    })),
  ];
  return items
    .sort((a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0))
    .slice(0, limit);
}

export function formatDate(date?: Date): string {
  if (!date) return '';
  return date.toLocaleDateString('fr-BE', { day: 'numeric', month: 'long', year: 'numeric' });
}
