import { registraVista, render } from "./visteRouter.js";
import { renderHome } from "./visteHome.js";
import { renderUnitPrototype, renderExercisePrototype } from "./visteUnita.js";
import {
  renderRegisterForm,
  renderLoginForm,
  renderProfilePage,
  renderTermsPage,
  renderPrivacyPage,
} from "./visteAccount.js";
import { initHamburgerMenu } from "./menuHamburger.js";

// Registra tutte le viste gestite dal router minimale.
registraVista("home", renderHome);
registraVista("unit", renderUnitPrototype);
registraVista("exercise", renderExercisePrototype);
registraVista("register", renderRegisterForm);
registraVista("login", renderLoginForm);
registraVista("profile", renderProfilePage);
registraVista("terms", renderTermsPage);
registraVista("privacy", renderPrivacyPage);

// Avvio dell'applicazione.
render();
initHamburgerMenu();
