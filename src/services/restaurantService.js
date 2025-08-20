import { httpGet, httpJson, httpDelete } from "./httpService";

export async function fetchRestaurants() {
  const res = await httpGet("/api/Restaurants");
  if (!res.ok) throw new Error("Failed to load restaurants");
  return res.json();
}

export async function fetchRestaurant(id) {
  const res = await httpGet(`/api/Restaurants/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to load restaurant");
  return res.json();
}

export async function createRestaurant(payload) {
  const res = await httpJson("POST", "/api/Restaurants", payload);
  if (!res.ok) throw new Error("Failed to create restaurant");
}

export async function updateRestaurant(id, payload) {
  const res = await httpJson("PUT", `/api/Restaurants/${id}`, payload);
  if (res.status === 404) throw new Error("Restaurant not found");
  if (!res.ok) throw new Error("Failed to update restaurant");
}

export async function deleteRestaurant(id) {
  const res = await httpDelete(`/api/Restaurants/${id}`);
  if (res.status === 404) throw new Error("Restaurant not found");
  if (!res.ok) throw new Error("Failed to delete restaurant");
}
