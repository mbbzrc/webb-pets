import React, { useState } from "react";

import { loginUser } from "../api";

export const Login = ({ setCurrentUser }) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const checkCredentials = (username, password) => {
    if (!username || !password) {
      setErrorMessage("Please supply a valid username and password.");
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = form;
    checkCredentials(username, password);
    const { user: currentUser } = await loginUser({ username, password });
    setCurrentUser(currentUser);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
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
