// Viste e interazioni legate alla landing/registrazione veloce in homepage.
import { appElement } from "./riferimentiDom.js";
import { state, creaStatoRegistrazioneStudente } from "./statoApplicazione.js";
import { showGlobalAlert } from "./alertModal.js";
import { navigateTo } from "./visteRouter.js";

if (!appElement) {
  throw new Error("Impossibile renderizzare: #app non esiste.");
}

export function renderHome() {
  state.currentView = "home";
  state.schoolLevel = null;
  state.profile = null;
  state.registrazioneStudente = creaStatoRegistrazioneStudente();
  state.registrazioneStudente.step = 1;
  state.registrazioneStudente.view = "wizard";
  appElement.innerHTML = `
    <section class="im-card registration-card">
      <div class="registration-title">
        <h1>Registrazione Studente</h1>
      </div>
      <div id="registration-card-content"></div>
    </section>
  `;

  initFlussoRegistrazioneStudente();
}

function initFlussoRegistrazioneStudente() {
  renderStep1();
}

function getRegistrationCardContent() {
  const container = document.getElementById("registration-card-content");
  if (!container) {
    console.error("Contenitore #registration-card-content non trovato.");
    return null;
  }
  return container;
}

function renderStep1() {
  const container = getRegistrationCardContent();
  if (!container) return;
  state.registrazioneStudente.step = 1;
  state.registrazioneStudente.view = "wizard";

  const classOptions = [
    { value: "prima", label: "Prima media" },
    { value: "seconda", label: "Seconda media" },
    { value: "terza", label: "Terza media" },
  ];

  const situationOptions = [
    {
      value: "bravo",
      label: "Sono già bravo e voglio consolidare / eccellere",
    },
    {
      value: "difficolta",
      label: "Sono in difficoltà e voglio evitare il debito / migliorare",
    },
  ];

  const isReady = isStep1Ready();

  container.innerHTML = `
    <div class="step step-1">
      <h2 class="step-title">Step 1 · Raccontaci chi sei</h2>
      <p class="step-description">
        Seleziona la classe e la situazione scolastica: il resto della registrazione apparirà automaticamente.
      </p>

      <div class="step-block">
        <h3 class="step-subtitle">Scegli la tua classe</h3>
        <div class="button-group">
          ${classOptions
            .map(
              ({ value, label }) => `
                <button
                  class="btn-pill btn-class ${
                    state.registrazioneStudente.classeSelezionata === value
                      ? "active"
                      : ""
                  }"
                  type="button"
                  data-class="${value}"
                  aria-pressed="${
                    state.registrazioneStudente.classeSelezionata === value
                  }"
                >
                  ${label}
                </button>
              `
            )
            .join("")}
        </div>
      </div>

      <div class="step-block">
        <h3 class="step-subtitle">Qual è la tua situazione?</h3>
        <div class="button-group stacked">
          ${situationOptions
            .map(
              ({ value, label }) => `
                <button
                  class="btn-pill btn-situation ${
                    state.registrazioneStudente.motivazioneSelezionata === value
                      ? "active"
                      : ""
                  }"
                  type="button"
                  data-situation="${value}"
                  aria-pressed="${
                    state.registrazioneStudente.motivazioneSelezionata === value
                  }"
                >
                  ${label}
                </button>
              `
            )
            .join("")}
        </div>
      </div>

      <div class="secondary-links">
        <button class="btn-secondary" type="button" data-role="docente">Sei docente? Clicca qui...</button>
        <button class="btn-secondary" type="button" data-role="genitore">Sei genitore? Clicca qui...</button>
      </div>
    </div>
    <div class="wizard-footer">
      <button class="btn-next-step" type="button" ${
        isReady ? "" : "disabled"
      }>Conferma e Prosegui</button>
    </div>
  `;

  setupStep1Interactions(container);
}

