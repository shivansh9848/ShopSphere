import { API_BASE_URL } from "../../config.js";

export function fetchLoggedInUser() {
  return new Promise(async (resolve) => {
    const response = await fetch(`${API_BASE_URL}user/account`);
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchLoggedInUserOrders() {
  return new Promise(async (resolve) => {
    const response = await fetch("/order/account");
    const data = await response.json();
    resolve({ data });
  });
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${API_BASE_URL}user/` + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
