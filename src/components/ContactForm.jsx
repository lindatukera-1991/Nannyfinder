import { useState } from 'react';
import { DANI, nazivDana, nazivTermina } from '../data/constants.js';
import { validirajPoruku } from '../utils/validation.js';

const PRAZNA_FORMA = { imeRoditelja: '', kontakt: '', termin: '', poruka: '' };

// Forma za kontaktiranje dadilje: kontrolirani inputi + validacija pri slanju i pri napuštanju polja.
export default function ContactForm({ dadilja, djeca = [], onPosalji }) {
  const [vrijednosti, setVrijednosti] = useState(PRAZNA_FORMA);
  const [odabranaDjecaIds, setOdabranaDjecaIds] = useState([]); // djeca za koju tražim dadilju
  const prebaciDijete = (id) =>
    setOdabranaDjecaIds((ids) => (ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id]));
  const [dirnuta, setDirnuta] = useState({}); // polja koja je korisnik već dotaknuo
  const [uspjeh, setUspjeh] = useState(null);

  const greske = validirajPoruku(vrijednosti);

  // Mogući termini = samo oni u kojima je dadilja slobodna
  const mogucaTermini = DANI.flatMap((dan) =>
    dadilja.dostupnost[dan.id].map((t) => ({
      vrijednost: `${dan.id}|${t}`,
      oznaka: `${dan.naziv}, ${nazivTermina(t).toLowerCase()}`,
    }))
  );

  const promijeni = (e) => {
    const { name, value } = e.target;
    setVrijednosti((v) => ({ ...v, [name]: value }));
    setUspjeh(null);
  };
  const dotakni = (e) => setDirnuta((d) => ({ ...d, [e.target.name]: true }));

  const posalji = (e) => {
    e.preventDefault();
    setDirnuta({ imeRoditelja: true, kontakt: true, termin: true, poruka: true });
    if (Object.keys(greske).length > 0) return;

    const [dan, termin] = vrijednosti.termin.split('|');
    const odabranaDjeca = djeca
      .filter((d) => odabranaDjecaIds.includes(d.id))
      .map(({ sifra, skupina }) => ({ sifra, skupina }));
    onPosalji({
      ...vrijednosti,
      djeca: odabranaDjeca,
      termin: `${nazivDana(dan)}, ${nazivTermina(termin).toLowerCase()}`,
    });
    setOdabranaDjecaIds([]);
    setUspjeh(`Poruka je poslana! ${dadilja.ime} će vam se javiti na ${vrijednosti.kontakt.trim()}.`);
    setVrijednosti(PRAZNA_FORMA);
    setDirnuta({});
  };

  const greska = (polje) =>
    dirnuta[polje] && greske[polje] ? <span className="error" role="alert">{greske[polje]}</span> : null;

  return (
    <form className="form" onSubmit={posalji} noValidate>
      <h3>Kontaktirajte {dadilja.ime.split(' ')[0]}</h3>

      {uspjeh && <p className="success" role="status">✅ {uspjeh}</p>}

      <label className="field">
        <span>Vaše ime</span>
        <input name="imeRoditelja" value={vrijednosti.imeRoditelja} onChange={promijeni} onBlur={dotakni} />
        {greska('imeRoditelja')}
      </label>

      <label className="field">
        <span>E-mail ili telefon</span>
        <input name="kontakt" value={vrijednosti.kontakt} onChange={promijeni} onBlur={dotakni} placeholder="ime@primjer.hr ili 091 234 5678" />
        {greska('kontakt')}
      </label>

      <label className="field">
        <span>Željeni termin</span>
        <select name="termin" value={vrijednosti.termin} onChange={promijeni} onBlur={dotakni}>
          <option value="">Odaberite termin…</option>
          {mogucaTermini.map((t) => <option key={t.vrijednost} value={t.vrijednost}>{t.oznaka}</option>)}
        </select>
        {greska('termin')}
      </label>

      {djeca.length > 0 && (
        <fieldset className="field">
          <legend>Za koje dijete tražite dadilju?</legend>
          {djeca.map((d) => (
            <label key={d.id} className="check">
              <input type="checkbox" checked={odabranaDjecaIds.includes(d.id)} onChange={() => prebaciDijete(d.id)} />
              {d.sifra} · {d.skupina}
            </label>
          ))}
        </fieldset>
      )}

      <label className="field">
        <span>Poruka ({vrijednosti.poruka.length}/500)</span>
        <textarea name="poruka" rows="4" value={vrijednosti.poruka} onChange={promijeni} onBlur={dotakni} placeholder="Recite nešto o djeci, lokaciji i očekivanjima…" />
        {greska('poruka')}
      </label>

      <button type="submit" className="btn btn--primary">Pošalji poruku</button>
    </form>
  );
}
