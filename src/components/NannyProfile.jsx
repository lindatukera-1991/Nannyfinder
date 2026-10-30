import Avatar from './Avatar.jsx';
import Rating from './Rating.jsx';
import AvailabilityGrid from './AvailabilityGrid.jsx';
import ContactForm from './ContactForm.jsx';
import { formatirajCijenu, formatirajDatum, formatirajGodine } from '../utils/format.js';

// Detaljan profil dadilje: podaci, dostupnost, reference i forma za kontakt.
export default function NannyProfile({ dadilja, djeca, poslanePoruke, onPosalji, onNatrag }) {
  return (
    <div className="profile">
      <button className="link" onClick={onNatrag}>← Natrag na popis</button>

      <header className="profile__header">
        <Avatar dadilja={dadilja} velicina="lg" />
        <div>
          <h2>{dadilja.ime}</h2>
          <p className="muted">📍 {dadilja.grad}, {dadilja.kvart}</p>
          <ul className="chips">
            <li className="chip"><Rating ocjena={dadilja.ocjena} brojOcjena={dadilja.brojOcjena} /></li>
            <li className="chip">{formatirajGodine(dadilja.iskustvo)} iskustva</li>
            <li className="chip chip--price">{formatirajCijenu(dadilja.cijena)}</li>
          </ul>
        </div>
      </header>

      <div className="profile__layout">
        <div className="profile__main">
          <section className="panel">
            <h3>O meni</h3>
            <p>{dadilja.biografija}</p>
          </section>

          <section className="panel">
            <h3>Iskustvo i vještine</h3>
            <dl className="details">
              <dt>Dob djece</dt>
              <dd>{dadilja.dobDjece.join(', ')}</dd>
              <dt>Jezici</dt>
              <dd>{dadilja.jezici.join(', ')}</dd>
              <dt>Godine iskustva</dt>
              <dd>{dadilja.iskustvo}</dd>
            </dl>
          </section>

          <section className="panel">
            <h3>Dostupnost</h3>
            <AvailabilityGrid dostupnost={dadilja.dostupnost} />
          </section>

          <section className="panel">
            <h3>Reference</h3>
            <ul className="references">
              {dadilja.reference.map((r) => (
                <li key={r.ime}>
                  <blockquote>„{r.tekst}“</blockquote>
                  <cite>— {r.ime}</cite>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="profile__side">
          <section className="panel">
            <ContactForm dadilja={dadilja} djeca={djeca} onPosalji={onPosalji} />
          </section>

          {poslanePoruke.length > 0 && (
            <section className="panel">
              <h3>Vaše poslane poruke ({poslanePoruke.length})</h3>
              <ul className="sent">
                {poslanePoruke.map((p) => (
                  <li key={p.id}>
                    <small className="muted">{formatirajDatum(p.poslano)} · {p.termin}</small>
                    {p.djeca?.length > 0 && <small className="muted">Djeca: {p.djeca.map((d) => `${d.sifra} (${d.skupina})`).join(', ')}</small>}
                    <p>{p.poruka}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
