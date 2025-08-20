import { currentUser } from "../models/userModel";

const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://localhost:7180";

function authHeader() {
  const token = currentUser.value?.token || currentUser.value?.Token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function httpGet(path, options = {}) {
  const res = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: { ...(options.headers || {}), ...authHeader() },
  });
  return res;
}

export async function httpJson(method, path, body, options = {}) {
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      ...authHeader(),
    },
    ...options,
  });
  return res;
}

export async function httpDelete(path, options = {}) {
  const res = await fetch(`${baseUrl}${path}`, {
    method: "DELETE",
    headers: { ...(options.headers || {}), ...authHeader() },
    ...options,
  });
  return res;
}
