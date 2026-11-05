import { useState } from 'react';
import { DANI, TERMINI } from '../data/constants.js';
import { DOBNE_SKUPINE } from '../utils/children.js';
import { validirajDadilju } from '../utils/validation.js';

const PRAZNA_DOSTUPNOST = Object.fromEntries(DANI.map((d) => [d.id, []]));
const PRAZNA_FORMA = {
  ime: '', grad: '', kvart: '', opis: '', iskustvo: '', cijena: '',
  biografija: '', jezici: 'Hrvatski', dobDjece: [], dostupnost: PRAZNA_DOSTUPNOST,
};

// Forma za dodavanje (dadilja = null) i promjenu postojeće dadilje.
export default function NannyForm({ dadilja, onSpremi, onOdustani }) {
  const [vrijednosti, setVrijednosti] = useState(
    dadilja ? { ...dadilja, jezici: dadilja.jezici.join(', ') } : PRAZNA_FORMA
  );
  const [pokusano, setPokusano] = useState(false); // greške se prikazuju nakon prvog pokušaja spremanja

  const greske = validirajDadilju(vrijednosti);

  const promijeni = (e) => {
    const { name, value } = e.target;
    setVrijednosti((v) => ({ ...v, [name]: value }));
  };

  const prebaciDob = (skupina) =>
    setVrijednosti((v) => ({
      ...v,
      dobDjece: v.dobDjece.includes(skupina) ? v.dobDjece.filter((s) => s !== skupina) : [...v.dobDjece, skupina],
    }));

  const prebaciTermin = (dan, termin) =>
    setVrijednosti((v) => {
      const slobodni = v.dostupnost[dan];
      return {
        ...v,
        dostupnost: {
          ...v.dostupnost,
          [dan]: slobodni.includes(termin) ? slobodni.filter((t) => t !== termin) : [...slobodni, termin],
        },
      };
    });

  const spremi = (e) => {
    e.preventDefault();
    setPokusano(true);
    if (Object.keys(greske).length > 0) return;

    onSpremi({
      ime: vrijednosti.ime.trim(),
      grad: vrijednosti.grad.trim(),
      kvart: vrijednosti.kvart.trim(),
      opis: vrijednosti.opis.trim(),
      iskustvo: Number(vrijednosti.iskustvo),
      cijena: Number(vrijednosti.cijena),
      biografija: vrijednosti.biografija.trim() || vrijednosti.opis.trim(),
      jezici: vrijednosti.jezici.split(',').map((j) => j.trim()).filter(Boolean),
      dobDjece: DOBNE_SKUPINE.filter((s) => vrijednosti.dobDjece.includes(s)),
      dostupnost: vrijednosti.dostupnost,
    });
  };

  const greska = (polje) =>
    pokusano && greske[polje] ? <span className="error" role="alert">{greske[polje]}</span> : null;

  return (
    <form className="form panel nanny-form" onSubmit={spremi} noValidate>
      <h3>{dadilja ? `Promjena dadilje: ${dadilja.ime}` : 'Nova dadilja'}</h3>

      <div className="nanny-form__grid">
        <label className="field">
          <span>Ime i prezime</span>
          <input name="ime" value={vrijednosti.ime} onChange={promijeni} />
          {greska('ime')}
        </label>
        <label className="field">
          <span>Grad</span>
          <input name="grad" value={vrijednosti.grad} onChange={promijeni} />
          {greska('grad')}
        </label>
        <label className="field">
          <span>Kvart</span>
          <input name="kvart" value={vrijednosti.kvart} onChange={promijeni} />
          {greska('kvart')}
        </label>
        <label className="field">
          <span>Godine iskustva</span>
          <input name="iskustvo" type="number" min="0" max="50" value={vrijednosti.iskustvo} onChange={promijeni} />
          {greska('iskustvo')}
        </label>
        <label className="field">
          <span>Cijena (€/h)</span>
          <input name="cijena" type="number" min="0" step="0.5" value={vrijednosti.cijena} onChange={promijeni} />
          {greska('cijena')}
        </label>
        <label className="field">
          <span>Jezici (odvojeni zarezom)</span>
          <input name="jezici" value={vrijednosti.jezici} onChange={promijeni} />
          {greska('jezici')}
        </label>
      </div>

      <label className="field">
        <span>Kratki opis ({vrijednosti.opis.length}/200)</span>
        <textarea name="opis" rows="2" value={vrijednosti.opis} onChange={promijeni} />
        {greska('opis')}
      </label>

      <label className="field">
        <span>Biografija (nije obavezna)</span>
        <textarea name="biografija" rows="3" value={vrijednosti.biografija} onChange={promijeni} />
      </label>

      <fieldset className="field">
        <legend>Dob djece s kojom radi</legend>
        {DOBNE_SKUPINE.map((s) => (
          <label key={s} className="check">
            <input type="checkbox" checked={vrijednosti.dobDjece.includes(s)} onChange={() => prebaciDob(s)} />
            {s}
          </label>
        ))}
        {greska('dobDjece')}
      </fieldset>

      <fieldset className="field">
        <legend>Dostupnost</legend>
        <div className="nanny-form__dostupnost">
          {DANI.map((dan) => (
            <div key={dan.id}>
              <strong>{dan.kratko}</strong>
              {TERMINI.map((t) => (
                <label key={t.id} className="check" title={`${t.naziv} ${t.sati}`}>
                  <input
                    type="checkbox"
                    checked={vrijednosti.dostupnost[dan.id].includes(t.id)}
                    onChange={() => prebaciTermin(dan.id, t.id)}
                  />
                  {t.naziv}
                </label>
              ))}
            </div>
          ))}
        </div>
      </fieldset>

      <div className="nanny-form__gumbi">
        <button type="submit" className="btn btn--primary">Spremi</button>
        <button type="button" className="btn btn--ghost" onClick={onOdustani}>Odustani</button>
      </div>
    </form>
  );
}
