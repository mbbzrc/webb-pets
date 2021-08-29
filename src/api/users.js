import axios from "axios";

import { BASE_URL } from "./index";

export function getUserToken() {
  return localStorage.getItem("token");
}

// pending API route!
export async function registerUser({ username, password }) {
  try {
    const { data } = await axios.post(`${BASE_URL}/users/register`, {
      username: username,
      password: password,
    });
    localStorage.setItem(JSON.stringify("token", data.token));
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
    localStorage.setItem(JSON.stringify("token", data.token));
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getUser() {
  try {
    const { data } = await axios.get(`${BASE_URL}/users/me`, {
      headers: {
        Authorization: "Bearer " + getUserToken(),
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}