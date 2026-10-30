// Zajedničke konstante: dani u tjednu i termini tijekom dana.

export const DANI = [
  { id: 'pon', kratko: 'Pon', naziv: 'Ponedjeljak' },
  { id: 'uto', kratko: 'Uto', naziv: 'Utorak' },
  { id: 'sri', kratko: 'Sri', naziv: 'Srijeda' },
  { id: 'cet', kratko: 'Čet', naziv: 'Četvrtak' },
  { id: 'pet', kratko: 'Pet', naziv: 'Petak' },
  { id: 'sub', kratko: 'Sub', naziv: 'Subota' },
  { id: 'ned', kratko: 'Ned', naziv: 'Nedjelja' },
];

export const TERMINI = [
  { id: 'jutro', naziv: 'Jutro', sati: '07–12' },
  { id: 'popodne', naziv: 'Popodne', sati: '12–17' },
  { id: 'vecer', naziv: 'Večer', sati: '17–22' },
];

export const SORTIRANJA = [
  { id: 'ocjena', naziv: 'Najbolje ocijenjene' },
  { id: 'cijena', naziv: 'Najpovoljnije' },
  { id: 'iskustvo', naziv: 'Najviše iskustva' },
];

// Pomoćna funkcija: tekstualni naziv dana po id-u
export const nazivDana = (id) => DANI.find((d) => d.id === id)?.naziv ?? id;
export const nazivTermina = (id) => TERMINI.find((t) => t.id === id)?.naziv ?? id;
