// Form e pagine collegate all'account utente.
import { appElement } from "./riferimentiDom.js";
import { state } from "./statoApplicazione.js";
import {
  getUsers,
  saveUsers,
  getCurrentUser,
  setCurrentUser,
  findUserByUsernameOrEmail,
  setRememberMe,
  getRememberMe,
  getRememberedCredentials,
} from "./storageUtente.js";
import { showGlobalAlert, showModal } from "./alertModal.js";
import { navigateTo } from "./visteRouter.js";
import { validateEmail, validatePhone, escapeHtml, normalizePhone } from "./helpersValidazione.js";

export function renderRegisterForm() {
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
    .addEventListener("submit", handleRegisterSubmit);
  document.getElementById("login-link").addEventListener("click", () => {
    navigateTo("login");
  });
}

function handleRegisterSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const payload = {
    nome: (formData.get("nome") || "").trim(),
    cognome: (formData.get("cognome") || "").trim(),
    sesso: (formData.get("sesso") || "").trim(),
    email: (formData.get("email") || "").trim(),
    telefono: normalizePhone((formData.get("telefono") || "").trim()),
    citta: (formData.get("citta") || "").trim(),
    username: (formData.get("username") || "").trim(),
    password: formData.get("password"),
  };
  const confirmPassword = formData.get("confirmPassword");

  const validationError = validateRegistration(payload, confirmPassword);
  if (validationError) {
    showGlobalAlert(validationError, "error");
    return;
  }

  const newUser = {
    ...payload,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  const users = getUsers();
  users.push(newUser);
  saveUsers(users);

  showGlobalAlert(
    "Registrazione completata con successo! Ora effettua il login per accedere al tuo account.",
    "success"
  );
  navigateTo("login");
}

function validateRegistration(payload, confirmPassword) {
  const users = getUsers();
  if (!payload.nome) return "Il nome è obbligatorio.";
  if (!payload.cognome) return "Il cognome è obbligatorio.";
  if (!payload.sesso) return "Seleziona il sesso.";
  if (!payload.email || !validateEmail(payload.email))
    return "Inserisci un'email valida.";
  if (!validatePhone(payload.telefono))
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

export function renderLoginForm() {
  state.currentView = "login";
  const rememberFlag = getRememberMe();
  const rememberedCredentials = getRememberedCredentials();
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
            value="${escapeHtml(identifierValue)}"
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
            value="${escapeHtml(passwordValue)}"
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
    .addEventListener("submit", handleLoginSubmit);
  document.getElementById("register-link").addEventListener("click", () => {
    navigateTo("register");
  });
}

function handleLoginSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const identifier = formData.get("identifier").trim();
  const password = formData.get("password");

  if (!identifier || !password) {
    showGlobalAlert("Inserisci username/email e password.", "error");
    return;
  }

  const user = findUserByUsernameOrEmail(identifier);
  if (!user) {
    showGlobalAlert("Utente non trovato.", "error");
    return;
  }
  if (user.password !== password) {
    showGlobalAlert("Password errata.", "error");
    return;
  }

  setCurrentUser(user.id);
  const remember = formData.get("remember") === "on";
  if (remember) {
    setRememberMe(true, { identifier, password });
  } else {
    setRememberMe(false);
  }
  showGlobalAlert(`Bentornato, ${user.nome}!`, "success");
  navigateTo("home");
}

export function renderProfilePage() {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    showGlobalAlert("Devi accedere per visualizzare il profilo.", "error");
    navigateTo("login");
    return;
  }

  state.currentView = "profile";
  appElement.innerHTML = `
    <section class="im-card max-w-3xl mx-auto mt-4">
      <p class="im-tagline">Profilo utente</p>
      <h2 class="im-title">Gestione profilo</h2>
      <form id="profile-form" class="mt-6 grid gap-4 md:grid-cols-2">
        ${profileField("Nome", "nome", currentUser.nome)}
        ${profileField("Cognome", "cognome", currentUser.cognome)}
        ${profileField("Sesso", "sesso", currentUser.sesso)}
        ${profileField("Email", "email", currentUser.email, "email")}
        ${profileField("Telefono", "telefono", currentUser.telefono)}
        ${profileField("Città", "citta", currentUser.citta)}
        ${profileField(
          "Username",
          "username",
          currentUser.username,
          "text",
          true
        )}
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

  setProfileEditable(false);
  document
    .getElementById("back-home-btn")
    .addEventListener("click", () => navigateTo("home"));
  document
    .getElementById("edit-profile-btn")
    .addEventListener("click", () => handleProfileEdit(currentUser));
  document
    .getElementById("save-profile-btn")
    .addEventListener("click", () => handleProfileSave(currentUser));
  document.querySelectorAll(".profile-links .im-link-button").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.legal === "terms") {
        navigateTo("terms");
      } else {
        navigateTo("privacy");
      }
    });
  });
}

function profileField(
  label,
  name,
  value,
  type = "text",
  readOnlyForced = false
) {
  const fieldId = `profile-${name}`;
  const readonlyAttr = readOnlyForced
    ? "readonly"
    : 'readonly data-editable="true"';
  const safeValue = escapeHtml(value ?? "");
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

function setProfileEditable(enabled) {
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

function handleProfileEdit(currentUser) {
  showModal({
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
        showGlobalAlert("Inserisci la password.", "error");
        return false;
      }
      if (passwordInput.value !== currentUser.password) {
        showGlobalAlert("Password errata.", "error");
        return false;
      }
      setProfileEditable(true);
      return true;
    },
  });
}

function handleProfileSave(currentUser) {
  const form = document.getElementById("profile-form");
  if (!form) return;
  const formData = new FormData(form);
  const updatedUser = {
    ...currentUser,
    nome: (formData.get("nome") || "").trim(),
    cognome: (formData.get("cognome") || "").trim(),
    sesso: (formData.get("sesso") || "").trim(),
    email: (formData.get("email") || "").trim(),
    telefono: normalizePhone((formData.get("telefono") || "").trim()),
    citta: (formData.get("citta") || "").trim(),
  };

  const error = validateProfileUpdate(updatedUser);
  if (error) {
    showGlobalAlert(error, "error");
    return;
  }

  const users = getUsers().map((user) =>
    user.id === currentUser.id ? updatedUser : user
  );
  saveUsers(users);
  setProfileEditable(false);
  showGlobalAlert("Profilo aggiornato con successo.", "success");
  renderProfilePage();
}

function validateProfileUpdate(user) {
  if (!user.nome) return "Il nome è obbligatorio.";
  if (!user.cognome) return "Il cognome è obbligatorio.";
  if (!user.email || !validateEmail(user.email))
    return "Inserisci un'email valida.";
  if (!validatePhone(user.telefono))
    return "Inserisci un numero di cellulare valido.";
  if (!user.citta) return "La città è obbligatoria.";
  return null;
}

export function renderTermsPage() {
  if (!getCurrentUser()) {
    navigateTo("login");
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
    .addEventListener("click", () => navigateTo("profile"));
  document
    .getElementById("go-privacy")
    .addEventListener("click", () => navigateTo("privacy"));
}

export function renderPrivacyPage() {
  if (!getCurrentUser()) {
    navigateTo("login");
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
    .addEventListener("click", () => navigateTo("profile"));
  document
    .getElementById("go-terms")
    .addEventListener("click", () => navigateTo("terms"));
}
