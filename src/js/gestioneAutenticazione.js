import { state } from "./statoApplicazione.js";
import {
  appElement,
  authButton,
  authButtonLabel,
  authDropdown,
} from "./riferimentiDom.js";
import {
  ottieniUtenti,
  salvaUtenti,
  trovaUtentePerIdentificativo,
  impostaUtenteCorrente,
  ottieniUtenteCorrente,
  disconnettiUtenteCorrente,
  impostaRicordami,
  leggiRicordami,
  leggiCredenzialiMemorizzate,
} from "./gestioneUtenti.js";
import {
  normalizzaTelefono,
  validaEmail,
  validaTelefono,
  sanificaHtml,
} from "./utilitaValidazione.js";
import { mostraAlertGlobale, mostraModal } from "./componentiInterfaccia.js";

export function aggiornaBottoneAutenticazione() {
  const currentUser = ottieniUtenteCorrente();
  if (authButtonLabel) {
    authButtonLabel.textContent = currentUser
      ? `Buono studio, ${currentUser.nome}`
      : "Registrati/Accedi";
  }
}

export function inizializzaNavigazioneAuth({ aggiornaVista }) {
  if (!authButton || !authDropdown) return;

  authButton.addEventListener("click", (event) => {
    event.stopPropagation();
    const currentUser = ottieniUtenteCorrente();
    if (!currentUser) {
      chiudiDropdownAuth();
      if (ottieniUtenti().length === 0) {
        state.currentView = "register";
      } else {
        state.currentView = "login";
      }
      aggiornaVista();
      return;
    }
    toggleDropdownAuth();
  });

  authDropdown.addEventListener("click", (event) => {
    const actionBtn = event.target.closest("button[data-action]");
    if (!actionBtn) return;
    const { action } = actionBtn.dataset;
    chiudiDropdownAuth();
    if (action === "profile") {
      state.currentView = "profile";
      aggiornaVista();
    } else if (action === "logout") {
      mostraModalLogout({ aggiornaVista });
    }
  });

  document.addEventListener("click", (event) => {
    if (
      authDropdown.classList.contains("open") &&
      !authDropdown.contains(event.target) &&
      !authButton.contains(event.target)
    ) {
      chiudiDropdownAuth();
    }
  });

  aggiornaBottoneAutenticazione();
}

function toggleDropdownAuth() {
  if (!authDropdown || !authButton) return;
  const isOpen = authDropdown.classList.toggle("open");
  authDropdown.setAttribute("aria-hidden", String(!isOpen));
  authButton.setAttribute("aria-expanded", String(isOpen));
}

function chiudiDropdownAuth() {
  if (!authDropdown || !authButton) return;
  authDropdown.classList.remove("open");
  authDropdown.setAttribute("aria-hidden", "true");
  authButton.setAttribute("aria-expanded", "false");
}

export function renderizzaModuloRegistrazione({ aggiornaVista, mostraAlert }) {
  state.currentView = "register";
  appElement.innerHTML = `
    <section class="im-card auth-card max-w-3xl mx-auto mt-4">
      <p class="im-tagline">Account</p>
      <h2 class="im-title">Registrazione IronMath</h2>
      <p class="im-subtitle">
        Compila i campi per creare il tuo profilo e iniziare il percorso guidato.
      </p>
      <form id="register-form" class="mt-6 flex flex-col gap-4">
        <div class="grid gap-4 md:grid-cols-2">
          <div>
            <label class="im-label" for="reg-nome">Nome</label>
            <input class="im-input" id="reg-nome" name="nome" type="text" required />
          </div>
          <div>
            <label class="im-label" for="reg-cognome">Cognome</label>
            <input class="im-input" id="reg-cognome" name="cognome" type="text" required />
          </div>
          <div>
            <label class="im-label" for="reg-sesso">Sesso</label>
            <select class="im-input" id="reg-sesso" name="sesso" required>
              <option value="">Seleziona</option>
              <option value="Maschio">Maschio</option>
              <option value="Femmina">Femmina</option>
              <option value="Altro">Altro</option>
            </select>
          </div>
          <div>
            <label class="im-label" for="reg-email">Email</label>
            <input class="im-input" id="reg-email" name="email" type="email" required />
          </div>
          <div>
            <label class="im-label" for="reg-telefono">Numero di cellulare</label>
            <input
              class="im-input"
              id="reg-telefono"
              name="telefono"
              type="tel"
              inputmode="tel"
              value="+39"
              required
            />
          </div>
          <div>
            <label class="im-label" for="reg-citta">Città</label>
            <input class="im-input" id="reg-citta" name="citta" type="text" required />
          </div>
          <div>
            <label class="im-label" for="reg-username">Username</label>
            <input class="im-input" id="reg-username" name="username" type="text" required />
          </div>
          <div>
            <label class="im-label" for="reg-password">Password</label>
            <input class="im-input" id="reg-password" name="password" type="password" minlength="8" required />
          </div>
          <div class="md:col-span-2">
            <label class="im-label" for="reg-confirm-password">Conferma password</label>
            <input
              class="im-input"
              id="reg-confirm-password"
              name="confirmPassword"
              type="password"
              minlength="8"
              required
            />
          </div>
        </div>
        <button class="im-button self-end" type="submit">Completa registrazione</button>
        <div class="text-center text-sm text-gray-300">
          Hai già un account?
          <button type="button" class="im-link-button" id="login-link">Accedi</button>
        </div>
      </form>
    </section>
  `;

  document
    .getElementById("register-form")
    .addEventListener("submit", (event) =>
      gestisciSubmitRegistrazione(event, { mostraAlert, aggiornaVista })
    );
  document.getElementById("login-link").addEventListener("click", () => {
    state.currentView = "login";
    aggiornaVista();
  });
}

