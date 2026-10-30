import Avatar from './Avatar.jsx';
import Rating from './Rating.jsx';
import { formatirajCijenu, formatirajGodine } from '../utils/format.js';

// Kartica dadilje u popisu.
export default function NannyCard({ dadilja, onOtvori }) {
  return (
    <article className="card">
      <div className="card__top">
        <Avatar dadilja={dadilja} />
        <div>
          <h3 className="card__name">{dadilja.ime}</h3>
          <p className="muted">📍 {dadilja.grad}, {dadilja.kvart}</p>
        </div>
      </div>

      <p className="card__desc">{dadilja.opis}</p>

      <ul className="chips">
        <li className="chip">{formatirajGodine(dadilja.iskustvo)} iskustva</li>
        <li className="chip chip--price">{formatirajCijenu(dadilja.cijena)}</li>
        <li className="chip"><Rating ocjena={dadilja.ocjena} brojOcjena={dadilja.brojOcjena} /></li>
      </ul>

      <button className="btn btn--primary" onClick={() => onOtvori(dadilja.id)}>
        Pogledaj profil
      </button>
    </article>
  );
}
