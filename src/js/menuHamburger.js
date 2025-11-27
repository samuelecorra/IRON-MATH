// Logica di apertura/chiusura del menu hamburger per mobile.

// La funzione viene esportata e poi richiamata in main.js all'avvio della pagina.
export function initHamburgerMenu() {
  // Recupero dal DOM il pulsante hamburger e il menu di navigazione.
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("nav-menu");

  // Guard clause: se uno dei due elementi non esiste, interrompi.
  // Serve a evitare errori JavaScript su pagine che non hanno l'hamburger.
  if (!hamburgerBtn || !navMenu) return;

  // Funzione per chiudere il menu.
  // Rimuove classi, aggiorna aria-expanded, e riabilita lo scroll del body.
  const closeHamburgerMenu = () => {
    navMenu.classList.remove("open"); // Chiude visivamente il menu
    hamburgerBtn.classList.remove("active"); // Resetta l’animazione del pulsante
    hamburgerBtn.setAttribute("aria-expanded", "false"); // Accessibilità
    document.body.style.overflow = ""; // Riabilita lo scroll della pagina
  };

  // Funzione per aprire il menu.
  const openHamburgerMenu = () => {
    navMenu.classList.add("open"); // Apre visivamente il menu
    hamburgerBtn.classList.add("active"); // Anima il pulsante hamburger
    hamburgerBtn.setAttribute("aria-expanded", "true"); // Accessibilità
    document.body.style.overflow = "hidden"; // Disabilita lo scroll globale
  };

  // Quando clicco sul pulsante hamburger
  hamburgerBtn.addEventListener("click", (event) => {
    event.stopPropagation(); // Impedisce al click di propagarsi al document

    const isOpen = navMenu.classList.contains("open"); // Controllo se il menu è già aperto

    // Toggle: se è aperto chiudo, se è chiuso apro
    if (isOpen) {
      closeHamburgerMenu();
    } else {
      openHamburgerMenu();
    }
  });

  // Click globale sul documento:
  // Se clicco fuori dal menu e fuori dal pulsante, il menu si chiude.
  document.addEventListener("click", (event) => {
    const clickedOutsideMenu = !navMenu.contains(event.target);
    const clickedOutsideBtn = !hamburgerBtn.contains(event.target);

    if (clickedOutsideMenu && clickedOutsideBtn) {
      closeHamburgerMenu();
    }
  });

  // Quando la finestra viene ridimensionata:
  // Se supero i 1000px significa che passo a desktop,
  // quindi forzo la chiusura del menu mobile.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1000) {
      closeHamburgerMenu();
    }
  });

  // Aggiungo listener ai bottoni interni del menu:
  // Se clicco una voce del menu mobile, chiudi il menu.
  navMenu.querySelectorAll(".nav-btn").forEach((button) => {
    button.addEventListener("click", () => {
      closeHamburgerMenu();
    });
  });
}
