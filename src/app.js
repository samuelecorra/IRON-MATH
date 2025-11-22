// app.js

const appEl = document.getElementById("app");

const state = {
  schoolLevel: null, // 'medie' | 'liceo'
  profile: null, // 'forte' | 'difficolta'
  currentView: "home", // 'home' | 'unit' | 'exercise'
  currentStep: 0,
};

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
  appEl.innerHTML = `
    <section class="im-card">
      <p class="im-tagline">Prototype 0.0</p>
      <h1 class="im-title">Benvenuto in IronMath</h1>
      <p class="im-subtitle">
        Questo è un embrione. Non è ancora una piattaforma, ma ti fa
        intravedere cosa diventerà: prerequisiti ferrei, percorso guidato,
        tutor che ti dice la verità su dove sei davvero.
      </p>

      <div class="im-row" style="margin-top: 10px;">
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

      <div style="margin-top: 18px; display:flex; justify-content:flex-end; gap:10px;">
        <button class="im-button secondary" id="fake-student">
          Guarda una demo
        </button>
        <button class="im-button" id="start-btn">
          Inizia il percorso
        </button>
      </div>
    </section>
  `;

  // attach listeners
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
    // set some defaults and go
    state.schoolLevel = "liceo";
    state.profile = "difficolta";
    state.currentView = "unit";
    render();
  });

  syncChoiceUI();
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
    alert("Seleziona sia il tipo di scuola che come ti senti in matematica.");
    return;
  }
  state.currentView = "unit";
  render();
}

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
      // fine demo → torni all'unità
      state.currentView = "unit";
      state.currentStep = 0;
      render();
    }
  });
}

// Inizializzazione
render();
