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
  appElement.innerHTML = `
    <section class="im-card hero-card">
      <h1 class="im-title">Benvenuto in IronMath</h1>
      <p class="im-subtitle">
        Ragazzo, fattelo dire, bravo! Se sei qui vuol dire che hai finalmente deciso di riprendere
        le redini della tua media in matematica e/o fisica.
      </p>
    </section>

    <section class="im-card registration-card">
      <div class="step step-1">
        <h2 class="step-title">Step 1 · Raccontaci chi sei</h2>
        <p class="step-description">
          Seleziona la classe e la situazione scolastica: il resto della registrazione apparirà automaticamente.
        </p>

        <div class="step-block">
          <h3 class="step-subtitle">Scegli la tua classe</h3>
          <div class="button-group">
            <button class="btn-pill btn-class" type="button" data-class="prima">Prima media</button>
            <button class="btn-pill btn-class" type="button" data-class="seconda">Seconda media</button>
            <button class="btn-pill btn-class" type="button" data-class="terza">Terza media</button>
          </div>
        </div>

        <div class="step-block">
          <h3 class="step-subtitle">Qual è la tua situazione?</h3>
          <div class="button-group stacked">
            <button class="btn-pill btn-situation" type="button" data-situation="bravo">
              Sono già bravo e voglio consolidare / eccellere
            </button>
            <button class="btn-pill btn-situation" type="button" data-situation="difficolta">
              Sono in difficoltà e voglio evitare il debito / migliorare
            </button>
          </div>
        </div>

        <div class="secondary-links">
          <button class="btn-secondary" type="button" data-role="docente">Sei docente? Clicca qui...</button>
          <button class="btn-secondary" type="button" data-role="genitore">Sei genitore? Clicca qui...</button>
        </div>
      </div>

      <div class="step step-2 hidden" data-step="registrazione">
        <h2 class="step-title">Step 2 · Dati per la registrazione</h2>
        <p class="step-description">
          Compila i campi qui sotto: useremo questi dati per creare il tuo profilo IronMath e per avvisare il tuo tutor legale.
        </p>
        <form id="form-registrazione-studente" class="registration-form" novalidate>
          <div class="form-field">
            <label for="username">Username<span class="required">*</span></label>
            <input class="im-input" type="text" id="username" name="username" autocomplete="nickname" required />
          </div>

          <div class="form-field">
            <label for="dob">Data di nascita<span class="required">*</span></label>
            <input class="im-input" type="date" id="dob" name="dob" required />
          </div>

          <div class="form-field">
            <label for="school">Nome della scuola<span class="required">*</span></label>
            <input class="im-input" type="text" id="school" name="school" required />
          </div>

          <div class="form-field">
            <label for="student-email">Email dello studente<span class="required">*</span></label>
            <input class="im-input" type="email" id="student-email" name="studentEmail" autocomplete="email" required />
            <small class="helper-text" id="student-email-helper">
              Preferiamo un'email scolastica: presto diventerà il canale ufficiale con i docenti.
            </small>
          </div>

          <div class="form-field">
            <label for="parent-email">Email del genitore/tutore</label>
            <input class="im-input" type="email" id="parent-email" name="parentEmail" autocomplete="email" />
            <small class="helper-text" id="parent-email-helper">
              Inseriscila se hai meno di 18 anni: useremo questo contatto per confermare l'iscrizione.
            </small>
          </div>

          <div class="form-field">
            <label for="password">Password<span class="required">*</span></label>
            <input class="im-input" type="password" id="password" name="password" autocomplete="new-password" required />
          </div>

          <div class="form-field">
            <label for="confirm-password">Conferma password<span class="required">*</span></label>
            <input class="im-input" type="password" id="confirm-password" name="confirmPassword" autocomplete="new-password" required />
            <p class="helper-text error-text hidden" id="password-match-error">
              Le password devono coincidere.
            </p>
          </div>

          <div class="legal-checks">
            <label class="checkbox-label">
              <input type="checkbox" id="terms-checkbox" name="terms" />
              <span>Ho letto e accetto Termini & Condizioni</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" id="privacy-checkbox" name="privacy" />
              <span>Ho letto e accetto l'Informativa sulla Privacy</span>
            </label>
          </div>

          <button type="submit" class="btn-register" disabled>Registrati</button>
        </form>
      </div>

      <div class="step step-3 hidden" data-step="post-registrazione">
        <h2 class="step-title">Step 3 · Registrazione completata</h2>
        <p>
          Controlla la casella di posta elettronica del genitore/tutore che hai indicato: dovrà confermare la tua iscrizione
          per sbloccare l'account completo.
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
    </section>
  `;

  initFlussoRegistrazioneStudente();
}

