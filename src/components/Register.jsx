import React, { useState } from "react";

import { registerUser } from "../api/users";

export const Register = ({ setCurrentUser }) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    passwordCheck: "",
  });

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, passwordCheck } = form;
    if (password !== passwordCheck) {
      // ERROR MESSAGE
      return;
    }
    try {
      const currentUser = await registerUser({username, password});
      setCurrentUser(currentUser);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="register">
      <h2>New customer? Create an account!</h2>
      <form>
        <label>
          <span>username: </span>
          <input type="text" onChange={handleFormChange} />
        </label>
        <label>
          <span>password: </span>
          <input type="password" onChange={handleFormChange} />
        </label>
        <input type="submit" value="join" onClick={handleSubmit} />
      </form>
    </div>
  );
};
