import { useEffect, useState } from 'react';

// Poput useState, ali se vrijednost sprema u localStorage i preživljava osvježavanje stranice.
export function useLocalStorage(kljuc, pocetnaVrijednost) {
  const [vrijednost, setVrijednost] = useState(() => {
    try {
      const spremljeno = localStorage.getItem(kljuc);
      return spremljeno !== null ? JSON.parse(spremljeno) : pocetnaVrijednost;
    } catch {
      return pocetnaVrijednost; // npr. privatni način rada ili neispravan JSON
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(kljuc, JSON.stringify(vrijednost));
    } catch {
      /* spremanje nije uspjelo – aplikacija radi dalje bez trajne pohrane */
    }
  }, [kljuc, vrijednost]);

  return [vrijednost, setVrijednost];
}