function initFlussoRegistrazioneStudente() {
  const classButtons = appElement.querySelectorAll(".btn-class");
  const situationButtons = appElement.querySelectorAll(".btn-situation");
  const secondaryButtons = appElement.querySelectorAll(".btn-secondary");
  const stepTwoEl = appElement.querySelector("[data-step='registrazione']");
  const stepThreeEl = appElement.querySelector("[data-step='post-registrazione']");
  const formEl = document.getElementById("form-registrazione-studente");

  classButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      handleClassSelection(btn, classButtons, stepTwoEl);
    });
  });

  situationButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      handleSituationSelection(btn, situationButtons, stepTwoEl);
    });
  });

  secondaryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      showGlobalAlert("Flussi dedicati a docenti e genitori in arrivo. Rimani sintonizzato!", "info");
    });
  });

  setupFormValidation(formEl, stepTwoEl, stepThreeEl);
  setupPostRegistrationActions(stepThreeEl);
}

function handleClassSelection(button, group, stepTwoEl) {
  const value = button.getAttribute("data-class");
  state.registrazioneStudente.classeSelezionata = value;
  state.schoolLevel = "medie";
  updateButtonGroupState(group, button);
  maybeRevealStepTwo(stepTwoEl);
}

function handleSituationSelection(button, group, stepTwoEl) {
  const value = button.getAttribute("data-situation");
  state.registrazioneStudente.motivazioneSelezionata = value;
  state.profile = value === "bravo" ? "forte" : "difficolta";
  updateButtonGroupState(group, button);
  maybeRevealStepTwo(stepTwoEl);
}

function updateButtonGroupState(buttons, activeButton) {
  buttons.forEach((btn) => {
    btn.classList.toggle("active", btn === activeButton);
    btn.setAttribute("aria-pressed", btn === activeButton ? "true" : "false");
  });
}

function maybeRevealStepTwo(stepTwoEl) {
  if (!stepTwoEl) return;
  const ready =
    state.registrazioneStudente.classeSelezionata &&
    state.registrazioneStudente.motivazioneSelezionata;
  if (ready) {
    const alreadyVisible = state.registrazioneStudente.step >= 2;
    state.registrazioneStudente.step = 2;
    stepTwoEl.classList.remove("hidden");
    if (!alreadyVisible) {
      stepTwoEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}

function setupFormValidation(formEl, stepTwoEl, stepThreeEl) {
  if (!formEl) return;

  const dobInput = formEl.querySelector("#dob");
  const parentEmailHelper = formEl.querySelector("#parent-email-helper");
  const parentEmailInput = formEl.querySelector("#parent-email");

  if (dobInput) {
    dobInput.addEventListener("change", () => {
      const age = calcolaEta(dobInput.value);
      aggiornaStatoMinorenne(age, parentEmailInput, parentEmailHelper);
      validateRegistrationForm(formEl);
    });
  }

  formEl.addEventListener("input", (event) => {
    if (event.target.matches("input")) {
      validateRegistrationForm(formEl);
    }

    if (event.target.id === "dob") {
      const age = calcolaEta(event.target.value);
      aggiornaStatoMinorenne(age, parentEmailInput, parentEmailHelper);
    }
  });

  formEl.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!validateRegistrationForm(formEl)) {
      showGlobalAlert("Completa tutti i campi obbligatori e risolvi gli errori evidenziati.", "error");
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
      mostraStepTre(stepTwoEl, stepThreeEl);
    } catch (error) {
      console.error("Errore registrazione studente", error);
      showGlobalAlert("Qualcosa è andato storto. Riprova fra qualche minuto.", "error");
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
    helperEl.textContent = "Hai almeno 18 anni: non serve l'email del genitore.";
  }
}

function validateRegistrationForm(formEl) {
  if (!formEl) return false;
  const submitBtn = formEl.querySelector(".btn-register");
  if (!submitBtn) return false;

  const requiredIds = ["username", "dob", "school", "student-email", "password", "confirm-password"];
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

function mostraStepTre(stepTwoEl, stepThreeEl) {
  stepTwoEl?.classList.add("hidden");
  stepThreeEl?.classList.remove("hidden");
  state.registrazioneStudente.step = 3;
  stepThreeEl?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function setupPostRegistrationActions(stepThreeEl) {
  if (!stepThreeEl) return;
  stepThreeEl.querySelectorAll(".btn-post-register").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.getAttribute("data-action");
      if (action === "approve") {
        showGlobalAlert("TODO: attiveremo presto la conferma completa via email.", "info");
      } else if (action === "limited") {
        showGlobalAlert("Accesso limitato attivo. Ti portiamo nella dashboard prototipo.", "success");
        navigateTo("unit");
      }
    });
  });
}
