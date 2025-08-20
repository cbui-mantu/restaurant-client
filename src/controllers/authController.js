import { loginService } from "../services/authService";
import { setCurrentUser, clearCurrentUser } from "../models/userModel";

export async function login(username, password) {
  const user = await loginService(username, password);
  setCurrentUser(user);
  return user;
}

export function logout() {
  clearCurrentUser();
}