function gestisciSubmitRegistrazione(event, { mostraAlert, aggiornaVista }) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const payload = {
    nome: (formData.get("nome") || "").trim(),
    cognome: (formData.get("cognome") || "").trim(),
    sesso: (formData.get("sesso") || "").trim(),
    email: (formData.get("email") || "").trim(),
    telefono: normalizzaTelefono((formData.get("telefono") || "").trim()),
    citta: (formData.get("citta") || "").trim(),
    username: (formData.get("username") || "").trim(),
    password: formData.get("password"),
  };
  const confirmPassword = formData.get("confirmPassword");

  const validationError = validaRegistrazione(payload, confirmPassword);
  if (validationError) {
    mostraAlert(validationError, "error");
    return;
  }

  const newUser = {
    ...payload,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  const users = ottieniUtenti();
  users.push(newUser);
  salvaUtenti(users);

  mostraAlert(
    "Registrazione completata con successo! Ora effettua il login per accedere al tuo account.",
    "success"
  );
  state.currentView = "login";
  aggiornaVista();
}

function validaRegistrazione(payload, confirmPassword) {
  const users = ottieniUtenti();
  if (!payload.nome) return "Il nome è obbligatorio.";
  if (!payload.cognome) return "Il cognome è obbligatorio.";
  if (!payload.sesso) return "Seleziona il sesso.";
  if (!payload.email || !validaEmail(payload.email))
    return "Inserisci un'email valida.";
  if (!validaTelefono(payload.telefono))
    return "Inserisci un numero di cellulare valido.";
  if (!payload.citta) return "La città è obbligatoria.";
  if (!payload.username)
    return "Scegli un username per accedere alla piattaforma.";
  const usernameTaken = users.some(
    (user) => user.username.toLowerCase() === payload.username.toLowerCase()
  );
  if (usernameTaken) return "Username già utilizzato.";
  if (!payload.password || payload.password.length < 8)
    return "La password deve contenere almeno 8 caratteri.";
  if (payload.password !== confirmPassword)
    return "Le password non coincidono.";
  return null;
}

export function renderizzaModuloLogin({ aggiornaVista, mostraAlert }) {
  state.currentView = "login";
  const rememberFlag = leggiRicordami();
  const rememberedCredentials = leggiCredenzialiMemorizzate();
  const identifierValue =
    rememberFlag && rememberedCredentials
      ? rememberedCredentials.identifier
      : "";
  const passwordValue =
    rememberFlag && rememberedCredentials ? rememberedCredentials.password : "";

  appElement.innerHTML = `
    <section class="im-card auth-card max-w-xl mx-auto mt-4">
      <p class="im-tagline">Ben tornato</p>
      <h2 class="im-title">Accedi al tuo account</h2>
      <form id="login-form" class="mt-6 flex flex-col gap-4">
        <div>
          <label class="im-label" for="login-identifier">Username o Email</label>
          <input
            class="im-input"
            id="login-identifier"
            name="identifier"
            type="text"
            required
            value="${sanificaHtml(identifierValue)}"
          />
        </div>
        <div>
          <label class="im-label" for="login-password">Password</label>
          <input
            class="im-input"
            id="login-password"
            name="password"
            type="password"
            required
            value="${sanificaHtml(passwordValue)}"
          />
        </div>
        <label class="flex items-center gap-2 text-sm text-gray-300">
          <input type="checkbox" name="remember" ${
            rememberFlag ? "checked" : ""
          } />
          Ricordami in questa sessione
        </label>
        <button class="im-button self-end" type="submit">Accedi</button>
        <div class="text-center text-sm text-gray-300">
          Non hai un account?
          <button type="button" class="im-link-button" id="register-link">Registrati</button>
        </div>
      </form>
    </section>
  `;

  document
    .getElementById("login-form")
    .addEventListener("submit", (event) =>
      gestisciSubmitLogin(event, { mostraAlert, aggiornaVista })
    );
  document.getElementById("register-link").addEventListener("click", () => {
    state.currentView = "register";
    aggiornaVista();
  });
}

