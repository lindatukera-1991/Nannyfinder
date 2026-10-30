import { useLocalStorage } from './useLocalStorage.js';

// "Backend" za poruke: sve se sprema u localStorage pod jednim ključem.
export function useMessages() {
  const [poruke, setPoruke] = useLocalStorage('nannyfinder.poruke', []);

  const posaljiPoruku = (dadiljaId, podaci) => {
    const poruka = {
      id: crypto.randomUUID(),
      dadiljaId,
      poslano: new Date().toISOString(),
      ...podaci,
    };
    setPoruke((prethodne) => [poruka, ...prethodne]);
    return poruka;
  };

  const porukeZaDadilju = (dadiljaId) => poruke.filter((p) => p.dadiljaId === dadiljaId);

  return { poruke, posaljiPoruku, porukeZaDadilju };
}
