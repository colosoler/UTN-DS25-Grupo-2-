export function getToken() {
  return localStorage.getItem("token");
}
export function setToken(token) {
  localStorage.setItem("token", token);
}
export function clearToken() {
  localStorage.removeItem("token");
}

export function setUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function getUser() {
  const user = localStorage.getItem("user");
  // Evita parsear "undefined" o valores vacíos
  if (!user || user === "undefined") return null;
  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
}

export function clearUser() {
  localStorage.removeItem("user");
}

export function parseJWT (token) {
 try {
  const base64Url = token.split('.')[1];
  const base64 = base64Url .replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent ( atob(base64).split('').map(c =>
  '%' + ('00' + c.charCodeAt (0).toString (16)).slice(-2)). join(''));

   return JSON.parse(jsonPayload );
 } catch {
   return null;
 }
}

export function isTokenExpired() {
  const user = getUser();
  if (!user || !user.exp) return true;
  return user.exp * 1000 < Date.now();
}