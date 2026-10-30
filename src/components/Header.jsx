// Zaglavlje aplikacije; klik na logo vraća na popis.
export default function Header({ onPocetna }) {
  return (
    <header className="header">
      <div className="container header__inner">
        <button className="logo" onClick={onPocetna}>
          <span aria-hidden="true">🧸</span> NannyFinder
        </button>
        <span className="muted header__tag">Pouzdana dadilja u vašem gradu</span>
      </div>
    </header>
  );
}
