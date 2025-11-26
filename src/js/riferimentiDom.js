// Centralizza i riferimenti agli elementi DOM principali.
export const appElement = document.getElementById("app");
if (!appElement) {
  console.error("Elemento #app non trovato nel DOM.");
}
