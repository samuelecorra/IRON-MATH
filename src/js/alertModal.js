// Gestione centralizzata di alert globali e modali custom.
let modaleAttiva = null;

export function mostraAvvisoGlobale(messaggio, tipo = "info") {
  let contenitore = document.getElementById("contenitore-avviso-globale");
  if (!contenitore) {
    contenitore = document.createElement("div");
    contenitore.id = "contenitore-avviso-globale";
    contenitore.className = "contenitore-avviso-globale";
    document.body.prepend(contenitore);
  }
  contenitore.innerHTML = `
    <div class="avviso-globale avviso-globale-${tipo}">
      <span>${messaggio}</span>
      <button type="button" aria-label="Chiudi avviso">&times;</button>
    </div>
  `;
  const pulsanteChiusura = contenitore.querySelector("button");
  pulsanteChiusura.addEventListener("click", () => {
    contenitore.remove();
  });
}

export function mostraModale({
  title,
  message = "",
  contentHTML = "",
  confirmText = "Conferma",
  cancelText = "Annulla",
  onConfirm,
  onCancel,
}) {
  chiudiModale();
  const sovrapposizione = document.createElement("div");
  sovrapposizione.className = "im-strato-modale";
  sovrapposizione.innerHTML = `
    <div class="im-card-modale">
      <h3 class="im-titolo-modale">${title}</h3>
      ${message ? `<p class="im-messaggio-modale">${message}</p>` : ""}
      ${contentHTML}
      <div class="im-azioni-modale">
        <button type="button" class="im-button secondary modale-annulla">${cancelText}</button>
        <button type="button" class="im-button modale-conferma">${confirmText}</button>
      </div>
    </div>
  `;
  document.body.appendChild(sovrapposizione);
  document.body.classList.add("blurred");
  modaleAttiva = sovrapposizione;

  sovrapposizione.addEventListener("click", (event) => {
    if (event.target === sovrapposizione) {
      if (onCancel) onCancel();
      chiudiModale();
    }
  });
  sovrapposizione.querySelector(".modale-annulla").addEventListener("click", () => {
    if (onCancel) onCancel();
    chiudiModale();
  });
  sovrapposizione.querySelector(".modale-conferma").addEventListener("click", () => {
    const deveChiudersi = onConfirm ? onConfirm() : true;
    if (deveChiudersi !== false) {
      chiudiModale();
    }
  });
}

export function chiudiModale() {
  if (modaleAttiva) {
    modaleAttiva.remove();
    modaleAttiva = null;
  }
  document.body.classList.remove("blurred");
}
