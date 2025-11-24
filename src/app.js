// app.js

const appEl = document.getElementById("app");
const authBtn = document.getElementById("auth-btn");
const authBtnLabel = document.getElementById("auth-btn-label");
const authDropdown = document.getElementById("auth-dropdown");

const state = {
  schoolLevel: null, // 'medie' | 'liceo'
  profile: null, // 'forte' | 'difficolta'
  currentView: "home", // 'home' | 'unit' | 'exercise' | 'register' | 'login' | 'profile'
  currentStep: 0,
};

const STORAGE_KEYS = {
  USERS: "ironmathUsers",
  CURRENT_USER: "ironmathCurrentUserId",
  REMEMBER_ME: "ironmathRememberMe",
  REMEMBERED_LOGIN: "ironmathRememberedLogin",
};

let activeModal = null;

function render() {
  if (state.currentView === "home") {
    renderHome();
  } else if (state.currentView === "unit") {
    renderUnitPrototype();
  } else if (state.currentView === "exercise") {
    renderExercisePrototype();
  }
}

function renderHome() {
  state.currentView = "home";
  appEl.innerHTML = `
    <section class="im-card">
      <h1 class="im-title">Benvenuto in IronMath</h1>
      <p class="im-subtitle">
        Ragazzo, fattelo dire, bravo! Se sei qui vuol dire che hai finalmente deciso di riprendere
        le redini della tua media in matematica e/o fisica.
      </p>

      <div class="im-row im-row-stacked mt-2">
        <div class="im-col-2">
          <div class="im-label">Sei alle medie o al liceo?</div>
          <div class="choice-group" id="school-group">
            ${choiceTile(
              "school",
              "medie",
              "Scuole medie",
              "11–14 anni, basi solide per scegliere il liceo."
            )}
            ${choiceTile(
              "school",
              "liceo",
              "Liceo",
              "14–18 anni, sopravvivere a mate e arrivare all’università."
            )}
          </div>
        </div>

        <div class="im-col-2">
          <div class="im-label">Come ti senti in matematica?</div>
          <div class="choice-group" id="profile-group">
            ${choiceTile(
              "profile",
              "forte",
              "Curioso/forte",
              "Vai bene ma vuoi ordine, metodo e risparmiare tempo."
            )}
            ${choiceTile(
              "profile",
              "difficolta",
              "In difficoltà",
              "Vuoi arrivare almeno al 6 senza morire di ansia."
            )}
          </div>
        </div>
      </div>

      <div class="mt-5 flex justify-end gap-3">
        <button class="im-button secondary" id="fake-student">
          Guarda una demo
        </button>
        <button class="im-button" id="start-btn">
          Inizia il percorso
        </button>
      </div>
    </section>
  `;

  document
    .getElementById("school-group")
    .addEventListener("click", onSchoolClick);
  document
    .getElementById("profile-group")
    .addEventListener("click", onProfileClick);
  document
    .getElementById("start-btn")
    .addEventListener("click", onStartClicked);
  document.getElementById("fake-student").addEventListener("click", () => {
    state.schoolLevel = "liceo";
    state.profile = "difficolta";
    state.currentView = "unit";
    render();
  });

  syncChoiceUI();
}

// =============================
//  AUTH & PROFILE HELPERS
// =============================

function getUsers() {
  const raw = localStorage.getItem(STORAGE_KEYS.USERS);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Errore parse utenti", err);
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

function findUserByUsernameOrEmail(identifier) {
  if (!identifier) return null;
  const cleanIdentifier = identifier.trim().toLowerCase();
  return (
    getUsers().find(
      (user) =>
        user.username.toLowerCase() === cleanIdentifier ||
        user.email.toLowerCase() === cleanIdentifier
    ) || null
  );
}

function setCurrentUser(userId) {
  if (userId) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, String(userId));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
}

function getCurrentUser() {
  const userId = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  if (!userId) return null;
  const user = getUsers().find((u) => String(u.id) === String(userId));
  if (!user) {
    setCurrentUser(null);
  }
  return user || null;
}

function logoutCurrentUser() {
  setCurrentUser(null);
}

function setRememberMe(flag, credentials) {
  sessionStorage.setItem(STORAGE_KEYS.REMEMBER_ME, flag ? "true" : "false");
  if (flag && credentials) {
    sessionStorage.setItem(
      STORAGE_KEYS.REMEMBERED_LOGIN,
      JSON.stringify(credentials)
    );
  } else {
    sessionStorage.removeItem(STORAGE_KEYS.REMEMBERED_LOGIN);
  }
}

