import { STORAGE_KEYS } from "./statoApplicazione.js";

export function ottieniUtenti() {
  const raw = localStorage.getItem(STORAGE_KEYS.USERS);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Errore parse utenti", err);
    return [];
  }
}

export function salvaUtenti(utenti) {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(utenti));
}

export function trovaUtentePerIdentificativo(identifier) {
  if (!identifier) return null;
  const cleanIdentifier = identifier.trim().toLowerCase();
  return (
    ottieniUtenti().find(
      (user) =>
        user.username.toLowerCase() === cleanIdentifier ||
        user.email.toLowerCase() === cleanIdentifier
    ) || null
  );
}

export function impostaUtenteCorrente(userId) {
  if (userId) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, String(userId));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
}

export function ottieniUtenteCorrente() {
  const userId = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  if (!userId) return null;
  const user = ottieniUtenti().find((u) => String(u.id) === String(userId));
  if (!user) {
    impostaUtenteCorrente(null);
  }
  return user || null;
}

export function disconnettiUtenteCorrente() {
  impostaUtenteCorrente(null);
}

export function impostaRicordami(flag, credenziali) {
  sessionStorage.setItem(STORAGE_KEYS.REMEMBER_ME, flag ? "true" : "false");
  if (flag && credenziali) {
    sessionStorage.setItem(
      STORAGE_KEYS.REMEMBERED_LOGIN,
      JSON.stringify(credenziali)
    );
  } else {
    sessionStorage.removeItem(STORAGE_KEYS.REMEMBERED_LOGIN);
  }
}

export function leggiRicordami() {
  return sessionStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === "true";
}

export function leggiCredenzialiMemorizzate() {
  const raw = sessionStorage.getItem(STORAGE_KEYS.REMEMBERED_LOGIN);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error("Errore parse remember me", err);
    return null;
  }
}
