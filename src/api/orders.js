import axios from "axios";

import { BASE_URL } from "./index";

export async function getOrder(orderId) {
  try {
    const { data } = await axios.get(`${BASE_URL}/orders/${orderId}`);
    // THIS ROUTE NEEDS TO BE CREATED
    return data;
  } catch (error) {
    throw error;
  }
}
