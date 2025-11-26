// Componenti che gestiscono la demo "unità" e l'esercizio guidato.
import { appElement } from "./riferimentiDom.js";
import { state, steps } from "./statoApplicazione.js";
import { navigateTo } from "./visteRouter.js";

export function renderUnitPrototype() {
  const labelLevel = state.schoolLevel === "medie" ? "Scuole medie" : "Liceo";
  const labelProfile =
    state.profile === "forte"
      ? "Profilo: curioso/forte"
      : "Profilo: in difficoltà";

  appElement.innerHTML = `
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
    navigateTo("home");
  });

  document.getElementById("start-test").addEventListener("click", () => {
    state.currentStep = 0;
    navigateTo("exercise");
  });
}

export function renderExercisePrototype() {
  const step = steps[state.currentStep];

  appElement.innerHTML = `
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
    navigateTo("unit");
  });

  document.getElementById("btn-next-step").addEventListener("click", () => {
    if (state.currentStep < steps.length - 1) {
      state.currentStep++;
      navigateTo("exercise");
    } else {
      state.currentStep = 0;
      navigateTo("unit");
    }
  });
}
