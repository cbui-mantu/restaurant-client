<script setup>
import { ref } from "vue";
import RestaurantForm from "../components/RestaurantForm.vue";
import { createRestaurant } from "../api";
import { useRouter } from "vue-router";

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
    <RestaurantForm
      v-model="model"
      :submitting="submitting"
      submitText="Create"
      @submit="onSubmit"
    />
  </div>
</template>
