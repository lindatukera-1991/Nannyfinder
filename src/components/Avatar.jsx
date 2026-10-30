import { inicijali } from '../utils/format.js';

// Avatar s inicijalima i bojom dadilje (umjesto fotografije).
export default function Avatar({ dadilja, velicina = 'md' }) {
  return (
    <div
      className={`avatar avatar--${velicina}`}
      style={{ background: `linear-gradient(135deg, ${dadilja.boja}, ${dadilja.boja}aa)` }}
      aria-hidden="true"
    >
      {inicijali(dadilja.ime)}
    </div>
  );
}