function renderStep2() {
  const container = getRegistrationCardContent();
  if (!container) return;
  state.registrazioneStudente.step = 2;
  state.registrazioneStudente.view = "wizard";

  const formValues = state.registrazioneStudente.formValues || {};
  const isMinor = state.registrazioneStudente.isMinor;
  if (isMinor === false && formValues.parentEmail) {
    formValues.parentEmail = "";
  }
  const parentHelperText =
    isMinor === null
      ? "Inseriscila se hai meno di 18 anni: useremo questo contatto per confermare l'iscrizione."
      : isMinor
      ? "Obbligatorio per studenti sotto i 18 anni."
      : "Hai almeno 18 anni: non serve l'email del genitore.";

  const parentDisabledAttr = isMinor === false ? "disabled" : "";
  const parentRequiredAttr = isMinor ? "required" : "";
  const parentValue = isMinor === false ? "" : formValues.parentEmail || "";

  container.innerHTML = `
    <div class="step step-2" data-step="registrazione">
      <h2 class="step-title">Step 2 · Dati per la registrazione</h2>
      <p class="step-description">
        Compila i campi qui sotto: useremo questi dati per creare il tuo profilo IronMath e per avvisare il tuo tutor legale.
      </p>
      <form id="form-registrazione-studente" class="registration-form" novalidate>
        <div class="form-field">
          <label for="username">Username<span class="required">*</span></label>
          <input class="im-input" type="text" id="username" name="username" autocomplete="nickname" value="${escapeHtml(
            formValues.username || ""
          )}" required />
        </div>

        <div class="form-field">
          <label for="dob">Data di nascita<span class="required">*</span></label>
          <input class="im-input" type="date" id="dob" name="dob" value="${escapeHtml(
            formValues.dob || ""
          )}" required />
        </div>

        <div class="form-field">
          <label for="school">Nome della scuola<span class="required">*</span></label>
          <input class="im-input" type="text" id="school" name="school" value="${escapeHtml(
            formValues.school || ""
          )}" required />
        </div>

        <div class="form-field">
          <label for="student-email">Email dello studente<span class="required">*</span></label>
          <input class="im-input" type="email" id="student-email" name="studentEmail" autocomplete="email" value="${escapeHtml(
            formValues.studentEmail || ""
          )}" required />
          <small class="helper-text" id="student-email-helper">
            Preferiamo un'email scolastica: presto diventerà il canale ufficiale con i docenti.
          </small>
        </div>

        <div class="form-field">
          <label for="parent-email">Email del genitore/tutore</label>
          <input class="im-input" type="email" id="parent-email" name="parentEmail" autocomplete="email" value="${escapeHtml(
            parentValue
          )}" ${parentDisabledAttr} ${parentRequiredAttr} />
          <small class="helper-text" id="parent-email-helper">
            ${parentHelperText}
          </small>
        </div>

        <div class="form-field">
          <label for="password">Password<span class="required">*</span></label>
          <input class="im-input" type="password" id="password" name="password" autocomplete="new-password" value="${escapeHtml(
            formValues.password || ""
          )}" required />
        </div>

        <div class="form-field">
          <label for="confirm-password">Conferma password<span class="required">*</span></label>
          <input class="im-input" type="password" id="confirm-password" name="confirmPassword" autocomplete="new-password" value="${escapeHtml(
            formValues.confirmPassword || ""
          )}" required />
          <p class="helper-text error-text hidden" id="password-match-error">
            Le password devono coincidere.
          </p>
        </div>

        <div class="legal-checks">
          <label class="checkbox-label">
            <input type="checkbox" id="terms-checkbox" name="terms" ${
              formValues.terms ? "checked" : ""
            } />
            <span>
              Ho letto e accetto
              <button type="button" class="link-legal" data-legal="terms">Termini & Condizioni</button>
            </span>
          </label>
          <label class="checkbox-label">
            <input type="checkbox" id="privacy-checkbox" name="privacy" ${
              formValues.privacy ? "checked" : ""
            } />
            <span>
              Ho letto e accetto
              <button type="button" class="link-legal" data-legal="privacy">l'Informativa sulla Privacy</button>
            </span>
          </label>
        </div>

        <div class="wizard-footer split">
          <button class="btn-prev-step" type="button">Indietro</button>
          <button type="submit" class="btn-register" disabled>Conferma e Registrati</button>
        </div>
      </form>
    </div>
  `;

  setupStep2Interactions(container);
}

