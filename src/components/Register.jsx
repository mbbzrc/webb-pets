import React, { useState } from "react";

import { registerUser } from "../api";

export const Register = ({ setCurrentUser }) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    passwordCheck: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const checkCredentials = () => {
    const { username, password, passwordCheck } = form;
    if (!username || !password) {
      setErrorMessage("Please enter both a username and a password.");
      return;
    }
    if (password !== passwordCheck) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setErrorMessage("Password must be longer than 8 characters.");
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    checkCredentials();
    const { username, password } = form;
    try {
      const currentUser = await registerUser({ username, password });
      setCurrentUser(currentUser);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div id="register">
      <h2>New customer? Create an account!</h2>
      <form>
        <label>
          <span className="required">*</span>
          <span>username: </span>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleFormChange}
          />
        </label>
        <label>
          <span className="required">*</span>
          <span>password: </span>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleFormChange}
          />
        </label>
        <label>
          <span className="required">*</span>
          <span>retype password: </span>
          <input
            type="password"
            name="passwordCheck"
            value={form.passwordCheck}
            onChange={handleFormChange}
          />
        </label>
        <input type="submit" value="join" onClick={handleSubmit} />
      </form>
      {errorMessage ? <p className="error-message">{errorMessage}</p> : null}
    </div>
  );
};
