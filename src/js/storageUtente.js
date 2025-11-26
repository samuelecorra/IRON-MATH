// Helper legati a localStorage/sessionStorage per utenti e login.
import { STORAGE_KEYS } from "./statoApplicazione.js";

export function getUsers() {
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

export function saveUsers(users) {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

export function findUserByUsernameOrEmail(identifier) {
  if (!identifier) return null;
  const cleanIdentifier = identifier.trim().toLowerCase();
  return (
    getUsers().find(
      (user) =>
        user.username.toLowerCase() === cleanIdentifier ||
        user.email.toLowerCase() === cleanIdentifier
    ) || null
  );
}

export function setCurrentUser(userId) {
  if (userId) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, String(userId));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
}

export function getCurrentUser() {
  const userId = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  if (!userId) return null;
  const user = getUsers().find((u) => String(u.id) === String(userId));
  if (!user) {
    setCurrentUser(null);
  }
  return user || null;
}

export function logoutCurrentUser() {
  setCurrentUser(null);
}

export function setRememberMe(flag, credentials) {
  sessionStorage.setItem(STORAGE_KEYS.REMEMBER_ME, flag ? "true" : "false");
  if (flag && credentials) {
    sessionStorage.setItem(
      STORAGE_KEYS.REMEMBERED_LOGIN,
      JSON.stringify(credentials)
    );
  } else {
    sessionStorage.removeItem(STORAGE_KEYS.REMEMBERED_LOGIN);
  }
}

export function getRememberMe() {
  return sessionStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === "true";
}

export function getRememberedCredentials() {
  const raw = sessionStorage.getItem(STORAGE_KEYS.REMEMBERED_LOGIN);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error("Errore parse remember me", err);
    return null;
  }
}