function renderLegalView(type) {
  const container = getRegistrationCardContent();
  if (!container) return;
  state.registrazioneStudente.view = type;
  const legalContent = getLegalContent(type);
  container.innerHTML = `
    <div class="legal-view">
      <h2 class="step-title">${legalContent.title}</h2>
      ${legalContent.paragraphs
        .map((p) => `<p class="step-description">${p}</p>`)
        .join("")}
      <ul>
        ${legalContent.points.map((item) => `<li>${item}</li>`).join("")}
      </ul>
      <div class="wizard-footer center">
        <button class="btn-back-to-form" type="button">Capito, torna alla registrazione</button>
      </div>
    </div>
  `;
  setupLegalViewInteractions();
}

function renderStep3() {
  const container = getRegistrationCardContent();
  if (!container) return;
  state.registrazioneStudente.step = 3;
  state.registrazioneStudente.view = "wizard";
  container.innerHTML = `
    <div class="step step-3" data-step="post-registrazione">
      <h2 class="step-title">Step 3 · Registrazione completata</h2>
      <p>
        Controlla la casella di posta elettronica del genitore/tutore che hai indicato: dovrà confermare la tua iscrizione per sbloccare l'account completo.
      </p>
      <p>
        Nel frattempo puoi già esplorare IronMath con un account limitato. Ti ricorderemo di completare la procedura.
      </p>
      <div class="button-group stacked">
        <button class="btn-post-register" type="button" data-action="approve">
          Ho approvato / Il genitore approverà via email
        </button>
        <button class="btn-post-register ghost" type="button" data-action="limited">
          Continua con account limitato
        </button>
      </div>
    </div>
  `;
  setupPostRegistrationActions(container);
}

function setupStep1Interactions(container) {
  if (!container) return;
  const classButtons = container.querySelectorAll(".btn-class");
  const situationButtons = container.querySelectorAll(".btn-situation");
  const secondaryButtons = container.querySelectorAll(".btn-secondary");
  const nextBtn = container.querySelector(".btn-next-step");

  const updateNextButtonState = () => {
    if (!nextBtn) return;
    nextBtn.disabled = !isStep1Ready();
  };

  classButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      handleClassSelection(btn, classButtons);
      updateNextButtonState();
    });
  });

  situationButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      handleSituationSelection(btn, situationButtons);
      updateNextButtonState();
    });
  });

  secondaryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      showGlobalAlert(
        "Flussi dedicati a docenti e genitori in arrivo. Rimani sintonizzato!",
        "info"
      );
    });
  });

  nextBtn?.addEventListener("click", () => {
    state.registrazioneStudente.step = 2;
    renderStep2();
  });

  updateNextButtonState();
}

function setupStep2Interactions(container) {
  if (!container) return;
  const formEl = container.querySelector("#form-registrazione-studente");
  const backBtn = container.querySelector(".btn-prev-step");
  const legalLinks = container.querySelectorAll(".link-legal");

  if (!formEl) return;

  setupFormValidation(formEl);

  backBtn?.addEventListener("click", () => {
    persistFormValuesFromForm(formEl);
    state.registrazioneStudente.step = 1;
    renderStep1();
  });

  legalLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const target = link.getAttribute("data-legal");
      if (!target) return;
      persistFormValuesFromForm(formEl);
      state.registrazioneStudente.view = target;
      renderLegalView(target);
    });
  });
}

function setupLegalViewInteractions() {
  const container = getRegistrationCardContent();
  const backBtn = container?.querySelector(".btn-back-to-form");
  backBtn?.addEventListener("click", () => {
    state.registrazioneStudente.view = "wizard";
    renderStep2();
  });
}

