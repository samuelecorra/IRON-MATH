export function validaEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

export function normalizzaTelefono(phone) {
  if (!phone) return "+39";
  const digits = phone.replace(/[^0-9]/g, "");
  const withoutPrefix = digits.startsWith("39") ? digits.slice(2) : digits;
  return `+39${withoutPrefix}`;
}

export function validaTelefono(phone) {
  if (!phone.startsWith("+39")) return false;
  const digits = phone.replace("+39", "");
  return /^\d{6,12}$/.test(digits);
}

export function sanificaHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
