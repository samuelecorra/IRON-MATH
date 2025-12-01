import { registraVista, renderizzaVistaCorrente, navigaVersoVista } from "./visteRouter.js";
import { renderizzaHome } from "./visteHome.js";
import { renderizzaUnitaPrototipo, renderizzaEsercizioPrototipo } from "./visteUnita.js";
import {
  renderizzaModuloRegistrazione,
  renderizzaModuloLogin,
  renderizzaPaginaProfilo,
  renderizzaPaginaTermini,
  renderizzaPaginaPrivacy,
} from "./visteAccount.js";
import { inizializzaMenuHamburger } from "./menuHamburger.js";

// Registra tutte le viste gestite dal router minimale.
registraVista("home", renderizzaHome);
registraVista("unit", renderizzaUnitaPrototipo);
registraVista("exercise", renderizzaEsercizioPrototipo);
registraVista("register", renderizzaModuloRegistrazione);
registraVista("login", renderizzaModuloLogin);
registraVista("profile", renderizzaPaginaProfilo);
registraVista("terms", renderizzaPaginaTermini);
registraVista("privacy", renderizzaPaginaPrivacy);

// Avvio dell'applicazione.
renderizzaVistaCorrente();
inizializzaMenuHamburger();
