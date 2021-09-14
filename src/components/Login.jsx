import React, { useState } from "react";

import { toast } from "react-toastify";

import { loginUser, getCartByUserId } from "../api";

export const Login = ({
  setCurrentUser,
  visitorCart,
  setVisitorCart,
  setCart,
  mergeCart,
}) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const checkCredentials = (username, password) => {
    if (!username || !password) {
      toast.error("Please supply a valid username and password!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = form;
    if (!checkCredentials(username, password)) return;
    try {
      const { user: loggedInUser } = await loginUser({ username, password });
      visitorCart.length > 0 && (await mergeCart(loggedInUser));
      const userCart = await getCartByUserId(loggedInUser.id);
      setCart(userCart);
      setVisitorCart([]);
      setCurrentUser(loggedInUser);
      toast.success("Sign in successful!");
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    }
  };

  return (
    <div id="login">
      <h2>Welcome back!</h2>
      <h2>Log in here.</h2>
      <form id="login-form">
        <label className="username">
          <span>username: </span>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleFormChange}
          />
        </label>
        <label className="password">
          <span>password: </span>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleFormChange}
          />
        </label>
        <input
          className="btn"
          type="submit"
          value="log in"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};
