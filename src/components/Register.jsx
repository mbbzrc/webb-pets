import React, { useState } from "react";

import { registerUser } from "../api";

export const Register = ({ setCurrentUser, cart }) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    passwordCheck: "",
    firstName: "",
    lastName: "",
    email: "",
    isAdmin: false,
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const checkCredentials = () => {
    const { username, password, passwordCheck, firstName, lastName, email } =
      form;
    if (!username || !password || !firstName || !lastName || !email) {
      setErrorMessage("Please complete all fields.");
      return false;
    }
    if (password !== passwordCheck) {
      setErrorMessage("Passwords do not match.");
      return false;
    }
    if (password.length < 8) {
      setErrorMessage("Password must be longer than 8 characters.");
      return false;
    }
    if (!email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const storeCart = () => {
    if (cart.length < 1) return;
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkCredentials()) return;
    const { username, password, firstName, lastName, email, isAdmin } = form;
    try {
      const currentUser = await registerUser({
        username,
        password,
        firstName,
        lastName,
        email,
        isAdmin,
      });
      setCurrentUser(currentUser);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      storeCart();
    } catch (error) {
      throw error;
    }
  };

  return (
    <div id="register">
      <h2>New customer? Create an account!</h2>
      <form>
        <label>
          <span>username: </span>
          <input
            type="text"
            name="username"
            required
            value={form.username}
            onChange={handleFormChange}
          />
        </label>
        <label>
          <span>password: </span>
          <input
            type="password"
            name="password"
            required
            value={form.password}
            onChange={handleFormChange}
          />
        </label>
        <label>
          <span>retype password: </span>
          <input
            type="password"
            name="passwordCheck"
            required
            value={form.passwordCheck}
            onChange={handleFormChange}
          />
        </label>
        <label>
          <span>first name: </span>
          <input
            type="text"
            name="firstName"
            required
            value={form.firstName}
            onChange={handleFormChange}
          />
        </label>
        <label>
          <span>last name: </span>
          <input
            type="text"
            name="lastName"
            required
            value={form.lastName}
            onChange={handleFormChange}
          />
        </label>
        <label>
          <span>e-mail: </span>
          <input
            type="text"
            name="email"
            required
            value={form.email}
            onChange={handleFormChange}
          />
        </label>
        <input type="submit" value="join" onClick={handleSubmit} />
      </form>
      {errorMessage ? <p className="error-message">{errorMessage}</p> : null}
    </div>
  );
};
