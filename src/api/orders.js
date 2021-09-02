import axios from "axios";

import { BASE_URL, createAuthHeader } from "./index";

export async function getOrder(orderId) {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/api/orders/${orderId}`,
      createAuthHeader()
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getCartByUserId(userId) {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/api/orders/${userId}/cart`,
      createAuthHeader()
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getOrdersByUserId(userId) {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/api/orders/${userId}/allorders`,
      createAuthHeader()
    );
    return data;
  } catch (error) {
    throw error;
  }
}