function getRememberMe() {
  return sessionStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === "true";
}

function getRememberedCredentials() {
  const raw = sessionStorage.getItem(STORAGE_KEYS.REMEMBERED_LOGIN);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error("Errore parse remember me", err);
    return null;
  }
}

function updateAuthButtonUI() {
  const currentUser = getCurrentUser();
  if (authBtnLabel) {
    authBtnLabel.textContent = currentUser
      ? `Buono studio, ${currentUser.nome}`
      : "Registrati/Accedi";
  }
}

function initAuthNav() {
  if (!authBtn || !authDropdown) return;

  authBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    const currentUser = getCurrentUser();
    if (!currentUser) {
      closeAuthDropdown();
      if (getUsers().length === 0) {
        renderRegisterForm();
      } else {
        renderLoginForm();
      }
      return;
    }
    toggleAuthDropdown();
  });

  authDropdown.addEventListener("click", (event) => {
    const actionBtn = event.target.closest("button[data-action]");
    if (!actionBtn) return;
    const { action } = actionBtn.dataset;
    closeAuthDropdown();
    if (action === "profile") {
      renderProfilePage();
    } else if (action === "logout") {
      showLogoutModal();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      authDropdown.classList.contains("open") &&
      !authDropdown.contains(event.target) &&
      !authBtn.contains(event.target)
    ) {
      closeAuthDropdown();
    }
  });

  updateAuthButtonUI();
}

function toggleAuthDropdown() {
  if (!authDropdown || !authBtn) return;
  const isOpen = authDropdown.classList.toggle("open");
  authDropdown.setAttribute("aria-hidden", String(!isOpen));
  authBtn.setAttribute("aria-expanded", String(isOpen));
}

function closeAuthDropdown() {
  if (!authDropdown || !authBtn) return;
  authDropdown.classList.remove("open");
  authDropdown.setAttribute("aria-hidden", "true");
  authBtn.setAttribute("aria-expanded", "false");
}

// =============================
//  AUTH RENDERERS
// =============================

function renderRegisterForm() {
  state.currentView = "register";
  appEl.innerHTML = `
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
    renderLoginForm();
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
  renderLoginForm();
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

function renderLoginForm() {
  state.currentView = "login";
  const rememberFlag = getRememberMe();
  const rememberedCredentials = getRememberedCredentials();
  const identifierValue =
    rememberFlag && rememberedCredentials
      ? rememberedCredentials.identifier
      : "";
  const passwordValue =
    rememberFlag && rememberedCredentials ? rememberedCredentials.password : "";

  appEl.innerHTML = `
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
    renderRegisterForm();
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
  updateAuthButtonUI();
  closeAuthDropdown();
  showGlobalAlert(`Bentornato, ${user.nome}!`, "success");
  renderHome();
}

function renderProfilePage() {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    showGlobalAlert("Devi accedere per visualizzare il profilo.", "error");
    renderLoginForm();
    return;
  }

  state.currentView = "profile";
  appEl.innerHTML = `
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
    .addEventListener("click", () => renderHome());
  document
    .getElementById("edit-profile-btn")
    .addEventListener("click", () => handleProfileEdit(currentUser));
  document
    .getElementById("save-profile-btn")
    .addEventListener("click", () => handleProfileSave(currentUser));
  document.querySelectorAll(".profile-links .im-link-button").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.legal === "terms") {
        renderTermsPage();
      } else {
        renderPrivacyPage();
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
  updateAuthButtonUI();
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

function showLogoutModal() {
  const remember = getRememberMe();
  showModal({
    title: "Logout",
    message: remember
      ? "Sei sicuro di voler effettuare il logout? Hai selezionato 'ricordami' durante il login: i tuoi dati di accesso sono salvati in questa sessione."
      : "Sei sicuro di voler effettuare il logout?",
    confirmText: "Conferma logout",
    cancelText: "Annulla",
    onConfirm: () => {
      logoutCurrentUser();
      setRememberMe(false);
      updateAuthButtonUI();
      renderHome();
      showGlobalAlert("Logout completato.", "success");
      return true;
    },
  });
}

function renderTermsPage() {
  if (!getCurrentUser()) {
    renderLoginForm();
    return;
  }
  state.currentView = "terms";
  appEl.innerHTML = `
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
    .addEventListener("click", () => renderProfilePage());
  document
    .getElementById("go-privacy")
    .addEventListener("click", () => renderPrivacyPage());
}

