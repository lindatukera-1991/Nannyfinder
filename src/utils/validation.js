// Validacija forme za kontaktiranje dadilje.
// Vraća objekt s greškama; prazan objekt znači da je sve u redu.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TELEFON_RE = /^\+?[0-9\s/-]{8,15}$/;

export function validirajPoruku(vrijednosti) {
  const greske = {};

  if (vrijednosti.imeRoditelja.trim().length < 2) {
    greske.imeRoditelja = 'Unesite svoje ime (najmanje 2 znaka).';
  }

  const kontakt = vrijednosti.kontakt.trim();
  if (kontakt === '') {
    greske.kontakt = 'Unesite e-mail ili broj telefona.';
  } else if (!EMAIL_RE.test(kontakt) && !TELEFON_RE.test(kontakt)) {
    greske.kontakt = 'Unesite ispravan e-mail (ime@primjer.hr) ili telefon (npr. 091 234 5678).';
  }

  if (vrijednosti.termin === '') {
    greske.termin = 'Odaberite željeni termin.';
  }

  const poruka = vrijednosti.poruka.trim();
  if (poruka.length < 10) {
    greske.poruka = 'Poruka mora imati najmanje 10 znakova.';
  } else if (poruka.length > 500) {
    greske.poruka = 'Poruka može imati najviše 500 znakova.';
  }

  return greske;
}
