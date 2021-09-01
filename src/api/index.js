export let BASE_URL;

if (process.env.NODE_ENV === "production") {
  BASE_URL = "https://still-tundra-77189.herokuapp.com";
} else {
  BASE_URL = "http://localhost:5000";
}

export * from "./orders";
export * from "./products";
export * from "./users";
