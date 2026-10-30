import { useState } from 'react';
import { DOBNE_SKUPINE } from '../utils/children.js';

// Panel "Moja djeca": dodavanje djeteta samo kroz dobnu skupinu (šifra se dodjeljuje automatski).
export default function ChildrenPanel({ djeca, onDodaj, onUkloni }) {
  const [skupina, setSkupina] = useState(DOBNE_SKUPINE[0]);

  return (
    <aside className="filters children" aria-label="Moja djeca">
      <h2>👧 Moja djeca</h2>
      <p className="muted">
        Radi zaštite privatnosti (GDPR) ne spremamo ime ni točnu dob – samo šifru i dobnu skupinu.
      </p>

      {djeca.length > 0 && (
        <ul className="children__list">
          {djeca.map((d) => (
            <li key={d.id}>
              <div>
                <strong>{d.sifra}</strong>
                <small className="muted"> · {d.skupina}</small>
              </div>
              <button className="link" onClick={() => onUkloni(d.id)} aria-label={`Ukloni ${d.sifra}`}>✕</button>
            </li>
          ))}
        </ul>
      )}

      <label className="field">
        <span>Dobna skupina</span>
        <select value={skupina} onChange={(e) => setSkupina(e.target.value)}>
          {DOBNE_SKUPINE.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </label>
      <button type="button" className="btn btn--ghost" onClick={() => onDodaj(skupina)}>+ Dodaj dijete</button>
    </aside>
  );
}
