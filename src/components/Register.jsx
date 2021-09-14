import React, { useState } from "react";

import { toast } from "react-toastify";

import { registerUser, getCartByUserId } from "../api";

export const Register = ({
  setCurrentUser,
  visitorCart,
  setVisitorCart,
  setCart,
  mergeCart,
}) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkCredentials()) return;
    const { username, password, firstName, lastName, email, isAdmin } = form;
    try {
      const newUser = await registerUser({
        username,
        password,
        firstName,
        lastName,
        email,
        isAdmin,
      });
      if (visitorCart.length > 0) {
        await mergeCart(newUser);
        const userCart = await getCartByUserId(newUser.id);
        setCart(userCart);
        setVisitorCart([]);
        toast.success("Welcome to WEBB Pets! Your account has been created.", {
          autoClose: 5000,
        });
      }
      setCurrentUser(newUser);
    } catch (error) {
      toast.error(`${error.response.data.message}`);
    }
  };

  return (
    <div id="register">
      <h2>New customer?</h2>
      <h2>Create an account!</h2>
      <form id="register-form">
        <label className="reg-username">
          <span>username: </span>
          <input
            type="text"
            name="username"
            required
            value={form.username}
            onChange={handleFormChange}
          />
        </label>
        <label className="reg-password">
          <span>password: </span>
          <input
            type="password"
            name="password"
            required
            value={form.password}
            onChange={handleFormChange}
          />
        </label>
        <label className="reg-confirm">
          <span>retype password: </span>
          <input
            type="password"
            name="passwordCheck"
            required
            value={form.passwordCheck}
            onChange={handleFormChange}
          />
        </label>
        <label className="reg-first">
          <span>first name: </span>
          <input
            type="text"
            name="firstName"
            required
            value={form.firstName}
            onChange={handleFormChange}
          />
        </label>
        <label className="reg-last">
          <span>last name: </span>
          <input
            type="text"
            name="lastName"
            required
            value={form.lastName}
            onChange={handleFormChange}
          />
        </label>
        <label className="reg-email">
          <span>e-mail: </span>
          <input
            type="text"
            name="email"
            required
            value={form.email}
            onChange={handleFormChange}
          />
        </label>
      </form>
      <input
        className="btn"
        type="submit"
        value="join"
        onClick={handleSubmit}
      />
      {errorMessage ? <p className="error-message">{errorMessage}</p> : null}
    </div>
  );
};
