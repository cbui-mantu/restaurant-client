<script setup>
import { reactive, watchEffect } from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      name: "",
      description: "",
      category: "",
      hasDelivery: false,
      contactEmail: "",
      contactNumber: "",
      address: { city: "", street: "", postalCode: "" },
    }),
  },
  submitting: { type: Boolean, default: false },
  submitText: { type: String, default: "Save" },
});

const emit = defineEmits(["update:modelValue", "submit"]);

const form = reactive(JSON.parse(JSON.stringify(props.modelValue)));

watchEffect(() => {
  emit("update:modelValue", form);
});

function onSubmit(e) {
  e.preventDefault();
  emit("submit", form);
}
</script>

<template>
  <form @submit="onSubmit" style="max-width: 640px">
    <div style="margin-bottom: 8px">
      <label>Name</label><br />
      <input v-model="form.name" type="text" required />
    </div>

    <div style="margin-bottom: 8px">
      <label>Description</label><br />
      <textarea v-model="form.description" rows="3"></textarea>
    </div>

    <div style="margin-bottom: 8px">
      <label>Category</label><br />
      <input v-model="form.category" type="text" />
    </div>

    <div style="margin-bottom: 8px">
      <label>
        <input v-model="form.hasDelivery" type="checkbox" />
        Has Delivery
      </label>
    </div>

    <div style="margin-bottom: 8px">
      <label>Contact Email</label><br />
      <input v-model="form.contactEmail" type="email" />
    </div>

    <div style="margin-bottom: 8px">
      <label>Contact Number</label><br />
      <input v-model="form.contactNumber" type="text" />
    </div>

    <fieldset style="margin-bottom: 12px">
      <legend>Address</legend>
      <div style="margin-bottom: 8px">
        <label>City</label><br />
        <input v-model="form.address.city" type="text" />
      </div>
      <div style="margin-bottom: 8px">
        <label>Street</label><br />
        <input v-model="form.address.street" type="text" />
      </div>
      <div style="margin-bottom: 8px">
        <label>Postal Code</label><br />
        <input v-model="form.address.postalCode" type="text" />
      </div>
    </fieldset>

    <button :disabled="submitting" type="submit">
      {{ submitting ? "Saving..." : submitText }}
    </button>
  </form>
</template>
