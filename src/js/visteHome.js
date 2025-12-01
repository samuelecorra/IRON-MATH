// Viste e interazioni legate alla landing/registrazione veloce in homepage.
import { elementoApp } from "./riferimentiDom.js";
import { stato, creaStatoRegistrazioneStudente } from "./statoApplicazione.js";
import { mostraAvvisoGlobale } from "./alertModal.js";
import { navigaVersoVista } from "./visteRouter.js";

if (!elementoApp) {
  throw new Error("Impossibile renderizzare: #app non esiste.");
}

export function renderizzaHome() {
  stato.vistaCorrente = "home";
  stato.livelloScolastico = null;
  stato.profilo = null;
  stato.registrazioneStudente = creaStatoRegistrazioneStudente();
  stato.registrazioneStudente.passo = 1;
  stato.registrazioneStudente.vista = "wizard";
  elementoApp.innerHTML = `
    <section class="im-card registration-card">
      <div class="registration-title">
        <h1>Registrazione Studente</h1>
      </div>
      <div id="registration-card-content"></div>
    </section>
  `;

  avviaFlussoRegistrazioneStudente();
}

function avviaFlussoRegistrazioneStudente() {
  renderizzaPasso1();
}

function ottieniContenutoSchedaRegistrazione() {
  const contenitore = document.getElementById("registration-card-content");
  if (!contenitore) {
    console.error("Contenitore #registration-card-content non trovato.");
    return null;
  }
  return contenitore;
}

