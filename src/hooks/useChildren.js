import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage.js';
import { generirajSifru } from '../utils/children.js';

// Popis djece roditelja (samo šifra + dobna skupina), sprema se u localStorage.
export function useChildren() {
  const [djeca, setDjeca] = useLocalStorage('nannyfinder.djeca.v2', []);

  // Brisanje ranije verzije podataka koja je sadržavala ime i točnu dob djeteta
  useEffect(() => {
    try {
      localStorage.removeItem('nannyfinder.djeca');
    } catch {
      /* ignoriraj */
    }
  }, []);

  const dodajDijete = (skupina) =>
    setDjeca((prethodna) => [
      ...prethodna,
      { id: crypto.randomUUID(), sifra: generirajSifru(prethodna.length), skupina },
    ]);

  const ukloniDijete = (id) => setDjeca((prethodna) => prethodna.filter((d) => d.id !== id));

  return { djeca, dodajDijete, ukloniDijete };
}
