<script setup>
import { ref } from "vue";
import RestaurantForm from "../components/RestaurantForm.vue";
import { createRestaurant } from "../controllers/restaurantController";
import { useRouter } from "vue-router";
import { isAdmin } from "../models/userModel";

const router = useRouter();
const submitting = ref(false);
const model = ref();

async function onSubmit(payload) {
  submitting.value = true;
  try {
    await createRestaurant(payload);
    router.push({ name: "list" });
  } catch (e) {
    alert(e?.message || "Failed to create");
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <div>
    <h2>Create Restaurant</h2>
    <div v-if="!isAdmin" style="color: #b00; margin-bottom: 8px">
      You do not have permission to create restaurants.
    </div>
    <RestaurantForm
      v-model="model"
      :submitting="submitting"
      submitText="Create"
      @submit="onSubmit"
    />
  </div>
</template>
