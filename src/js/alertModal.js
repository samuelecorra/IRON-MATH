// Gestione centralizzata di alert globali e modali custom.
let activeModal = null;

export function showGlobalAlert(message, type = "info") {
  let container = document.getElementById("global-alert-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "global-alert-container";
    container.className = "global-alert-container";
    document.body.prepend(container);
  }
  container.innerHTML = `
    <div class="global-alert global-alert-${type}">
      <span>${message}</span>
      <button type="button" aria-label="Chiudi avviso">&times;</button>
    </div>
  `;
  const closeBtn = container.querySelector("button");
  closeBtn.addEventListener("click", () => {
    container.remove();
  });
}

export function showModal({
  title,
  message = "",
  contentHTML = "",
  confirmText = "Conferma",
  cancelText = "Annulla",
  onConfirm,
  onCancel,
}) {
  closeModal();
  const overlay = document.createElement("div");
  overlay.className = "im-modal-overlay";
  overlay.innerHTML = `
    <div class="im-modal-card">
      <h3 class="im-modal-title">${title}</h3>
      ${message ? `<p class="im-modal-message">${message}</p>` : ""}
      ${contentHTML}
      <div class="im-modal-actions">
        <button type="button" class="im-button secondary modal-cancel">${cancelText}</button>
        <button type="button" class="im-button modal-confirm">${confirmText}</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  document.body.classList.add("blurred");
  activeModal = overlay;

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      if (onCancel) onCancel();
      closeModal();
    }
  });
  overlay.querySelector(".modal-cancel").addEventListener("click", () => {
    if (onCancel) onCancel();
    closeModal();
  });
  overlay.querySelector(".modal-confirm").addEventListener("click", () => {
    const shouldClose = onConfirm ? onConfirm() : true;
    if (shouldClose !== false) {
      closeModal();
    }
  });
}

export function closeModal() {
  if (activeModal) {
    activeModal.remove();
    activeModal = null;
  }
  document.body.classList.remove("blurred");
}