function renderPrivacyPage() {
  if (!getCurrentUser()) {
    renderLoginForm();
    return;
  }
  state.currentView = "privacy";
  appEl.innerHTML = `
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
    .addEventListener("click", () => renderProfilePage());
  document
    .getElementById("go-terms")
    .addEventListener("click", () => renderTermsPage());
}

// =============================
//  GLOBAL ALERTS & MODALS
// =============================

function showGlobalAlert(message, type = "info") {
  let container = document.getElementById("global-alert-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "global-alert-container";
    container.className = "global-alert-container";
    document.body.prepend(container);
  }
  container.innerHTML = `
    <div class="global-alert global-alert-${type}">
      <span>${message}</span>
      <button type="button" aria-label="Chiudi avviso">&times;</button>
    </div>
  `;
  const closeBtn = container.querySelector("button");
  closeBtn.addEventListener("click", () => {
    container.remove();
  });
}

function showModal({
  title,
  message = "",
  contentHTML = "",
  confirmText = "Conferma",
  cancelText = "Annulla",
  onConfirm,
  onCancel,
}) {
  closeModal();
  const overlay = document.createElement("div");
  overlay.className = "im-modal-overlay";
  overlay.innerHTML = `
    <div class="im-modal-card">
      <h3 class="im-modal-title">${title}</h3>
      ${message ? `<p class="im-modal-message">${message}</p>` : ""}
      ${contentHTML}
      <div class="im-modal-actions">
        <button type="button" class="im-button secondary modal-cancel">${cancelText}</button>
        <button type="button" class="im-button modal-confirm">${confirmText}</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  document.body.classList.add("blurred");
  activeModal = overlay;

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      if (onCancel) onCancel();
      closeModal();
    }
  });
  overlay.querySelector(".modal-cancel").addEventListener("click", () => {
    if (onCancel) onCancel();
    closeModal();
  });
  overlay.querySelector(".modal-confirm").addEventListener("click", () => {
    const shouldClose = onConfirm ? onConfirm() : true;
    if (shouldClose !== false) {
      closeModal();
    }
  });
}

function closeModal() {
  if (activeModal) {
    activeModal.remove();
    activeModal = null;
  }
  document.body.classList.remove("blurred");
}

// =============================
//  VALIDATION HELPERS
// =============================

function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function normalizePhone(phone) {
  if (!phone) return "+39";
  const digits = phone.replace(/[^0-9]/g, "");
  const withoutPrefix = digits.startsWith("39") ? digits.slice(2) : digits;
  return `+39${withoutPrefix}`;
}

