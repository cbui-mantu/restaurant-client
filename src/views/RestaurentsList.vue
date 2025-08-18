<script setup>
import { onMounted, ref } from "vue";
import { listRestaurants, deleteRestaurant } from "../api";
import { useRouter } from "vue-router";

const router = useRouter();
const loading = ref(true);
const error = ref("");
const items = ref([]);

async function load() {
  loading.value = true;
  error.value = "";
  try {
    items.value = await listRestaurants();
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

    <p>
      <router-link to="/new">+ Create</router-link>
    </p>

    <div v-if="loading">Loading...</div>
    <div v-else-if="error" style="color: red">{{ error }}</div>
    <table v-else border="1" cellpadding="6" cellspacing="0">
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
            <button
              @click="router.push({ name: 'edit', params: { id: r.id } })"
            >
              Edit
            </button>
            <button style="margin-left: 8px" @click="onDelete(r.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
