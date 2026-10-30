// Entitet "dijete": { id, sifra, skupina }
// GDPR: ne spremamo ime, točnu dob ni zdravstvene napomene – samo automatski generiranu šifru
// (npr. "Dijete A") i grubu dobnu skupinu.

// Nazivi skupina moraju odgovarati vrijednostima u polju `dobDjece` u data/nannies.js
export const DOBNE_SKUPINE = [
  'Bebe (0–1)',
  'Mališani (1–3)',
  'Predškolci (3–6)',
  'Školarci (6–12)',
  'Tinejdžeri (12+)',
];

// Sljedeća šifra po redu: Dijete A, Dijete B, … (nakon Z: Dijete AA, AB…)
export function generirajSifru(brojPostojecih) {
  const slova = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const prvo = slova[brojPostojecih % 26];
  const ponavljanje = Math.floor(brojPostojecih / 26);
  return `Dijete ${ponavljanje === 0 ? prvo : slova[ponavljanje - 1] + prvo}`;
}

// Jedinstvene dobne skupine svih djece, npr. za filtriranje dadilja
export const dobneSkupineDjece = (djeca) => [...new Set(djeca.map((d) => d.skupina))];
