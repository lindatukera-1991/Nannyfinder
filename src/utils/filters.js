// Čista logika filtriranja dadilja (bez Reacta) – lako za testirati i razumjeti.

export const POCETNI_FILTERI = {
  pretraga: '',
  grad: '',
  kvart: '',
  minIskustvo: 0,
  maxCijena: '', // prazno = bez ograničenja
  dani: [],
  termini: [],
  zaMojuDjecu: false, // samo dadilje koje rade s dobi moje djece
  sortiranje: 'ocjena',
};

// Normalizira tekst: mala slova i bez dijakritika (č, ć, š, ž, đ) radi lakše pretrage
export function normaliziraj(tekst) {
  return tekst
    .toLowerCase()
    .replace(/đ/g, 'd')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

// Dostupnost: za svaki odabrani dan dadilja mora imati barem jedan od odabranih termina
// (ako termin nije odabran, dovoljan je bilo koji termin tog dana).
export function jeDostupna(dadilja, dani, termini) {
  if (dani.length === 0 && termini.length === 0) return true;

  const daniZaProvjeru = dani.length > 0 ? dani : Object.keys(dadilja.dostupnost);

  // Ako su odabrani samo termini, dovoljno je da se termin podudara na barem jedan dan
  if (dani.length === 0) {
    return daniZaProvjeru.some((dan) => dadilja.dostupnost[dan].some((t) => termini.includes(t)));
  }

  return dani.every((dan) => {
    const slobodni = dadilja.dostupnost[dan] ?? [];
    return termini.length === 0 ? slobodni.length > 0 : slobodni.some((t) => termini.includes(t));
  });
}

// `skupineDjece` = dobne skupine djece roditelja (vidi utils/children.js)
export function filtrirajDadilje(dadilje, filteri, skupineDjece = []) {
  const upit = normaliziraj(filteri.pretraga.trim());
  const maxCijena = filteri.maxCijena === '' ? Infinity : Number(filteri.maxCijena);

  return dadilje.filter(
    (d) =>
      (upit === '' || normaliziraj(d.ime).includes(upit)) &&
      (filteri.grad === '' || d.grad === filteri.grad) &&
      (filteri.kvart === '' || d.kvart === filteri.kvart) &&
      d.iskustvo >= filteri.minIskustvo &&
      d.cijena <= maxCijena &&
      (!filteri.zaMojuDjecu || skupineDjece.every((s) => d.dobDjece.includes(s))) &&
      jeDostupna(d, filteri.dani, filteri.termini)
  );
}

const SORTIRANJA = {
  ocjena: (a, b) => b.ocjena - a.ocjena,
  cijena: (a, b) => a.cijena - b.cijena,
  iskustvo: (a, b) => b.iskustvo - a.iskustvo,
};

// Vraća novi sortirani niz (ne mijenja original)
export function sortirajDadilje(dadilje, kriterij) {
  return [...dadilje].sort(SORTIRANJA[kriterij] ?? SORTIRANJA.ocjena);
}

// Jedinstveni gradovi / kvartovi za padajuće izbornike
export function dohvatiGradove(dadilje) {
  return [...new Set(dadilje.map((d) => d.grad))].sort((a, b) => a.localeCompare(b, 'hr'));
}

export function dohvatiKvartove(dadilje, grad) {
  const izGrada = grad ? dadilje.filter((d) => d.grad === grad) : dadilje;
  return [...new Set(izGrada.map((d) => d.kvart))].sort((a, b) => a.localeCompare(b, 'hr'));
}

// Broj aktivnih filtera (za prikaz "Očisti filtere")
export function brojAktivnihFiltera(f) {
  return [
    f.pretraga.trim() !== '',
    f.grad !== '',
    f.kvart !== '',
    f.minIskustvo > 0,
    f.maxCijena !== '',
    f.dani.length > 0,
    f.termini.length > 0,
    f.zaMojuDjecu,
  ].filter(Boolean).length;
}
