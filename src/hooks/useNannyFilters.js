import { useMemo, useState } from 'react';
import {
  POCETNI_FILTERI,
  brojAktivnihFiltera,
  dohvatiGradove,
  dohvatiKvartove,
  filtrirajDadilje,
  sortirajDadilje,
} from '../utils/filters.js';

// Hook koji drži stanje filtera i izračunava popis dadilja za prikaz.
export function useNannyFilters(dadilje, skupineDjece = []) {
  const [filteri, setFilteri] = useState(POCETNI_FILTERI);

  // Postavlja jedan filter; promjena grada resetira kvart jer kvart pripada gradu
  const postaviFilter = (naziv, vrijednost) =>
    setFilteri((prethodni) => ({
      ...prethodni,
      [naziv]: vrijednost,
      ...(naziv === 'grad' ? { kvart: '' } : {}),
    }));

  // Uključuje/isključuje stavku u polju (dani, termini)
  const prebaci = (naziv, stavka) =>
    setFilteri((prethodni) => {
      const polje = prethodni[naziv];
      return {
        ...prethodni,
        [naziv]: polje.includes(stavka) ? polje.filter((s) => s !== stavka) : [...polje, stavka],
      };
    });

  const ocisti = () => setFilteri(POCETNI_FILTERI);

  const rezultati = useMemo(
    () => sortirajDadilje(filtrirajDadilje(dadilje, filteri, skupineDjece), filteri.sortiranje),
    [dadilje, filteri, skupineDjece]
  );

  const gradovi = useMemo(() => dohvatiGradove(dadilje), [dadilje]);
  const kvartovi = useMemo(() => dohvatiKvartove(dadilje, filteri.grad), [dadilje, filteri.grad]);

  return {
    filteri,
    postaviFilter,
    prebaci,
    ocisti,
    rezultati,
    gradovi,
    kvartovi,
    imaDjecu: skupineDjece.length > 0,
    brojAktivnih: brojAktivnihFiltera(filteri),
  };
}
