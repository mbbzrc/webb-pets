import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom";

export const Header = ({
  currentUser,
  setCurrentUser,
  setCart,
  setVisitorCart,
  handleSearch,
}) => {
  let history = useHistory();

  const [searchInput, setSearchInput] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput) {
      setSearchTerm("");
      handleSearch(null);
      setSearchInput(false);
      history.push("/products");
      return;
    }

    handleSearch(searchTerm);
    setSearchInput(true);
    history.push("/products");
  };
  const handleLogout = () => {
    localStorage.clear();
    setCart(null);
    setVisitorCart([]);
    setCurrentUser(null);
  };

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <nav>
      <h1>webb PETS</h1>
      <form id="search-bar">
        <input
          type="text"
          placeholder="search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          <span className="material-icons-outlined">
            {searchInput ? "delete" : "search"}
          </span>
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
