<script setup>
import { currentUser, isAdmin, clearCurrentUser } from "./models/userModel";
import { useRouter } from "vue-router";

const router = useRouter();

function onLogout() {
  clearCurrentUser();
  router.replace({ name: "login" });
}
</script>

<template>
  <div class="app-container">
    <!-- <div class="center-container"> -->
    <nav class="nav-bar">
      <router-link to="/" class="nav-link">Restaurants</router-link>
      <template v-if="currentUser">
        <router-link v-if="isAdmin" to="/new" class="nav-link"
          >Create</router-link
        >
        <span class="user-info">
          {{ currentUser.username || currentUser.Username }} ({{
            currentUser.role || currentUser.Role
          }})
          <button class="logout-btn" @click="onLogout">Logout</button>
        </span>
      </template>
      <template v-else>
        <span class="user-info">
          <router-link to="/login" class="nav-link">Login</router-link>
        </span>
      </template>
    </nav>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style>
.center-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.app-container {
  font-family: "Segoe UI", "Roboto", "Arial", sans-serif;
  background: #f8f9fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.nav-bar {
  display: flex;
  align-items: center;
  padding: 16px 24px;
  background: #42b883;
  color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  margin-bottom: 24px;
  border-radius: 8px;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  margin-right: 16px;
  font-weight: 500;
  transition: color 0.2s;
}
.nav-link:hover {
  color: #35495e;
}

.user-info {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
}

.logout-btn {
  background: #35495e;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 4px 12px;
  cursor: pointer;
  font-size: 0.95em;
  transition: background 0.2s;
}
.logout-btn:hover {
  background: #2c3e50;
}

.main-content {
  flex: 1;
  width: 100%;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  /* display: flex; */
  justify-content: center;
  align-items: center;
}

.main-content > * {
  width: 100%;
  max-width: 400px;
}

input,
select,
textarea {
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 16px;
  border: 1px solid #dbeafe;
  border-radius: 6px;
  background: #f6faff;
  font-size: 1em;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #42b883;
  outline: none;
  box-shadow: 0 0 0 2px #42b88322;
}

button,
input[type="submit"] {
  background: #49d58a 100%;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 1em;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(66, 185, 131, 0.08);
  transition: background 0.2s, box-shadow 0.2s;
}

button:hover,
input[type="submit"]:hover {
  background: linear-gradient(90deg, #38a169 60%, #42b883 100%);
  box-shadow: 0 4px 16px rgba(66, 185, 131, 0.12);
}
</style>
