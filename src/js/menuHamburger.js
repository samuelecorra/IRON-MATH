// Logica di apertura/chiusura del menu hamburger per mobile.

// La funzione viene esportata e poi richiamata in main.js all'avvio della pagina.
export function inizializzaMenuHamburger() {
  // Recupero dal DOM il pulsante hamburger e il menu di navigazione.
  const pulsanteHamburger = document.getElementById("pulsante-hamburger");
  const menuNavigazione = document.getElementById("menu-navigazione");

  // Guard clause: se uno dei due elementi non esiste, interrompi.
  // Serve a evitare errori JavaScript su pagine che non hanno l'hamburger.
  if (!pulsanteHamburger || !menuNavigazione) return;

  // Funzione per chiudere il menu.
  // Rimuove classi, aggiorna aria-expanded, e riabilita lo scroll del body.
  const chiudiMenuHamburger = () => {
    menuNavigazione.classList.remove("aperta"); // Chiude visivamente il menu
    pulsanteHamburger.classList.remove("attivo"); // Resetta l'animazione del pulsante
    pulsanteHamburger.setAttribute("aria-expanded", "false"); // Accessibilità
    document.body.style.overflow = ""; // Riabilita lo scroll della pagina
  };

  // Funzione per aprire il menu.
  const apriMenuHamburger = () => {
    menuNavigazione.classList.add("aperta"); // Apre visivamente il menu
    pulsanteHamburger.classList.add("attivo"); // Anima il pulsante hamburger
    pulsanteHamburger.setAttribute("aria-expanded", "true"); // Accessibilità
    document.body.style.overflow = "hidden"; // Disabilita lo scroll globale
  };

  // Quando clicco sul pulsante hamburger
  pulsanteHamburger.addEventListener("click", (event) => {
    event.stopPropagation(); // Impedisce al click di propagarsi al document

    const aperto = menuNavigazione.classList.contains("aperta"); // Controllo se il menu è già aperto

    // Toggle: se è aperto chiudo, se è chiuso apro
    if (aperto) {
      chiudiMenuHamburger();
    } else {
      apriMenuHamburger();
    }
  });

  // Click globale sul documento:
  // Se clicco fuori dal menu e fuori dal pulsante, il menu si chiude.
  document.addEventListener("click", (event) => {
    const clicFuoriMenu = !menuNavigazione.contains(event.target);
    const clicFuoriPulsante = !pulsanteHamburger.contains(event.target);

    if (clicFuoriMenu && clicFuoriPulsante) {
      chiudiMenuHamburger();
    }
  });

  // Quando la finestra viene ridimensionata:
  // Se supero i 1000px significa che passo a desktop,
  // quindi forzo la chiusura del menu mobile.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1000) {
      chiudiMenuHamburger();
    }
  });

  // Aggiungo listener ai bottoni interni del menu:
  // Se clicco una voce del menu mobile, chiudi il menu.
  menuNavigazione
    .querySelectorAll(".pulsante-navigazione")
    .forEach((pulsante) => {
      pulsante.addEventListener("click", () => {
        chiudiMenuHamburger();
      });
    });
}
