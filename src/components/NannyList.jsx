import NannyCard from './NannyCard.jsx';

// Popis kartica ili poruka kad nema rezultata.
export default function NannyList({ dadilje, onOtvori, onOcistiFiltere }) {
  if (dadilje.length === 0) {
    return (
      <div className="empty">
        <p className="empty__emoji" aria-hidden="true">🔍</p>
        <h3>Nema dadilja za odabrane filtere</h3>
        <p className="muted">Pokušajte proširiti pretragu ili ukloniti neki filter.</p>
        <button className="btn btn--ghost" onClick={onOcistiFiltere}>Očisti filtere</button>
      </div>
    );
  }

  return (
    <div className="grid">
      {dadilje.map((d) => (
        <NannyCard key={d.id} dadilja={d} onOtvori={onOtvori} />
      ))}
    </div>
  );
}
