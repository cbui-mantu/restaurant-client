import {
  fetchRestaurants,
  fetchRestaurant,
  createRestaurant as createRestaurantService,
  updateRestaurant as updateRestaurantService,
  deleteRestaurant as deleteRestaurantService,
} from "../services/restaurantService";

export async function getRestaurants() {
  return fetchRestaurants();
}

export async function getRestaurantById(id) {
  return fetchRestaurant(id);
}

export async function createRestaurant(payload) {
  return createRestaurantService(payload);
}

export async function updateRestaurant(id, payload) {
  return updateRestaurantService(id, payload);
}

export async function deleteRestaurant(id) {
  return deleteRestaurantService(id);
}