function gestisciSubmitLogin(event, { mostraAlert, aggiornaVista }) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const identifier = (formData.get("identifier") || "").trim();
  const password = formData.get("password");

  if (!identifier || !password) {
    mostraAlert("Inserisci username/email e password.", "error");
    return;
  }

  const user = trovaUtentePerIdentificativo(identifier);
  if (!user) {
    mostraAlert("Utente non trovato.", "error");
    return;
  }
  if (user.password !== password) {
    mostraAlert("Password errata.", "error");
    return;
  }

  impostaUtenteCorrente(user.id);
  const remember = formData.get("remember") === "on";
  if (remember) {
    impostaRicordami(true, { identifier, password });
  } else {
    impostaRicordami(false);
  }
  aggiornaBottoneAutenticazione();
  chiudiDropdownAuth();
  mostraAlert(`Bentornato, ${user.nome}!`, "success");
  state.currentView = "home";
  aggiornaVista();
}

export function renderizzaProfiloUtente({ aggiornaVista, mostraAlert }) {
  const currentUser = ottieniUtenteCorrente();
  if (!currentUser) {
    mostraAlert("Devi accedere per visualizzare il profilo.", "error");
    state.currentView = "login";
    aggiornaVista();
    return;
  }

  state.currentView = "profile";
  appElement.innerHTML = `
    <section class="im-card max-w-3xl mx-auto mt-4">
      <p class="im-tagline">Profilo utente</p>
      <h2 class="im-title">Gestione profilo</h2>
      <form id="profile-form" class="mt-6 grid gap-4 md:grid-cols-2">
        ${campoProfilo("Nome", "nome", currentUser.nome)}
        ${campoProfilo("Cognome", "cognome", currentUser.cognome)}
        ${campoProfilo("Sesso", "sesso", currentUser.sesso)}
        ${campoProfilo("Email", "email", currentUser.email, "email")}
        ${campoProfilo("Telefono", "telefono", currentUser.telefono)}
        ${campoProfilo("Città", "citta", currentUser.citta)}
        ${campoProfilo("Username", "username", currentUser.username, "text", true)}
      </form>
      <div class="mt-6 flex flex-wrap gap-3">
        <button type="button" class="im-button secondary" id="back-home-btn">
          Torna indietro
        </button>
        <button type="button" class="im-button secondary" id="edit-profile-btn">
          Modifica dati
        </button>
        <button type="button" class="im-button" id="save-profile-btn" disabled>
          Salva modifiche
        </button>
      </div>
      <div class="profile-links flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-6 text-sm">
        <button type="button" class="im-link-button" data-legal="terms">
          Visualizza i termini e le condizioni
        </button>
        <button type="button" class="im-link-button" data-legal="privacy">
          Visualizza l’informativa privacy
        </button>
      </div>
    </section>
  `;

  impostaProfiloModificabile(false);
  document
    .getElementById("back-home-btn")
    .addEventListener("click", () => {
      state.currentView = "home";
      aggiornaVista();
    });
  document
    .getElementById("edit-profile-btn")
    .addEventListener("click", () =>
      gestisciModificaProfilo(currentUser, { mostraAlert })
    );
  document
    .getElementById("save-profile-btn")
    .addEventListener("click", () =>
      gestisciSalvataggioProfilo(currentUser, { mostraAlert, aggiornaVista })
    );
  document.querySelectorAll(".profile-links .im-link-button").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.legal === "terms") {
        state.currentView = "terms";
      } else {
        state.currentView = "privacy";
      }
      aggiornaVista();
    });
  });
}

