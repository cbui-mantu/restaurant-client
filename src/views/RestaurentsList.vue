<script setup>
import { onMounted, ref } from "vue";
import {
  getRestaurants,
  deleteRestaurant,
} from "../controllers/restaurantController";
import { useRouter } from "vue-router";
import { isAdmin } from "../models/userModel";

const router = useRouter();
const loading = ref(true);
const error = ref("");
const items = ref([]);

async function load() {
  loading.value = true;
  error.value = "";
  try {
    items.value = await getRestaurants();
  } catch (e) {
    error.value = e?.message || "Failed to load";
  } finally {
    loading.value = false;
  }
}

async function onDelete(id) {
  if (!confirm("Delete this restaurant?")) return;
  try {
    await deleteRestaurant(id);
    await load();
  } catch (e) {
    alert(e?.message || "Failed to delete");
  }
}

onMounted(load);
</script>

<template>
  <div>
    <h2>Restaurants</h2>

    <p v-if="isAdmin">
      <router-link to="/new" class="create-link">+ Create</router-link>
    </p>

    <div v-if="loading">Loading...</div>
    <div v-else-if="error" style="color: red">{{ error }}</div>
    <table v-else class="restaurant-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Category</th>
          <th>Has Delivery</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Address</th>
          <th style="width: 160px">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in items" :key="r.id">
          <td>{{ r.id }}</td>
          <td>{{ r.name }}</td>
          <td>{{ r.category }}</td>
          <td>{{ r.hasDelivery ? "Yes" : "No" }}</td>
          <td>{{ r.contactEmail || "-" }}</td>
          <td>{{ r.contactNumber || "-" }}</td>
          <td>
            <span v-if="r.address">
              {{ r.address.street || "" }} {{ r.address.city || "" }}
              {{ r.address.postalCode || "" }}
            </span>
            <span v-else>-</span>
          </td>
          <td>
            <template v-if="isAdmin">
              <div class="action-group">
                <button
                  class="action-btn edit"
                  @click="router.push({ name: 'edit', params: { id: r.id } })"
                >
                  Edit
                </button>
                <button class="action-btn delete" @click="onDelete(r.id)">
                  Delete
                </button>
              </div>
            </template>
            <span v-else>-</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.restaurant-table {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  border-collapse: collapse;
  background: #fff;
  box-shadow: 0 2px 8px rgba(66, 185, 131, 0.06);
  border-radius: 8px;
  overflow: hidden;
}

.restaurant-table th,
.restaurant-table td {
  padding: 10px 12px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.restaurant-table th {
  background: #f6faff;
  font-weight: 600;
  color: #35495e;
}

.restaurant-table tr:last-child td {
  border-bottom: none;
}

.create-link {
  display: inline-block;
  background: #42b883;
  color: #fff;
  padding: 6px 16px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.2s;
}
.create-link:hover {
  background: #38a169;
}

.action-group {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 6px 16px;
  border: none;
  border-radius: 6px;
  font-size: 0.95em;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 1px 4px rgba(66, 185, 131, 0.08);
}

.action-btn.edit {
  background: #42b883;
  color: #fff;
}
.action-btn.edit:hover {
  background: #38a169;
}

.action-btn.delete {
  background: #e53e3e;
  color: #fff;
}
.action-btn.delete:hover {
  background: #c53030;
}
</style>
