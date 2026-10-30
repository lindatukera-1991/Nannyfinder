import { DANI, TERMINI } from '../data/constants.js';

// Tjedni raspored: redovi su termini, stupci su dani. Zelena ćelija = slobodna.
export default function AvailabilityGrid({ dostupnost }) {
  return (
    <div className="availability" role="table" aria-label="Tjedna dostupnost">
      <div className="availability__row" role="row">
        <span role="columnheader" />
        {DANI.map((dan) => (
          <span key={dan.id} role="columnheader" className="availability__head" title={dan.naziv}>
            {dan.kratko}
          </span>
        ))}
      </div>

      {TERMINI.map((termin) => (
        <div key={termin.id} className="availability__row" role="row">
          <span role="rowheader" className="availability__label">
            {termin.naziv}
            <small>{termin.sati}</small>
          </span>
          {DANI.map((dan) => {
            const slobodna = dostupnost[dan.id].includes(termin.id);
            return (
              <span
                key={dan.id}
                role="cell"
                className={`availability__cell ${slobodna ? 'availability__cell--free' : ''}`}
                aria-label={`${dan.naziv}, ${termin.naziv}: ${slobodna ? 'slobodna' : 'zauzeta'}`}
              >
                {slobodna ? '✓' : ''}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}