function renderizzaPasso1() {
  const contenitore = ottieniContenutoSchedaRegistrazione();
  if (!contenitore) return;
  stato.registrazioneStudente.passo = 1;
  stato.registrazioneStudente.vista = "wizard";

  const opzioniClasse = [
    { value: "prima", label: "Prima media" },
    { value: "seconda", label: "Seconda media" },
    { value: "terza", label: "Terza media" },
  ];

  const opzioniSituazione = [
    {
      value: "bravo",
      label: "Sono già bravo e voglio consolidare / eccellere",
    },
    {
      value: "difficolta",
      label: "Sono in difficoltà e voglio evitare il debito / migliorare",
    },
  ];

  const passoPronto = passoUnoPronto();

  contenitore.innerHTML = `
    <div class="step step-1">
      <h2 class="step-title">Step 1 – Raccontaci chi sei</h2>
      <p class="step-description">
        Seleziona la classe e la situazione scolastica: il resto della registrazione apparirà automaticamente.
      </p>

      <div class="step-block">
        <h3 class="step-subtitle">Scegli la tua classe</h3>
        <div class="button-group">
          ${opzioniClasse
            .map(
              ({ value, label }) => `
                <button
                  class="btn-pill btn-class ${
                    stato.registrazioneStudente.classeSelezionata === value
                      ? "active"
                      : ""
                  }"
                  type="button"
                  data-class="${value}"
                  aria-pressed="${
                    stato.registrazioneStudente.classeSelezionata === value
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
          ${opzioniSituazione
            .map(
              ({ value, label }) => `
                <button
                  class="btn-pill btn-situation ${
                    stato.registrazioneStudente.motivazioneSelezionata === value
                      ? "active"
                      : ""
                  }"
                  type="button"
                  data-situation="${value}"
                  aria-pressed="${
                    stato.registrazioneStudente.motivazioneSelezionata === value
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
        passoPronto ? "" : "disabled"
      }>Conferma e Prosegui</button>
    </div>
  `;

  configuraInterazioniPasso1(contenitore);
}

function renderizzaPasso2() {
  const contenitore = ottieniContenutoSchedaRegistrazione();
  if (!contenitore) return;
  stato.registrazioneStudente.passo = 2;
  stato.registrazioneStudente.vista = "wizard";

  const valoriForm = stato.registrazioneStudente.valoriForm || {};
  const eMinorenne = stato.registrazioneStudente.eMinorenne;
  if (eMinorenne === false && valoriForm.emailGenitore) {
    valoriForm.emailGenitore = "";
  }
  const testoHelperGenitore =
    eMinorenne === null
      ? "Inseriscila se hai meno di 18 anni: useremo questo contatto per confermare l'iscrizione."
      : eMinorenne
      ? "Obbligatorio per studenti sotto i 18 anni."
      : "Hai almeno 18 anni: non serve l'email del genitore.";

  const attributoDisabilitatoGenitore = eMinorenne === false ? "disabled" : "";
  const attributoObbligatorioGenitore = eMinorenne ? "required" : "";
  const valoreGenitore = eMinorenne === false ? "" : valoriForm.emailGenitore || "";

  contenitore.innerHTML = `
    <div class="step step-2" data-step="registrazione">
      <h2 class="step-title">Step 2 – Dati per la registrazione</h2>
      <p class="step-description">
        Compila i campi qui sotto: useremo questi dati per creare il tuo profilo IronMath e per avvisare il tuo tutor legale.
      </p>
      <form id="form-registrazione-studente" class="registration-form" novalidate>
        <div class="form-field">
          <label for="nome-utente">Username<span class="required">*</span></label>
          <input class="im-input" type="text" id="nome-utente" name="nomeUtente" autocomplete="nickname" value="${sanificaHtmlLocale(
            valoriForm.nomeUtente || ""
          )}" required />
        </div>

        <div class="form-field">
          <label for="data-nascita">Data di nascita<span class="required">*</span></label>
          <input class="im-input" type="date" id="data-nascita" name="dataNascita" value="${sanificaHtmlLocale(
            valoriForm.dataNascita || ""
          )}" required />
        </div>

        <div class="form-field">
          <label for="scuola">Nome della scuola<span class="required">*</span></label>
          <input class="im-input" type="text" id="scuola" name="scuola" value="${sanificaHtmlLocale(
            valoriForm.scuola || ""
          )}" required />
        </div>

        <div class="form-field">
          <label for="email-studente">Email dello studente<span class="required">*</span></label>
          <input class="im-input" type="email" id="email-studente" name="emailStudente" autocomplete="email" value="${sanificaHtmlLocale(
            valoriForm.emailStudente || ""
          )}" required />
          <small class="helper-text" id="email-studente-helper">
            Preferiamo un'email scolastica: presto diventerà il canale ufficiale con i docenti.
          </small>
        </div>

        <div class="form-field">
          <label for="email-genitore">Email del genitore/tutore</label>
          <input class="im-input" type="email" id="email-genitore" name="emailGenitore" autocomplete="email" value="${sanificaHtmlLocale(
            valoreGenitore
          )}" ${attributoDisabilitatoGenitore} ${attributoObbligatorioGenitore} />
          <small class="helper-text" id="email-genitore-helper">
            ${testoHelperGenitore}
          </small>
        </div>

        <div class="form-field">
          <label for="password">Password<span class="required">*</span></label>
          <input class="im-input" type="password" id="password" name="password" autocomplete="new-password" value="${sanificaHtmlLocale(
            valoriForm.password || ""
          )}" required />
        </div>

        <div class="form-field">
          <label for="conferma-password">Conferma password<span class="required">*</span></label>
          <input class="im-input" type="password" id="conferma-password" name="confermaPassword" autocomplete="new-password" value="${sanificaHtmlLocale(
            valoriForm.confermaPassword || ""
          )}" required />
          <p class="helper-text error-text hidden" id="errore-conferma-password">
            Le password devono coincidere.
          </p>
        </div>

        <div class="legal-checks">
          <label class="checkbox-label">
            <input type="checkbox" id="termini-checkbox" name="termini" ${
              valoriForm.termini ? "checked" : ""
            } />
            <span>
              Ho letto e accetto
              <button type="button" class="link-legal" data-legal="terms">Termini & Condizioni</button>
            </span>
          </label>
          <label class="checkbox-label">
            <input type="checkbox" id="privacy-checkbox" name="privacy" ${
              valoriForm.privacy ? "checked" : ""
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

  configuraInterazioniPasso2(contenitore);
}

function renderizzaVistaLegale(tipo) {
  const contenitore = ottieniContenutoSchedaRegistrazione();
  if (!contenitore) return;
  stato.registrazioneStudente.vista = tipo;
  const contenutiLegali = ottieniContenutoLegale(tipo);
  contenitore.innerHTML = `
    <div class="legal-view">
      <h2 class="step-title">${contenutiLegali.title}</h2>
      ${contenutiLegali.paragraphs
        .map((paragrafo) => `<p class="step-description">${paragrafo}</p>`)
        .join("")}
      <ul>
        ${contenutiLegali.points.map((elemento) => `<li>${elemento}</li>`).join("")}
      </ul>
      <div class="wizard-footer center">
        <button class="btn-back-to-form" type="button">Capito, torna alla registrazione</button>
      </div>
    </div>
  `;
  configuraInterazioniVistaLegale();
}

function renderizzaPasso3() {
  const contenitore = ottieniContenutoSchedaRegistrazione();
  if (!contenitore) return;
  stato.registrazioneStudente.passo = 3;
  stato.registrazioneStudente.vista = "wizard";
  contenitore.innerHTML = `
    <div class="step step-3" data-step="post-registrazione">
      <h2 class="step-title">Step 3 – Registrazione completata</h2>
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
  configuraAzioniPostRegistrazione(contenitore);
}

function configuraInterazioniPasso1(contenitore) {
  if (!contenitore) return;
  const pulsantiClasse = contenitore.querySelectorAll(".btn-class");
  const pulsantiSituazione = contenitore.querySelectorAll(".btn-situation");
  const pulsantiSecondari = contenitore.querySelectorAll(".btn-secondary");
  const pulsanteProssimo = contenitore.querySelector(".btn-next-step");

  const aggiornaStatoPulsanteProssimo = () => {
    if (!pulsanteProssimo) return;
    pulsanteProssimo.disabled = !passoUnoPronto();
  };

  pulsantiClasse.forEach((pulsante) => {
    pulsante.addEventListener("click", () => {
      gestisciSelezioneClasse(pulsante, pulsantiClasse);
      aggiornaStatoPulsanteProssimo();
    });
  });

  pulsantiSituazione.forEach((pulsante) => {
    pulsante.addEventListener("click", () => {
      gestisciSelezioneSituazione(pulsante, pulsantiSituazione);
      aggiornaStatoPulsanteProssimo();
    });
  });

  pulsantiSecondari.forEach((pulsante) => {
    pulsante.addEventListener("click", () => {
      mostraAvvisoGlobale(
        "Flussi dedicati a docenti e genitori in arrivo. Rimani sintonizzato!",
        "info"
      );
    });
  });

  pulsanteProssimo?.addEventListener("click", () => {
    stato.registrazioneStudente.passo = 2;
    renderizzaPasso2();
  });

  aggiornaStatoPulsanteProssimo();
}

function configuraInterazioniPasso2(contenitore) {
  if (!contenitore) return;
  const modulo = contenitore.querySelector("#form-registrazione-studente");
  const pulsanteIndietro = contenitore.querySelector(".btn-prev-step");
  const collegamentiLegali = contenitore.querySelectorAll(".link-legal");

  if (!modulo) return;

  configuraValidazioneModulo(modulo);

  pulsanteIndietro?.addEventListener("click", () => {
    salvaValoriModulo(modulo);
    stato.registrazioneStudente.passo = 1;
    renderizzaPasso1();
  });

  collegamentiLegali.forEach((link) => {
    link.addEventListener("click", () => {
      const destinazione = link.getAttribute("data-legal");
      if (!destinazione) return;
      salvaValoriModulo(modulo);
      stato.registrazioneStudente.vista = destinazione;
      renderizzaVistaLegale(destinazione);
    });
  });
}

function configuraInterazioniVistaLegale() {
  const contenitore = ottieniContenutoSchedaRegistrazione();
  const pulsanteRitorno = contenitore?.querySelector(".btn-back-to-form");
  pulsanteRitorno?.addEventListener("click", () => {
    stato.registrazioneStudente.vista = "wizard";
    renderizzaPasso2();
  });
}

function ottieniContenutoLegale(tipo) {
  if (tipo === "privacy") {
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

function salvaValoriModulo(modulo) {
  if (!modulo) return;
  const inputConNome = modulo.querySelectorAll("input[name]");
  inputConNome.forEach((input) => aggiornaStatoModuloDaInput(input));
}

function aggiornaStatoModuloDaInput(input) {
  if (!input || !input.name) return;
  const valoriForm = stato.registrazioneStudente.valoriForm;
  if (!valoriForm) return;
  if (input.type === "checkbox") {
    valoriForm[input.name] = input.checked;
  } else {
    valoriForm[input.name] = input.value;
  }
}

function sanificaHtmlLocale(valore = "") {
  return String(valore)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function passoUnoPronto() {
  return (
    Boolean(stato.registrazioneStudente.classeSelezionata) &&
    Boolean(stato.registrazioneStudente.motivazioneSelezionata)
  );
}

function gestisciSelezioneClasse(pulsante, gruppo) {
  const valore = pulsante.getAttribute("data-class");
  stato.registrazioneStudente.classeSelezionata = valore;
  stato.livelloScolastico = "medie";
  aggiornaStatoGruppoPulsanti(gruppo, pulsante);
}

function gestisciSelezioneSituazione(pulsante, gruppo) {
  const valore = pulsante.getAttribute("data-situation");
  stato.registrazioneStudente.motivazioneSelezionata = valore;
  stato.profilo = valore === "bravo" ? "forte" : "difficolta";
  aggiornaStatoGruppoPulsanti(gruppo, pulsante);
}

function aggiornaStatoGruppoPulsanti(pulsanti, pulsanteAttivo) {
  pulsanti.forEach((pulsante) => {
    pulsante.classList.toggle("active", pulsante === pulsanteAttivo);
    pulsante.setAttribute("aria-pressed", pulsante === pulsanteAttivo ? "true" : "false");
  });
}

function configuraValidazioneModulo(modulo) {
  if (!modulo) return;

  const inputDataNascita = modulo.querySelector("#data-nascita");
  const helperEmailGenitore = modulo.querySelector("#email-genitore-helper");
  const inputEmailGenitore = modulo.querySelector("#email-genitore");

  if (inputDataNascita) {
    inputDataNascita.addEventListener("change", () => {
      const eta = calcolaEta(inputDataNascita.value);
      aggiornaStatoMinorenne(eta, inputEmailGenitore, helperEmailGenitore);
      aggiornaStatoModuloDaInput(inputDataNascita);
      validaModuloRegistrazione(modulo);
    });
  }

  modulo.addEventListener("input", (evento) => {
    if (evento.target.matches("input")) {
      aggiornaStatoModuloDaInput(evento.target);
      validaModuloRegistrazione(modulo);
    }

    if (evento.target.id === "data-nascita") {
      const eta = calcolaEta(evento.target.value);
      aggiornaStatoMinorenne(eta, inputEmailGenitore, helperEmailGenitore);
    }
  });

  modulo.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    salvaValoriModulo(modulo);
    if (!validaModuloRegistrazione(modulo)) {
      mostraAvvisoGlobale(
        "Completa tutti i campi obbligatori e risolvi gli errori evidenziati.",
        "error"
      );
      return;
    }

    const pulsanteInvio = modulo.querySelector(".btn-register");
    if (!pulsanteInvio) return;
    const etichettaPredefinita = pulsanteInvio.textContent;
    pulsanteInvio.textContent = "Registrazione...";
    pulsanteInvio.disabled = true;

    try {
      const payload = raccogliDatiRegistrazione(modulo);
      await gestisciRegistrazioneStudente(payload);
      mostraPassoTre();
    } catch (errore) {
      console.error("Errore registrazione studente", errore);
      mostraAvvisoGlobale(
        "Qualcosa è andato storto. Riprova fra qualche minuto.",
        "error"
      );
    } finally {
      pulsanteInvio.textContent = etichettaPredefinita;
      validaModuloRegistrazione(modulo);
    }
  });

  validaModuloRegistrazione(modulo);
}

function calcolaEta(valore) {
  if (!valore) return null;
  const oggi = new Date();
  const compleanno = new Date(valore);
  if (Number.isNaN(compleanno.getTime())) return null;
  let eta = oggi.getFullYear() - compleanno.getFullYear();
  const mese = oggi.getMonth() - compleanno.getMonth();
  if (mese < 0 || (mese === 0 && oggi.getDate() < compleanno.getDate())) {
    eta--;
  }
  return eta;
}

function aggiornaStatoMinorenne(eta, inputGenitore, helperGenitore) {
  if (!inputGenitore || !helperGenitore) return;
  if (eta === null) {
    stato.registrazioneStudente.eMinorenne = null;
    inputGenitore.disabled = false;
    inputGenitore.required = false;
    helperGenitore.textContent =
      "Inseriscila se hai meno di 18 anni: useremo questo contatto per confermare l'iscrizione.";
    return;
  }

  stato.registrazioneStudente.eMinorenne = eta < 18;

  if (stato.registrazioneStudente.eMinorenne) {
    inputGenitore.disabled = false;
    inputGenitore.required = true;
    helperGenitore.textContent = "Obbligatorio per studenti sotto i 18 anni.";
  } else {
    inputGenitore.value = "";
    inputGenitore.disabled = true;
    inputGenitore.required = false;
    helperGenitore.textContent =
      "Hai almeno 18 anni: non serve l'email del genitore.";
    aggiornaStatoModuloDaInput(inputGenitore);
  }
}

function validaModuloRegistrazione(modulo) {
  if (!modulo) return false;
  const pulsanteInvio = modulo.querySelector(".btn-register");
  if (!pulsanteInvio) return false;

  const idObbligatori = [
    "nome-utente",
    "data-nascita",
    "scuola",
    "email-studente",
    "password",
    "conferma-password",
  ];
  let valido = true;

  idObbligatori.forEach((id) => {
    const input = modulo.querySelector(`#${id}`);
    if (!input) return;
    if (!input.value.trim()) {
      valido = false;
    }
    if (input.type === "email" && input.value && !input.checkValidity()) {
      valido = false;
    }
  });

  if (stato.registrazioneStudente.eMinorenne === true) {
    const emailGenitore = modulo.querySelector("#email-genitore");
    if (
      !emailGenitore ||
      emailGenitore.disabled ||
      !emailGenitore.value.trim() ||
      !emailGenitore.checkValidity()
    ) {
      valido = false;
    }
  }

  const terminiSelezionati = modulo.querySelector("#termini-checkbox")?.checked;
  const privacySelezionata = modulo.querySelector("#privacy-checkbox")?.checked;
  if (!terminiSelezionati || !privacySelezionata) {
    valido = false;
  }

  const inputPassword = modulo.querySelector("#password");
  const inputConferma = modulo.querySelector("#conferma-password");
  const helperPassword = modulo.querySelector("#errore-conferma-password");
  if (
    inputPassword &&
    inputConferma &&
    inputPassword.value &&
    inputConferma.value &&
    inputPassword.value !== inputConferma.value
  ) {
    helperPassword?.classList.remove("hidden");
    valido = false;
  } else {
    helperPassword?.classList.add("hidden");
  }

  pulsanteInvio.disabled = !valido;
  return valido;
}

function raccogliDatiRegistrazione(modulo) {
  const datiModulo = new FormData(modulo);
  const payload = Object.fromEntries(datiModulo.entries());
  return {
    ...payload,
    classe: stato.registrazioneStudente.classeSelezionata,
    motivazione: stato.registrazioneStudente.motivazioneSelezionata,
    eMinorenne: stato.registrazioneStudente.eMinorenne,
    accettaTermini: modulo.querySelector("#termini-checkbox")?.checked || false,
    accettaPrivacy: modulo.querySelector("#privacy-checkbox")?.checked || false,
  };
}

function gestisciRegistrazioneStudente(datiModulo) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.info("Registrazione studente simulata", datiModulo);
      resolve({ status: "pending_guardian" });
    }, 1200);
  });
}

function mostraPassoTre() {
  renderizzaPasso3();
  ottieniContenutoSchedaRegistrazione()?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function configuraAzioniPostRegistrazione(contenitore) {
  if (!contenitore) return;
  contenitore.querySelectorAll(".btn-post-register").forEach((pulsante) => {
    pulsante.addEventListener("click", () => {
      const azione = pulsante.getAttribute("data-action");
      if (azione === "approve") {
        mostraAvvisoGlobale(
          "TODO: attiveremo presto la conferma completa via email.",
          "info"
        );
      } else if (azione === "limited") {
        mostraAvvisoGlobale(
          "Accesso limitato attivo. Ti portiamo nella dashboard prototipo.",
          "success"
        );
        navigaVersoVista("unit");
      }
    });
  });
}
