import { steps } from "./statoApplicazione.js";

export function renderizzaEsercizioDemo({ appEl, state, aggiornaVista }) {
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
    aggiornaVista();
  });

  document.getElementById("btn-next-step").addEventListener("click", () => {
    if (state.currentStep < steps.length - 1) {
      state.currentStep++;
      aggiornaVista();
    } else {
      state.currentView = "unit";
      state.currentStep = 0;
      aggiornaVista();
    }
  });
}