function getLegalContent(type) {
  if (type === "privacy") {
    return {
      title: "Informativa sulla Privacy",
      paragraphs: [
        "Proteggiamo i dati degli studenti con crittografia e accessi limitati al team di tutoring.",
        "Ci servono i tuoi dati per offrirti analytics personalizzate e notifiche di studio mirate.",
      ],
      points: [
        "I dati non vengono venduti a terzi",
        "Puoi richiedere la cancellazione in ogni momento",
        "Conserveremo le attività solo finché avremo il tuo consenso",
      ],
    };
  }

  return {
    title: "Termini & Condizioni",
    paragraphs: [
      "Usiamo questo contratto per spiegarti come funziona IronMath e come gestiamo i tuoi progressi.",
      "Registrandoti accetti di utilizzare la piattaforma in modo onesto e di non condividere account.",
    ],
    points: [
      "Il supporto è pensato per studenti di scuola media",
      "Gli esercizi prototipo possono cambiare senza preavviso",
      "Possiamo sospendere l'accesso in caso di abuso",
    ],
  };
}

function persistFormValuesFromForm(formEl) {
  if (!formEl) return;
  const inputs = formEl.querySelectorAll("input[name]");
  inputs.forEach((input) => updateFormStateFromInput(input));
}

function updateFormStateFromInput(input) {
  if (!input || !input.name) return;
  const formValues = state.registrazioneStudente.formValues;
  if (!formValues) return;
  if (input.type === "checkbox") {
    formValues[input.name] = input.checked;
  } else {
    formValues[input.name] = input.value;
  }
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isStep1Ready() {
  return (
    Boolean(state.registrazioneStudente.classeSelezionata) &&
    Boolean(state.registrazioneStudente.motivazioneSelezionata)
  );
}

function handleClassSelection(button, group) {
  const value = button.getAttribute("data-class");
  state.registrazioneStudente.classeSelezionata = value;
  state.schoolLevel = "medie";
  updateButtonGroupState(group, button);
}

function handleSituationSelection(button, group) {
  const value = button.getAttribute("data-situation");
  state.registrazioneStudente.motivazioneSelezionata = value;
  state.profile = value === "bravo" ? "forte" : "difficolta";
  updateButtonGroupState(group, button);
}

function updateButtonGroupState(buttons, activeButton) {
  buttons.forEach((btn) => {
    btn.classList.toggle("active", btn === activeButton);
    btn.setAttribute("aria-pressed", btn === activeButton ? "true" : "false");
  });
}

function setupFormValidation(formEl) {
  if (!formEl) return;

  const dobInput = formEl.querySelector("#dob");
  const parentEmailHelper = formEl.querySelector("#parent-email-helper");
  const parentEmailInput = formEl.querySelector("#parent-email");

  if (dobInput) {
    dobInput.addEventListener("change", () => {
      const age = calcolaEta(dobInput.value);
      aggiornaStatoMinorenne(age, parentEmailInput, parentEmailHelper);
      updateFormStateFromInput(dobInput);
      validateRegistrationForm(formEl);
    });
  }

  formEl.addEventListener("input", (event) => {
    if (event.target.matches("input")) {
      updateFormStateFromInput(event.target);
      validateRegistrationForm(formEl);
    }

    if (event.target.id === "dob") {
      const age = calcolaEta(event.target.value);
      aggiornaStatoMinorenne(age, parentEmailInput, parentEmailHelper);
    }
  });

  formEl.addEventListener("submit", async (event) => {
    event.preventDefault();
    persistFormValuesFromForm(formEl);
    if (!validateRegistrationForm(formEl)) {
      showGlobalAlert(
        "Completa tutti i campi obbligatori e risolvi gli errori evidenziati.",
        "error"
      );
      return;
    }

    const submitBtn = formEl.querySelector(".btn-register");
    if (!submitBtn) return;
    const defaultLabel = submitBtn.textContent;
    submitBtn.textContent = "Registrazione...";
    submitBtn.disabled = true;

    try {
      const payload = raccogliDatiRegistrazione(formEl);
      await handleStudentRegistration(payload);
      mostraStepTre();
    } catch (error) {
      console.error("Errore registrazione studente", error);
      showGlobalAlert(
        "Qualcosa è andato storto. Riprova fra qualche minuto.",
        "error"
      );
    } finally {
      submitBtn.textContent = defaultLabel;
      validateRegistrationForm(formEl);
    }
  });

  validateRegistrationForm(formEl);
}

function calcolaEta(value) {
  if (!value) return null;
  const today = new Date();
  const birthday = new Date(value);
  if (Number.isNaN(birthday.getTime())) return null;
  let age = today.getFullYear() - birthday.getFullYear();
  const month = today.getMonth() - birthday.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthday.getDate())) {
    age--;
  }
  return age;
}

