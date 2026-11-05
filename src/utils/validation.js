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

// Validacija forme za dodavanje i promjenu dadilje.
export function validirajDadilju(v) {
  const greske = {};

  if (v.ime.trim().length < 2) greske.ime = 'Unesite ime i prezime (najmanje 2 znaka).';
  if (v.grad.trim() === '') greske.grad = 'Unesite grad.';
  if (v.kvart.trim() === '') greske.kvart = 'Unesite kvart.';

  const opis = v.opis.trim();
  if (opis.length < 10) greske.opis = 'Opis mora imati najmanje 10 znakova.';
  else if (opis.length > 200) greske.opis = 'Opis može imati najviše 200 znakova.';

  const iskustvo = Number(v.iskustvo);
  if (v.iskustvo === '' || !Number.isInteger(iskustvo) || iskustvo < 0 || iskustvo > 50) {
    greske.iskustvo = 'Unesite cijeli broj godina od 0 do 50.';
  }

  const cijena = Number(v.cijena);
  if (v.cijena === '' || !(cijena > 0) || cijena > 200) {
    greske.cijena = 'Cijena mora biti veća od 0 i najviše 200 €/h.';
  }

  if (v.dobDjece.length === 0) greske.dobDjece = 'Odaberite barem jednu dob djece.';
  if (v.jezici.split(',').every((j) => j.trim() === '')) greske.jezici = 'Unesite barem jedan jezik.';

  return greske;
}
