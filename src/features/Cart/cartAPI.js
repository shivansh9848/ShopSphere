import { API_BASE_URL } from "../../config.js";

export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${API_BASE_URL}cart`, {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchItemsByUserId() {
  return new Promise(async (resolve) => {
    const response = await fetch(`${API_BASE_URL}cart`);
    const data = await response.json();
    resolve({ data });
  });
}

export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${API_BASE_URL}cart/` + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function deleteItemfromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${API_BASE_URL}cart/` + itemId, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    console.log("deleteItemfromCart", data);
    resolve({ data: { id: itemId } });
  });
}

export function resetCart() {
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserId();
    const items = response.data;
    const deletePromises = items.map((item) => deleteItemfromCart(item.id));
    await Promise.all(deletePromises);
    resolve({ status: "success" });
  });
}
