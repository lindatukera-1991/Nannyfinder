import { useMemo, useState } from 'react';
import { useChildren } from './hooks/useChildren.js';
import { dobneSkupineDjece } from './utils/children.js';
import ChildrenPanel from './components/ChildrenPanel.jsx';
import { dadilje } from './data/nannies.js';
import { useNannyFilters } from './hooks/useNannyFilters.js';
import { useMessages } from './hooks/useMessages.js';
import Header from './components/Header.jsx';
import FilterPanel from './components/FilterPanel.jsx';
import NannyList from './components/NannyList.jsx';
import NannyProfile from './components/NannyProfile.jsx';
import { SORTIRANJA } from './data/constants.js';

export default function App() {
  const { djeca, dodajDijete, ukloniDijete } = useChildren();
  const skupineDjece = useMemo(() => dobneSkupineDjece(djeca), [djeca]);
  const filtriranje = useNannyFilters(dadilje, skupineDjece);
  const { posaljiPoruku, porukeZaDadilju } = useMessages();
  const [odabranaId, setOdabranaId] = useState(null); // null = prikaz popisa

  const odabrana = dadilje.find((d) => d.id === odabranaId);

  const otvori = (id) => {
    setOdabranaId(id);
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      <Header onPocetna={() => setOdabranaId(null)} />

      <main className="container">
        {odabrana ? (
          <NannyProfile
            dadilja={odabrana}
            djeca={djeca}
            poslanePoruke={porukeZaDadilju(odabrana.id)}
            onPosalji={(podaci) => posaljiPoruku(odabrana.id, podaci)}
            onNatrag={() => setOdabranaId(null)}
          />
        ) : (
          <>
            <section className="hero">
              <h1>Pronađite dadilju u svom gradu</h1>
              <p>Pregledajte profile, iskustvo, dostupnost i lokaciju te jednostavno kontaktirajte dadilju koja odgovara vašim potrebama.</p>
            </section>

            <div className="layout">
              <div className="sidebar">
                <FilterPanel {...filtriranje} />
                <ChildrenPanel djeca={djeca} onDodaj={dodajDijete} onUkloni={ukloniDijete} />
              </div>

              <section aria-live="polite">
                <div className="results-bar">
                  <p><strong>{filtriranje.rezultati.length}</strong> dadilja u rezultatima</p>
                  <label className="sort">
                    Sortiraj:
                    <select
                      value={filtriranje.filteri.sortiranje}
                      onChange={(e) => filtriranje.postaviFilter('sortiranje', e.target.value)}
                    >
                      {SORTIRANJA.map((s) => <option key={s.id} value={s.id}>{s.naziv}</option>)}
                    </select>
                  </label>
                </div>
                <NannyList dadilje={filtriranje.rezultati} onOtvori={otvori} onOcistiFiltere={filtriranje.ocisti} />
              </section>
            </div>
          </>
        )}
      </main>

      <footer className="footer">NannyFinder · edukativna demo aplikacija, svi podaci su izmišljeni.</footer>
    </>
  );
}