function campoProfilo(label, name, value, type = "text", readOnlyForced = false) {
  const fieldId = `profile-${name}`;
  const readonlyAttr = readOnlyForced
    ? "readonly"
    : 'readonly data-editable="true"';
  const safeValue = sanificaHtml(value ?? "");
  return `
    <div>
      <label class="im-label" for="${fieldId}">${label}</label>
      <input
        class="im-input"
        id="${fieldId}"
        name="${name}"
        type="${type}"
        value="${safeValue}"
        ${readonlyAttr}
      />
    </div>
  `;
}

function impostaProfiloModificabile(enabled) {
  const form = document.getElementById("profile-form");
  if (!form) return;
  form.querySelectorAll("[data-editable]").forEach((input) => {
    input.toggleAttribute("readonly", !enabled);
    input.classList.toggle("editable", enabled);
  });
  const saveBtn = document.getElementById("save-profile-btn");
  if (saveBtn) {
    saveBtn.disabled = !enabled;
  }
}

function gestisciModificaProfilo(currentUser, { mostraAlert }) {
  mostraModal({
    title: "Modifica profilo",
    message:
      "Inserisci la tua password attuale per poter modificare i dati del profilo.",
    contentHTML: `
      <label class="im-label mt-4" for="modal-password">Password attuale</label>
      <input class="im-input" id="modal-password" type="password" />
    `,
    confirmText: "Conferma",
    cancelText: "Annulla",
    onConfirm: () => {
      const passwordInput = document.getElementById("modal-password");
      if (!passwordInput || !passwordInput.value) {
        mostraAlert("Inserisci la password.", "error");
        return false;
      }
      if (passwordInput.value !== currentUser.password) {
        mostraAlert("Password errata.", "error");
        return false;
      }
      impostaProfiloModificabile(true);
      return true;
    },
  });
}

function gestisciSalvataggioProfilo(currentUser, { mostraAlert, aggiornaVista }) {
  const form = document.getElementById("profile-form");
  if (!form) return;
  const formData = new FormData(form);
  const updatedUser = {
    ...currentUser,
    nome: (formData.get("nome") || "").trim(),
    cognome: (formData.get("cognome") || "").trim(),
    sesso: (formData.get("sesso") || "").trim(),
    email: (formData.get("email") || "").trim(),
    telefono: normalizzaTelefono((formData.get("telefono") || "").trim()),
    citta: (formData.get("citta") || "").trim(),
  };

  const error = validaAggiornamentoProfilo(updatedUser);
  if (error) {
    mostraAlert(error, "error");
    return;
  }

  const users = ottieniUtenti().map((user) =>
    user.id === currentUser.id ? updatedUser : user
  );
  salvaUtenti(users);
  impostaProfiloModificabile(false);
  aggiornaBottoneAutenticazione();
  mostraAlert("Profilo aggiornato con successo.", "success");
  state.currentView = "profile";
  aggiornaVista();
}

function validaAggiornamentoProfilo(user) {
  if (!user.nome) return "Il nome è obbligatorio.";
  if (!user.cognome) return "Il cognome è obbligatorio.";
  if (!user.email || !validaEmail(user.email))
    return "Inserisci un'email valida.";
  if (!validaTelefono(user.telefono))
    return "Inserisci un numero di cellulare valido.";
  if (!user.citta) return "La città è obbligatoria.";
  return null;
}

function mostraModalLogout({ aggiornaVista }) {
  const remember = leggiRicordami();
  mostraModal({
    title: "Logout",
    message: remember
      ? "Sei sicuro di voler effettuare il logout? Hai selezionato 'ricordami' durante il login: i tuoi dati di accesso sono salvati in questa sessione."
      : "Sei sicuro di voler effettuare il logout?",
    confirmText: "Conferma logout",
    cancelText: "Annulla",
    onConfirm: () => {
      disconnettiUtenteCorrente();
      impostaRicordami(false);
      aggiornaBottoneAutenticazione();
      state.currentView = "home";
      aggiornaVista();
      mostraAlertGlobale("Logout completato.", "success");
      return true;
    },
  });
}