function validatePhone(phone) {
  if (!phone.startsWith("+39")) return false;
  const digits = phone.replace("+39", "");
  return /^\d{6,12}$/.test(digits);
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// =============================
//  EXISTING RENDER FLOW
// =============================

function renderUnitPrototype() {
  const labelLevel = state.schoolLevel === "medie" ? "Scuole medie" : "Liceo";
  const labelProfile =
    state.profile === "forte"
      ? "Profilo: curioso/forte"
      : "Profilo: in difficoltà";

  appEl.innerHTML = `
    <section class="im-card">
      <p class="im-tagline">${labelLevel}</p>
      <h2 class="im-title">Unità prototipo: Equazioni di primo grado</h2>
      <p class="im-subtitle">
        Prima di farti studiare, IronMath controlla se hai davvero le basi.
        Se non superi il test preliminare, ti blocchiamo sull’argomento successivo:
        non è cattiveria, è protezione.
      </p>

      <div class="im-chip-group">
        <span class="im-chip">${labelProfile}</span>
        <span class="im-chip">Prerequisiti ferrei</span>
        <span class="im-chip">Diagnostica</span>
      </div>

      <div class="step-container" style="margin-top:14px;">
        <div class="step-title">Prerequisiti per questa unità</div>
        <div class="step-body">
          <ul style="padding-left: 18px; margin: 6px 0;">
            <li>Aritmetica di base (operazioni con interi e frazioni)</li>
            <li>Uso delle parentesi e priorità delle operazioni</li>
            <li>Concetto di uguaglianza e bilanciamento di una “bilancia”</li>
          </ul>
          <p style="margin-top:6px;">
            Se uno di questi punti ti fa già sudare, è un segnale: meglio
            sistemarlo ora, non tra due anni quando dovrai affrontare parabole e integrali.
          </p>
        </div>
        <div class="step-footer">
          <button class="im-button secondary" id="back-home">Indietro</button>
          <button class="im-button" id="start-test" style="margin-left:8px;">
            Avvia test preliminare
          </button>
        </div>
      </div>
    </section>
  `;

  document.getElementById("back-home").addEventListener("click", () => {
    state.currentView = "home";
    render();
  });

  document.getElementById("start-test").addEventListener("click", () => {
    state.currentStep = 0;
    state.currentView = "exercise";
    render();
  });
}

const steps = [
  {
    title: "Step 1 – Capire il testo",
    body: `Un ragazzo dice: "Sto pensando a un numero. Se lo raddoppio e aggiungo 3, ottengo 11".
Come trasformi questa frase in una equazione?
Suggerimento: chiama il numero sconosciuto "x" e scrivi cosa succede ad x.`,
  },
  {
    title: "Step 2 – Scrivere l’equazione",
    body: `Hai identificato che:
- prendi x
- lo raddoppi
- aggiungi 3
- tutto questo risultato deve essere uguale a 11

L’equazione deve avere la forma: 2x + 3 = 11.
Se non ti viene naturale, è qui che IronMath lavorerà con te.`,
  },
  {
    title: "Step 3 – Risolvere usando il bilanciamento",
    body: `Per trovare x:
- togli 3 da entrambi i membri → 2x = 8
- dividi entrambi i membri per 2 → x = 4

Quello che conta non è il numero 4 in sé, ma il metodo di "bilanciare" sempre
tutti i passaggi. Questo è il cuore delle equazioni.`,
  },
  {
    title: "Step 4 – La filosofia IronMath",
    body: `Se qui hai avuto difficoltà, IronMath non ti porterà subito a sistemi, 
parabole e robe universitarie buttate a caso. Ti fermerà, ti farà rinforzare
questi passaggi finché non ti vengono naturali.

Questo è il motivo per cui, se non passi il test preliminare, ti blocchiamo:
così quando arriverai al quinto superiore, potrai guardare un integrale e dire
"ok, non mi fa paura".`,
  },
];

function renderExercisePrototype() {
  const step = steps[state.currentStep];

  appEl.innerHTML = `
    <section class="im-card">
      <p class="im-tagline">Esercizio guidato – Demo</p>
      <h2 class="im-title">Equazione da frase a formula</h2>
      <p class="im-subtitle">
        Questo non è ancora un vero test IronMath. È solo un assaggio del modo
        in cui ti guideremo: uno step alla volta, senza saltare i passaggi.
      </p>

      <div class="step-container">
        <div class="step-title">${step.title}</div>
        <div class="step-body" style="white-space: pre-line;">
${step.body}
        </div>
        <div class="step-footer">
          <button class="im-button secondary" id="btn-back-unit">Indietro</button>
          <button class="im-button" id="btn-next-step">
            ${state.currentStep < steps.length - 1 ? "Avanti" : "Fine demo"}
          </button>
        </div>
      </div>
    </section>
  `;

  document.getElementById("btn-back-unit").addEventListener("click", () => {
    state.currentView = "unit";
    render();
  });

  document.getElementById("btn-next-step").addEventListener("click", () => {
    if (state.currentStep < steps.length - 1) {
      state.currentStep++;
      render();
    } else {
      state.currentView = "unit";
      state.currentStep = 0;
      render();
    }
  });
}

function choiceTile(group, value, title, desc) {
  const isSelected =
    (group === "school" && state.schoolLevel === value) ||
    (group === "profile" && state.profile === value);

  const classes = ["choice-tile", isSelected ? "selected" : ""].join(" ");

  return `
    <div class="${classes}" data-group="${group}" data-value="${value}">
      <div class="choice-title">${title}</div>
      <div class="choice-desc">${desc}</div>
    </div>
  `;
}

function syncChoiceUI() {
  document.querySelectorAll(".choice-tile").forEach((tile) => {
    const group = tile.getAttribute("data-group");
    const value = tile.getAttribute("data-value");
    let selected = false;
    if (group === "school") selected = state.schoolLevel === value;
    if (group === "profile") selected = state.profile === value;
    tile.classList.toggle("selected", selected);
  });
}

function onSchoolClick(e) {
  const tile = e.target.closest(".choice-tile");
  if (!tile) return;
  state.schoolLevel = tile.getAttribute("data-value");
  syncChoiceUI();
}

function onProfileClick(e) {
  const tile = e.target.closest(".choice-tile");
  if (!tile) return;
  state.profile = tile.getAttribute("data-value");
  syncChoiceUI();
}

function onStartClicked() {
  if (!state.schoolLevel || !state.profile) {
    showGlobalAlert(
      "Seleziona sia il tipo di scuola che come ti senti in matematica.",
      "error"
    );
    return;
  }
  state.currentView = "unit";
  render();
}

// Inizializzazione
render();
initAuthNav();
