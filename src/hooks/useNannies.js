import { useLocalStorage } from './useLocalStorage.js';
import { dadilje as pocetneDadilje } from '../data/nannies.js';

const BOJE = ['#f97316', '#ec4899', '#0ea5e9', '#10b981', '#8b5cf6', '#14b8a6', '#f43f5e', '#eab308', '#6366f1', '#06b6d4'];

// Popis dadilja (CRUD): pri prvom pokretanju puni se početnim podacima, a izmjene se spremaju u localStorage.
export function useNannies() {
  const [dadilje, setDadilje] = useLocalStorage('nannyfinder.dadilje.v1', pocetneDadilje);

  // Create
  const dodajDadilju = (podaci) =>
    setDadilje((prethodne) => {
      const id = prethodne.reduce((max, d) => Math.max(max, d.id), 0) + 1;
      return [
        ...prethodne,
        { ...podaci, id, ocjena: 0, brojOcjena: 0, boja: BOJE[id % BOJE.length], reference: [] },
      ];
    });

  // Update
  const promijeniDadilju = (id, podaci) =>
    setDadilje((prethodne) => prethodne.map((d) => (d.id === id ? { ...d, ...podaci } : d)));

  // Delete
  const obrisiDadilju = (id) => setDadilje((prethodne) => prethodne.filter((d) => d.id !== id));

  return { dadilje, dodajDadilju, promijeniDadilju, obrisiDadilju };
}
