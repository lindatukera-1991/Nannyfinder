import { formatirajOcjenu } from '../utils/format.js';

// Prikaz ocjene: zvjezdica, broj i (opcionalno) broj recenzija.
export default function Rating({ ocjena, brojOcjena }) {
  return (
    <span className="rating" title={`Ocjena ${formatirajOcjenu(ocjena)} od 5`}>
      <span className="rating__star" aria-hidden="true">★</span>
      <strong>{formatirajOcjenu(ocjena)}</strong>
      {brojOcjena !== undefined && <span className="muted"> ({brojOcjena})</span>}
    </span>
  );
}
