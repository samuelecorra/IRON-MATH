// Router minimale che delega il rendering alle viste registrate.
import { state } from "./statoApplicazione.js";

const viewRegistry = new Map();

export function registraVista(nomeVista, renderer) {
  viewRegistry.set(nomeVista, renderer);
}

export function render() {
  const renderer = viewRegistry.get(state.currentView);
  if (typeof renderer === "function") {
    renderer();
  } else {
    console.warn(`Nessun renderer registrato per la vista "${state.currentView}".`);
  }
}

export function navigateTo(viewName) {
  state.currentView = viewName;
  render();
}