export function renderizzaTerminiLegali({ aggiornaVista }) {
  if (!ottieniUtenteCorrente()) {
    state.currentView = "login";
    aggiornaVista();
    return;
  }
  state.currentView = "terms";
  appElement.innerHTML = `
    <section class="im-card legal-card max-w-4xl mx-auto mt-4">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <button class="im-button secondary" type="button" id="back-to-profile-terms">Torna indietro</button>
        <button class="im-button" type="button" id="go-privacy">Vai all’informativa privacy</button>
      </div>
      <h2 class="im-title mt-4">Termini e condizioni</h2>
      <div class="legal-content">
        <h3>1. Introduzione</h3>
        <p>
          I presenti termini disciplinano l’utilizzo del prototipo IronMath. Accedendo
          alla piattaforma accetti di seguire un percorso guidato basato su prerequisiti chiari e trasparenti.
        </p>
        <h3>2. Servizi offerti</h3>
        <p>
          IronMath fornisce percorsi diagnostici, tutoraggio e materiali di studio personalizzati.
          Il servizio non sostituisce la scuola, ma la integra con feedback puntuali e misurabili.
        </p>
        <h3>3. Obblighi dell’utente</h3>
        <p>
          L’utente si impegna a fornire dati veritieri, a non condividere le proprie credenziali e a completare
          in autonomia gli esercizi proposti. Un uso improprio comporterà la sospensione dell’account.
        </p>
        <h3>4. Proprietà intellettuale</h3>
        <p>
          Tutti i contenuti, i marchi e le interfacce sono di proprietà di IronMath. È vietata qualsiasi riproduzione
          non autorizzata del materiale didattico.
        </p>
        <h3>5. Limitazione di responsabilità</h3>
        <p>
          IronMath è un tutor digitale: i risultati dipendono dall’impegno dell’utente. Non garantiamo il superamento
          degli esami, ma ti forniamo strumenti concreti per migliorare.
        </p>
        <h3>6. Modifiche</h3>
        <p>
          Ci riserviamo di aggiornare termini e funzionalità. Qualsiasi modifica rilevante verrà comunicata tramite
          pannello profilo o email.
        </p>
      </div>
    </section>
  `;

  document
    .getElementById("back-to-profile-terms")
    .addEventListener("click", () => {
      state.currentView = "profile";
      aggiornaVista();
    });
  document
    .getElementById("go-privacy")
    .addEventListener("click", () => {
      state.currentView = "privacy";
      aggiornaVista();
    });
}

export function renderizzaPrivacyLegale({ aggiornaVista }) {
  if (!ottieniUtenteCorrente()) {
    state.currentView = "login";
    aggiornaVista();
    return;
  }
  state.currentView = "privacy";
  appElement.innerHTML = `
    <section class="im-card legal-card max-w-4xl mx-auto mt-4">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <button class="im-button secondary" type="button" id="back-to-profile-privacy">Torna indietro</button>
        <button class="im-button" type="button" id="go-terms">Vai ai termini e condizioni</button>
      </div>
      <h2 class="im-title mt-4">Informativa privacy</h2>
      <div class="legal-content">
        <h3>1. Titolare del trattamento</h3>
        <p>
          IronMath tratta i dati personali degli studenti per fornire un percorso di apprendimento adattivo e tracciato.
        </p>
        <h3>2. Dati raccolti</h3>
        <p>
          Raccogliamo nome, cognome, contatti, informazioni sul percorso scolastico e l’attività svolta sulla piattaforma.
          I dati sono utilizzati esclusivamente per personalizzare lezioni e report.
        </p>
        <h3>3. Base giuridica</h3>
        <p>
          Il trattamento si fonda sul consenso dell’utente e sull’esecuzione delle misure precontrattuali richieste.
        </p>
        <h3>4. Conservazione</h3>
        <p>
          I dati vengono conservati finché l’account resta attivo o per il tempo necessario a dimostrare le attività svolte.
        </p>
        <h3>5. Diritti dell’utente</h3>
        <p>
          Puoi richiedere accesso, rettifica, cancellazione o portabilità scrivendo al nostro supporto. Gestiremo la richiesta
          entro 30 giorni.
        </p>
        <h3>6. Sicurezza</h3>
        <p>
          Utilizziamo sistemi di logging e monitoraggio per prevenire accessi non autorizzati. In caso di violazione sarai informato tempestivamente.
        </p>
      </div>
    </section>
  `;

  document
    .getElementById("back-to-profile-privacy")
    .addEventListener("click", () => {
      state.currentView = "profile";
      aggiornaVista();
    });
  document
    .getElementById("go-terms")
    .addEventListener("click", () => {
      state.currentView = "terms";
      aggiornaVista();
    });
}
