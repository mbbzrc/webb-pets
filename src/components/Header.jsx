import React from "react";

import { Link } from "react-router-dom";

export const Header = ({ currentUser }) => {
  return (
    <nav>
      <Link to="/api/products">Home</Link>
      {!currentUser ? (
        <>
          <Link to="/api/account/login">Log In</Link>
          <Link to="/api/account/register">Register</Link>
        </>
      ) : null}
    </nav>
  );
};
