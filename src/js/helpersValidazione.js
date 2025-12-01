// Piccoli helper riutilizzati in più viste per validare dati utente.
export function validaEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

export function normalizzaTelefono(telefono) {
  if (!telefono) return "+39";
  const cifre = telefono.replace(/[^0-9]/g, "");
  const senzaPrefisso = cifre.startsWith("39") ? cifre.slice(2) : cifre;
  return `+39${senzaPrefisso}`;
}

export function validaTelefono(telefono) {
  if (!telefono.startsWith("+39")) return false;
  const cifre = telefono.replace("+39", "");
  return /^\d{6,12}$/.test(cifre);
}

export function sanificaHtml(valore = "") {
  return String(valore)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
