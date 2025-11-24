export function renderizzaHome({ appEl, state, mostraAlert, aggiornaVista }) {
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
            ${creaTileScelta(
              state,
              "school",
              "medie",
              "Scuole medie",
              "11–14 anni, basi solide per scegliere il liceo."
            )}
            ${creaTileScelta(
              state,
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
            ${creaTileScelta(
              state,
              "profile",
              "forte",
              "Curioso/forte",
              "Vai bene ma vuoi ordine, metodo e risparmiare tempo."
            )}
            ${creaTileScelta(
              state,
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
    .addEventListener("click", (event) => gestisciClickScuola(event, state));
  document
    .getElementById("profile-group")
    .addEventListener("click", (event) => gestisciClickProfilo(event, state));
  document.getElementById("start-btn").addEventListener("click", () => {
    if (!state.schoolLevel || !state.profile) {
      mostraAlert(
        "Seleziona sia il tipo di scuola che come ti senti in matematica.",
        "error"
      );
      return;
    }
    state.currentView = "unit";
    aggiornaVista();
  });
  document.getElementById("fake-student").addEventListener("click", () => {
    state.schoolLevel = "liceo";
    state.profile = "difficolta";
    state.currentView = "unit";
    aggiornaVista();
  });

  sincronizzaTiles(state);
}

function creaTileScelta(state, gruppo, valore, titolo, descrizione) {
  const selezionato =
    (gruppo === "school" && state.schoolLevel === valore) ||
    (gruppo === "profile" && state.profile === valore);

  const classes = ["choice-tile", selezionato ? "selected" : ""].join(" ");

  return `
    <div class="${classes}" data-group="${gruppo}" data-value="${valore}">
      <div class="choice-title">${titolo}</div>
      <div class="choice-desc">${descrizione}</div>
    </div>
  `;
}

function sincronizzaTiles(state) {
  document.querySelectorAll(".choice-tile").forEach((tile) => {
    const group = tile.getAttribute("data-group");
    const value = tile.getAttribute("data-value");
    let selected = false;
    if (group === "school") selected = state.schoolLevel === value;
    if (group === "profile") selected = state.profile === value;
    tile.classList.toggle("selected", selected);
  });
}

function gestisciClickScuola(event, state) {
  const tile = event.target.closest(".choice-tile");
  if (!tile) return;
  state.schoolLevel = tile.getAttribute("data-value");
  sincronizzaTiles(state);
}

function gestisciClickProfilo(event, state) {
  const tile = event.target.closest(".choice-tile");
  if (!tile) return;
  state.profile = tile.getAttribute("data-value");
  sincronizzaTiles(state);
}
