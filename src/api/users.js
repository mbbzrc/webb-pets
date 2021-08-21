import axios from "axios";

import { BASE_URL } from "./index";

export async function registerUser({ username, password }) {
  try {
    const { data } = await axios.post(`${BASE_URL}/users/register`, {
      username: username,
      password: password,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function loginUser({ username, password }) {
  try {
    const { data } = await axios.post(`${BASE_URL}/users/login`, {
      username: username,
      password: password,
    });
    return data;
  } catch (error) {
    throw error;
  }
}
