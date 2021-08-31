import axios from "axios";

import { BASE_URL } from "./index";

// export async function getOrder(orderId) {
//   try {
//     const { data } = await axios.get(`${BASE_URL}/api/orders/${orderId}`);
//     // THIS ROUTE NEEDS TO BE CREATED
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

export async function getCartByUserId(userId) {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/orders/${userId}/cart`);
    return data;
  } catch (error) {
    throw error;
  }
}
