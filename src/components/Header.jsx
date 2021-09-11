import React from "react";

import { Link } from "react-router-dom";

export const Header = ({
  currentUser,
  setCurrentUser,
  setCart,
  setVisitorCart,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // BUILD OUT SEARCH SUBMIT FUNCTION
  };
  const handleLogout = () => {
    localStorage.clear();
    setCart(null);
    setVisitorCart([]);
    setCurrentUser(null);
  };

  return (
    <nav>
      <h1>webb PETS</h1>
      <form id="search-bar">
        <input type="text" placeholder="search..." />
        <button type="submit" onClick={handleSubmit}>
          <span className="material-icons-outlined">search</span>
        </button>
      </form>
      <Link to="/">Home</Link>
      <Link to="/products">Shop</Link>
      {!currentUser ? (
        <>
          <Link to="/account/login">Log In</Link>
          <Link to="/account/register">Register</Link>
        </>
      ) : (
        <>
          <Link to="/account">Account</Link>
          <Link to="/account/login" onClick={handleLogout}>
            Log Out
          </Link>
        </>
      )}
      <Link to="/cart">
        <span className="material-icons-outlined">shopping_cart</span>
      </Link>
    </nav>
  );
};
