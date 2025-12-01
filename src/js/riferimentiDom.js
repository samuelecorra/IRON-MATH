// Centralizza i riferimenti agli elementi DOM principali.
export const elementoApp = document.getElementById("app");
if (!elementoApp) {
  console.error("Elemento #app non trovato nel DOM.");
}
