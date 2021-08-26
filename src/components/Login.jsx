import React, { useState } from "react";

import { loginUser } from "../api";

export const Login = ({ setCurrentUser }) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentUser = await loginUser(form);
    setCurrentUser(currentUser);
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
    </div>
  );
};
