import { API_BASE_URL } from "../../config.js";

export function createOrder(orders) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${API_BASE_URL}order`, {
      method: "POST",
      credentials: "include", // added credentials
      body: JSON.stringify(orders),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${API_BASE_URL}order/` + order.id, {
      method: "PATCH",
      credentials: "include", // added credentials
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllOrders(sort, pagination) {
  let queryString = "";

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(`${API_BASE_URL}order?` + queryString, {
      credentials: "include", // added credentials
    });
    const data = await response.json();
    const totalOrders = response.headers.get("X-Total-Count");
    resolve({ data: { orders: data, totalOrders: +totalOrders } });
  });
}
