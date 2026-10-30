// Site themes. Add a new theme here, then create its folder under src/pages/.
export interface Theme {
  slug: string;
  titre: string;
  description: string;
  actif: boolean; // false = shown as "Bientôt" on the home page
}

export const themes: Theme[] = [
  {
    slug: 'domotique',
    titre: 'Domotique',
    description:
      'Ma maison sous Home Assistant : mes retours d’expérience par usage, le matériel que j’ai acheté et ce que j’en pense.',
    actif: true,
  },
];
