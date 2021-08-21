import axios from "axios";

export const BASE_URL = "http://localhost:3000";
// update once deployed

export async function getProductById(id) {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/product/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllProducts() {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/products`);
    return data;
  } catch (error) {
    throw error;
  }
}
