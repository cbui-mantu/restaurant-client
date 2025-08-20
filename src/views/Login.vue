<script setup>
import { ref } from "vue";
import { login } from "../controllers/authController";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);

async function onSubmit() {
  error.value = "";
  loading.value = true;
  try {
    await login(username.value, password.value);
    router.replace({ name: "list" });
  } catch (e) {
    error.value = e?.message || "Login failed";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div style="max-width: 360px; margin: 40px auto">
    <h2>Login</h2>
    <div v-if="error" style="color: red; margin: 8px 0">{{ error }}</div>
    <form @submit.prevent="onSubmit">
      <div style="margin-bottom: 8px">
        <label style="display: block; margin-bottom: 4px">Username</label>
        <input v-model="username" required />
      </div>
      <div style="margin-bottom: 12px">
        <label style="display: block; margin-bottom: 4px">Password</label>
        <input type="password" v-model="password" required />
      </div>
      <button :disabled="loading" type="submit">
        {{ loading ? "Signing in..." : "Login" }}
      </button>
    </form>
  </div>
</template>
