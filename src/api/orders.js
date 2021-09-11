import axios from "axios";

import { BASE_URL, createAuthHeader } from "./index";

export async function createOrder(userId) {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/api/orders`,
      { userId: userId },
      createAuthHeader()
    );
    return data;
  } catch (error) {
    throw error;
  }
}

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

export async function updateOrder(orderId, status, userId) {
  try {
    const { data } = await axios.patch(
      `${BASE_URL}/api/orders/${orderId}`,
      {
        id: orderId,
        status: status,
        userId: userId,
      },
      createAuthHeader()
    );

    return data;
  } catch (error) {
    throw error;
  }
}
