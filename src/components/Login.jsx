import React, { useState } from "react";

import { loginUser, getCartByUserId } from "../api";

export const Login = ({ currentUser, setCurrentUser, cart, setCart }) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const checkCredentials = (username, password) => {
    if (!username || !password) {
      setErrorMessage("Please supply a valid username and password.");
      return false;
    }
    return true;
  };

  const mergeCart = async () => {
    if (!cart) return;
    const storedCart = await getCartByUserId(currentUser.id);
    const mergedCart = storedCart.concat(cart);
    setCart(mergedCart);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = form;
    if (!checkCredentials(username, password)) return;
    try {
      const { user: loggedInUser } = await loginUser({ username, password });
      setCurrentUser(loggedInUser);
      localStorage.setItem("currentUser", JSON.stringify(loggedInUser));
      await mergeCart();
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="login">
      <h2>Welcome back! Log in here.</h2>
      <form>
        <label>
          <span>username: </span>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleFormChange}
          />
        </label>
        <label>
          <span>password: </span>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleFormChange}
          />
        </label>
        <input type="submit" value="log in" onClick={handleSubmit} />
      </form>
      {errorMessage ? <p className="error-message">{errorMessage}</p> : null}
    </div>
  );
};
