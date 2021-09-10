import axios from "axios";

import { BASE_URL } from "./index";

export function getUserToken() {
  return localStorage.getItem("token");
}

export function createAuthHeader() {
  if (getUserToken()) {
    return {
      headers: {
        Authorization: `Bearer ${getUserToken()}`,
      },
    };
  } else {
    console.error("Unable to create authorization header!");
  }
}

export async function registerUser({
  username,
  password,
  firstName,
  lastName,
  email,
  isAdmin,
}) {
  try {
    const { data } = await axios.post(`${BASE_URL}/api/users/register`, {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email,
      isAdmin: isAdmin,
    });
    localStorage.setItem("token", data.token);
    // IF STATUS 200, TOAST: 'THANK YOU FOR SIGNING UP'
    return data.user;
  } catch (error) {
    throw error;
  }
}

export async function loginUser({ username, password }) {
  try {
    const { data } = await axios.post(`${BASE_URL}/api/users/login`, {
      username: username,
      password: password,
    });
    localStorage.setItem("token", data.token);
    // IF STATUS 200, TOAST: 'WELCOME BACK'
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
