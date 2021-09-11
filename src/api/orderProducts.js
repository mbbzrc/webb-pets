import axios from "axios";

import { BASE_URL, createAuthHeader } from "./index";

export async function addProductToOrder(orderId, productId, price, quantity) {
  try {
    const { data } = axios.post(
      `${BASE_URL}/api/order-products/order/${orderId}`,
      {
        productId: productId,
        price: price,
        quantity: quantity,
      },
      createAuthHeader()
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateOrderProduct(orderProductId, price, quantity) {
  console.log("PRICE: ", price);
  try {
    const { data } = axios.patch(
      `${BASE_URL}/api/order-products/${orderProductId}`,
      {
        price: price,
        quantity: quantity,
      },
      createAuthHeader()
    );
    await console.log("DATA RETURNED: ", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function removeOrderProduct(orderProductId) {
  try {
    const { data } = await axios.delete(
      `${BASE_URL}/api/order-products/${orderProductId}`,
      createAuthHeader()
    );
    return data;
  } catch (error) {
    throw error;
  }
}
