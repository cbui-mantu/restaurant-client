<script setup>
import { onMounted, reactive, ref } from "vue";
import { getRestaurant, updateRestaurant } from "../api";
import { useRoute, useRouter } from "vue-router";
import RestaurantForm from "../components/RestaurantForm.vue";

const route = useRoute();
const router = useRouter();
const id = Number(route.params.id);
const loading = ref(true);
const submitting = ref(false);
const model = reactive({
  name: "",
  description: "",
  category: "",
  hasDelivery: false,
  contactEmail: "",
  contactNumber: "",
  address: { city: "", street: "", postalCode: "" },
});

onMounted(async () => {
  loading.value = true;
  const data = await getRestaurant(id);
  if (!data) {
    alert("Not found");
    router.replace({ name: "list" });
    return;
  }
  Object.assign(model, {
    name: data.name,
    description: data.description,
    category: data.category,
    hasDelivery: data.hasDelivery,
    contactEmail: data.contactEmail || "",
    contactNumber: data.contactNumber || "",
    address: {
      city: data.address?.city || "",
      street: data.address?.street || "",
      postalCode: data.address?.postalCode || "",
    },
  });
  loading.value = false;
});

async function onSubmit(payload) {
  submitting.value = true;
  try {
    await updateRestaurant(id, payload);
    router.push({ name: "list" });
  } catch (e) {
    alert(e?.message || "Failed to update");
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <div>
    <h2>Edit Restaurant</h2>
    <div v-if="loading">Loading...</div>
    <RestaurantForm
      v-else
      v-model="model"
      :submitting="submitting"
      submitText="Update"
      @submit="onSubmit"
    />
  </div>
</template>
