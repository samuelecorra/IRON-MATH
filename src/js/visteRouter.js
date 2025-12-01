// Router minimale che delega il rendering alle viste registrate.
import { stato } from "./statoApplicazione.js";

const registroViste = new Map();

export function registraVista(nomeVista, renderer) {
  registroViste.set(nomeVista, renderer);
}

export function renderizzaVistaCorrente() {
  const renderer = registroViste.get(stato.vistaCorrente);
  if (typeof renderer === "function") {
    renderer();
  } else {
    console.warn(
      `Nessun renderer registrato per la vista "${stato.vistaCorrente}".`
    );
  }
}

export function navigaVersoVista(nomeVista) {
  stato.vistaCorrente = nomeVista;
  renderizzaVistaCorrente();
}
