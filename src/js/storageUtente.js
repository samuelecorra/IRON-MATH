// Helper legati a localStorage/sessionStorage per utenti e login.
import { CHIAVI_STORAGE } from "./statoApplicazione.js";

export function ottieniUtenti() {
  const datiGrezzi = localStorage.getItem(CHIAVI_STORAGE.USERS);
  if (!datiGrezzi) return [];
  try {
    const convertiti = JSON.parse(datiGrezzi);
    return Array.isArray(convertiti) ? convertiti : [];
  } catch (errore) {
    console.error("Errore parse utenti", errore);
    return [];
  }
}

export function salvaUtenti(elencoUtenti) {
  localStorage.setItem(CHIAVI_STORAGE.USERS, JSON.stringify(elencoUtenti));
}

export function trovaUtentePerUsernameOEmail(identificativo) {
  if (!identificativo) return null;
  const identificativoPulito = identificativo.trim().toLowerCase();
  return (
    ottieniUtenti().find(
      (utente) =>
        utente.username.toLowerCase() === identificativoPulito ||
        utente.email.toLowerCase() === identificativoPulito
    ) || null
  );
}

export function impostaUtenteCorrente(idUtente) {
  if (idUtente) {
    localStorage.setItem(CHIAVI_STORAGE.CURRENT_USER, String(idUtente));
  } else {
    localStorage.removeItem(CHIAVI_STORAGE.CURRENT_USER);
  }
}

export function ottieniUtenteCorrente() {
  const idUtente = localStorage.getItem(CHIAVI_STORAGE.CURRENT_USER);
  if (!idUtente) return null;
  const utente = ottieniUtenti().find((u) => String(u.id) === String(idUtente));
  if (!utente) {
    impostaUtenteCorrente(null);
  }
  return utente || null;
}

export function disconnettiUtenteCorrente() {
  impostaUtenteCorrente(null);
}

export function impostaRicordami(flag, credenziali) {
  sessionStorage.setItem(CHIAVI_STORAGE.REMEMBER_ME, flag ? "true" : "false");
  if (flag && credenziali) {
    sessionStorage.setItem(
      CHIAVI_STORAGE.REMEMBERED_LOGIN,
      JSON.stringify(credenziali)
    );
  } else {
    sessionStorage.removeItem(CHIAVI_STORAGE.REMEMBERED_LOGIN);
  }
}

export function ottieniPreferenzaRicordami() {
  return sessionStorage.getItem(CHIAVI_STORAGE.REMEMBER_ME) === "true";
}

export function ottieniCredenzialiMemorizzate() {
  const datiGrezzi = sessionStorage.getItem(CHIAVI_STORAGE.REMEMBERED_LOGIN);
  if (!datiGrezzi) return null;
  try {
    return JSON.parse(datiGrezzi);
  } catch (errore) {
    console.error("Errore parse remember me", errore);
    return null;
  }
}
