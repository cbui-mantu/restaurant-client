import { ref, computed } from "vue";

function readStoredAuth() {
  try {
    const raw = localStorage.getItem("auth");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export const currentUser = ref(readStoredAuth());

export const isAuthenticated = computed(
  () => !!currentUser.value?.token || !!currentUser.value?.Token
);
export const isAdmin = computed(
  () => (currentUser.value?.role || currentUser.value?.Role) === "Admin"
);

export function setCurrentUser(user) {
  currentUser.value = user;
  localStorage.setItem("auth", JSON.stringify(user));
}

export function clearCurrentUser() {
  currentUser.value = null;
  localStorage.removeItem("auth");
}