function aggiornaStatoMinorenne(age, parentInput, helperEl) {
  if (!parentInput || !helperEl) return;
  if (age === null) {
    state.registrazioneStudente.isMinor = null;
    parentInput.disabled = false;
    parentInput.required = false;
    helperEl.textContent =
      "Inseriscila se hai meno di 18 anni: useremo questo contatto per confermare l'iscrizione.";
    return;
  }

  state.registrazioneStudente.isMinor = age < 18;

  if (state.registrazioneStudente.isMinor) {
    parentInput.disabled = false;
    parentInput.required = true;
    helperEl.textContent = "Obbligatorio per studenti sotto i 18 anni.";
  } else {
    parentInput.value = "";
    parentInput.disabled = true;
    parentInput.required = false;
    helperEl.textContent =
      "Hai almeno 18 anni: non serve l'email del genitore.";
    updateFormStateFromInput(parentInput);
  }
}

function validateRegistrationForm(formEl) {
  if (!formEl) return false;
  const submitBtn = formEl.querySelector(".btn-register");
  if (!submitBtn) return false;

  const requiredIds = [
    "username",
    "dob",
    "school",
    "student-email",
    "password",
    "confirm-password",
  ];
  let isValid = true;

  requiredIds.forEach((id) => {
    const input = formEl.querySelector(`#${id}`);
    if (!input) return;
    if (!input.value.trim()) {
      isValid = false;
    }
    if (input.type === "email" && input.value && !input.checkValidity()) {
      isValid = false;
    }
  });

  if (state.registrazioneStudente.isMinor === true) {
    const parentEmail = formEl.querySelector("#parent-email");
    if (
      !parentEmail ||
      parentEmail.disabled ||
      !parentEmail.value.trim() ||
      !parentEmail.checkValidity()
    ) {
      isValid = false;
    }
  }

  const termsChecked = formEl.querySelector("#terms-checkbox")?.checked;
  const privacyChecked = formEl.querySelector("#privacy-checkbox")?.checked;
  if (!termsChecked || !privacyChecked) {
    isValid = false;
  }

  const passwordInput = formEl.querySelector("#password");
  const confirmInput = formEl.querySelector("#confirm-password");
  const passwordHelper = formEl.querySelector("#password-match-error");
  if (
    passwordInput &&
    confirmInput &&
    passwordInput.value &&
    confirmInput.value &&
    passwordInput.value !== confirmInput.value
  ) {
    passwordHelper?.classList.remove("hidden");
    isValid = false;
  } else {
    passwordHelper?.classList.add("hidden");
  }

  submitBtn.disabled = !isValid;
  return isValid;
}

function raccogliDatiRegistrazione(formEl) {
  const formData = new FormData(formEl);
  const payload = Object.fromEntries(formData.entries());
  return {
    ...payload,
    classe: state.registrazioneStudente.classeSelezionata,
    motivazione: state.registrazioneStudente.motivazioneSelezionata,
    isMinor: state.registrazioneStudente.isMinor,
    accettaTermini: formEl.querySelector("#terms-checkbox")?.checked || false,
    accettaPrivacy: formEl.querySelector("#privacy-checkbox")?.checked || false,
  };
}

function handleStudentRegistration(formData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.info("Registrazione studente simulata", formData);
      resolve({ status: "pending_guardian" });
    }, 1200);
  });
}

function mostraStepTre() {
  renderStep3();
  getRegistrationCardContent()?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function setupPostRegistrationActions(container) {
  if (!container) return;
  container.querySelectorAll(".btn-post-register").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.getAttribute("data-action");
      if (action === "approve") {
        showGlobalAlert(
          "TODO: attiveremo presto la conferma completa via email.",
          "info"
        );
      } else if (action === "limited") {
        showGlobalAlert(
          "Accesso limitato attivo. Ti portiamo nella dashboard prototipo.",
          "success"
        );
        navigateTo("unit");
      }
    });
  });
}
