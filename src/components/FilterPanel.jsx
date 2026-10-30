import { DANI, TERMINI } from '../data/constants.js';

// Panel s filterima. Sve stanje živi u hooku useNannyFilters – ovdje samo prikaz i događaji.
export default function FilterPanel({ filteri, postaviFilter, prebaci, ocisti, gradovi, kvartovi, imaDjecu, brojAktivnih }) {
  return (
    <aside className="filters" aria-label="Filteri">
      <div className="filters__head">
        <h2>Filteri</h2>
        {brojAktivnih > 0 && (
          <button className="link" onClick={ocisti}>Očisti ({brojAktivnih})</button>
        )}
      </div>

      <label className="field">
        <span>Pretraga po imenu</span>
        <input
          type="search"
          placeholder="npr. Marija"
          value={filteri.pretraga}
          onChange={(e) => postaviFilter('pretraga', e.target.value)}
        />
      </label>

      <label className="field">
        <span>Grad</span>
        <select value={filteri.grad} onChange={(e) => postaviFilter('grad', e.target.value)}>
          <option value="">Svi gradovi</option>
          {gradovi.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
      </label>

      <label className="field">
        <span>Kvart</span>
        <select value={filteri.kvart} onChange={(e) => postaviFilter('kvart', e.target.value)}>
          <option value="">Svi kvartovi</option>
          {kvartovi.map((k) => <option key={k} value={k}>{k}</option>)}
        </select>
      </label>

      <label className="field">
        <span>Minimalno iskustvo: <strong>{filteri.minIskustvo === 0 ? 'bilo koje' : `${filteri.minIskustvo}+ god.`}</strong></span>
        <input
          type="range"
          min="0"
          max="15"
          step="1"
          value={filteri.minIskustvo}
          onChange={(e) => postaviFilter('minIskustvo', Number(e.target.value))}
        />
      </label>

      <label className="field">
        <span>Maksimalna cijena (€/h)</span>
        <input
          type="number"
          min="0"
          step="1"
          placeholder="bez ograničenja"
          value={filteri.maxCijena}
          onChange={(e) => postaviFilter('maxCijena', e.target.value)}
        />
      </label>

      {imaDjecu && (
        <label className="check">
          <input
            type="checkbox"
            checked={filteri.zaMojuDjecu}
            onChange={(e) => postaviFilter('zaMojuDjecu', e.target.checked)}
          />
          Rade s dobi moje djece
        </label>
      )}

      <fieldset className="field">
        <legend>Dostupni dani</legend>
        <div className="toggles">
          {DANI.map((d) => (
            <button
              key={d.id}
              type="button"
              title={d.naziv}
              className={`toggle ${filteri.dani.includes(d.id) ? 'toggle--on' : ''}`}
              aria-pressed={filteri.dani.includes(d.id)}
              onClick={() => prebaci('dani', d.id)}
            >
              {d.kratko}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="field">
        <legend>Dostupni termini</legend>
        <div className="toggles">
          {TERMINI.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`toggle ${filteri.termini.includes(t.id) ? 'toggle--on' : ''}`}
              aria-pressed={filteri.termini.includes(t.id)}
              onClick={() => prebaci('termini', t.id)}
            >
              {t.naziv}
            </button>
          ))}
        </div>
      </fieldset>
    </aside>
  );
}
