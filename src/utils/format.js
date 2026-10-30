// Pomoćne funkcije za formatiranje prikaza.

export const formatirajCijenu = (cijena) => `${cijena.toFixed(2).replace('.', ',')} €/h`;

export const formatirajOcjenu = (ocjena) => ocjena.toFixed(1).replace('.', ',');

// Hrvatska množina za "godina iskustva": 1 godina, 2–4 godine, 5+ godina
export function formatirajGodine(n) {
  const zadnja = n % 10;
  const zadnjeDvije = n % 100;
  if (zadnja === 1 && zadnjeDvije !== 11) return `${n} godina`;
  if (zadnja >= 2 && zadnja <= 4 && !(zadnjeDvije >= 12 && zadnjeDvije <= 14)) return `${n} godine`;
  return `${n} godina`;
}

// Inicijali za avatar, npr. "Marija Horvat" -> "MH"
export const inicijali = (ime) =>
  ime
    .split(' ')
    .map((dio) => dio[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

export const formatirajDatum = (iso) =>
  new Date(iso).toLocaleString('hr-HR', { dateStyle: 'medium', timeStyle: 'short' });
