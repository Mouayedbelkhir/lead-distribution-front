import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "token";
const USER_KEY = "user";

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setAuth(token, user) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearAuth() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function isTokenExpired(token) {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    if (!decoded.exp) return false;
    return Date.now() >= decoded.exp * 1000;
  } catch {
    return true;
  }
}

export function hydrateAuth() {
  if (typeof window === "undefined") return null;
  const token = getToken();
  if (!token || isTokenExpired(token)) {
    clearAuth();
    return null;
  }
  const user = getStoredUser();
  if (!user) {
    try {
      const decoded = jwtDecode(token);
      return {
        token,
        user: { id: decoded.userId, email: "", role: decoded.role },
      };
    } catch {
      clearAuth();
      return null;
    }
  }
  return { token, user };
}
