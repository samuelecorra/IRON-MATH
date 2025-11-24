export function renderizzaUnitaDemo({ appEl, state, aggiornaVista }) {
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
    aggiornaVista();
  });

  document.getElementById("start-test").addEventListener("click", () => {
    state.currentStep = 0;
    state.currentView = "exercise";
    aggiornaVista();
  });
}
