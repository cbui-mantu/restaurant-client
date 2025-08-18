const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://localhost:7180";
const jsonHeaders = { "Content-Type": "application/json" };

export async function listRestaurants() {
  const res = await fetch(`${baseUrl}/api/Restaurants`);
  if (!res.ok) throw new Error("Failed to load restaurants");
  return res.json();
}

export async function getRestaurant(id) {
  const res = await fetch(`${baseUrl}/api/Restaurants/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to load restaurant");
  return res.json();
}

export async function createRestaurant(payload) {
  const res = await fetch(`${baseUrl}/api/Restaurants`, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create restaurant");
  // CreatedAt returns location + no content. No need to parse body.
}

export async function updateRestaurant(id, payload) {
  const res = await fetch(`${baseUrl}/api/Restaurants/${id}`, {
    method: "PUT",
    headers: jsonHeaders,
    body: JSON.stringify(payload),
  });
  if (res.status === 404) throw new Error("Restaurant not found");
  if (!res.ok) throw new Error("Failed to update restaurant");
}

export async function deleteRestaurant(id) {
  const res = await fetch(`${baseUrl}/api/Restaurants/${id}`, {
    method: "DELETE",
  });
  if (res.status === 404) throw new Error("Restaurant not found");
  if (!res.ok) throw new Error("Failed to delete restaurant");
}
