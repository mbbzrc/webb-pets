import axios from "axios";

import { BASE_URL } from "./index";

export async function getProductById(id) {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/products/${id}`);
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