import React from "react";

import { Link } from "react-router-dom";

export const Header = ({ currentUser }) => {
  return (
    <nav>
      <Link to="/products">Home</Link>
      {!currentUser ? (
        <>
          <Link to="/account/login">Log In</Link>
          <Link to="/account/register">Register</Link>
        </>
      ) : null}
    </nav>
  );
};
