import { httpJson } from "./httpService";

export async function loginService(username, password) {
  const res = await httpJson("POST", "/api/Auth/login", { username, password });
  if (res.status === 401) throw new Error("Invalid credentials");
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}
