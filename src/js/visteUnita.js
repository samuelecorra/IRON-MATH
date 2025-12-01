// Componenti che gestiscono la demo "unità" e l'esercizio guidato.
import { elementoApp } from "./riferimentiDom.js";
import { stato, passaggiEsercizio } from "./statoApplicazione.js";
import { navigaVersoVista } from "./visteRouter.js";

export function renderizzaUnitaPrototipo() {
  const etichettaLivello = stato.livelloScolastico === "medie" ? "Scuole medie" : "Liceo";
  const etichettaProfilo =
    stato.profilo === "forte"
      ? "Profilo: curioso/forte"
      : "Profilo: in difficoltà";

  elementoApp.innerHTML = `
    <section class="im-card">
      <p class="im-tagline">${etichettaLivello}</p>
      <h2 class="im-title">Unità prototipo: Equazioni di primo grado</h2>
      <p class="im-subtitle">
        Prima di farti studiare, IronMath controlla se hai davvero le basi.
        Se non superi il test preliminare, ti blocchiamo sull'argomento successivo:
        non è cattiveria, è protezione.
      </p>

      <div class="im-chip-group">
        <span class="im-chip">${etichettaProfilo}</span>
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
          <button class="im-button secondary" id="torna-home">Indietro</button>
          <button class="im-button" id="avvia-test" style="margin-left:8px;">
            Avvia test preliminare
          </button>
        </div>
      </div>
    </section>
  `;

  document.getElementById("torna-home").addEventListener("click", () => {
    navigaVersoVista("home");
  });

  document.getElementById("avvia-test").addEventListener("click", () => {
    stato.passoCorrente = 0;
    navigaVersoVista("exercise");
  });
}

export function renderizzaEsercizioPrototipo() {
  const passaggioCorrente = passaggiEsercizio[stato.passoCorrente];

  elementoApp.innerHTML = `
    <section class="im-card">
      <p class="im-tagline">Esercizio guidato – Demo</p>
      <h2 class="im-title">Equazione da frase a formula</h2>
      <p class="im-subtitle">
        Questo non è ancora un vero test IronMath. È solo un assaggio del modo
        in cui ti guideremo: uno step alla volta, senza saltare i passaggi.
      </p>

      <div class="step-container">
        <div class="step-title">${passaggioCorrente.title}</div>
        <div class="step-body" style="white-space: pre-line;">
${passaggioCorrente.body}
        </div>
        <div class="step-footer">
          <button class="im-button secondary" id="btn-indietro-unita">Indietro</button>
          <button class="im-button" id="btn-prossimo-passo">
            ${stato.passoCorrente < passaggiEsercizio.length - 1 ? "Avanti" : "Fine demo"}
          </button>
        </div>
      </div>
    </section>
  `;

  document.getElementById("btn-indietro-unita").addEventListener("click", () => {
    navigaVersoVista("unit");
  });

  document.getElementById("btn-prossimo-passo").addEventListener("click", () => {
    if (stato.passoCorrente < passaggiEsercizio.length - 1) {
      stato.passoCorrente++;
      navigaVersoVista("exercise");
    } else {
      stato.passoCorrente = 0;
      navigaVersoVista("unit");
    }
  });
}
