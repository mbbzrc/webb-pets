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

  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput) {
      setSearchTerm("");
      handleSearch(null);
      setSearchInput(false);
      history.push("/products");
    } else {
      handleSearch(searchTerm);
      setSearchInput(true);
      history.push("/products");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setCart(null);
    setVisitorCart([]);
    setCurrentUser(null);
  };

  return (
    <nav>
      <div id="nav-top">
        <h1>webb PETS</h1>
        <form id="search-bar" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div id="search-ball" onClick={handleSubmit}></div>
        </form>
      </div>
      <div id="nav-bottom">
        <Link to="/">
          <div className="nav-item">
            <span className="nav-text">Home</span>
            <span className="material-icons">home</span>
          </div>
        </Link>
        <Link to="/products">
          <div className="nav-item">
            <span className="nav-text">Shop</span>
            <span className="material-icons nav-icon">storefront</span>
          </div>
        </Link>
        <Link to="/cart">
          <div className="nav-item">
            <span className="nav-text">Cart</span>
            <span className="material-icons">shopping_cart</span>
          </div>
        </Link>
        {!currentUser ? (
          <>
            <Link to="/account/register">
              <div className="nav-item">
                <span className="nav-text">Register</span>
                <span className="material-icons nav-icon">key</span>
              </div>
            </Link>
            <Link to="/account/login">
              <div className="nav-item">
                <span className="nav-text">Log In</span>
                <span className="material-icons nav-icon">login</span>
              </div>
            </Link>
          </>
        ) : (
          <>
            <div className="nav-item">
              <Link to="/account">
                <span className="nav-text">Account</span>
                <span className="material-icons nav-icon">person</span>
              </Link>
            </div>
            <div className="nav-item">
              <Link to="/account/login" onClick={handleLogout}>
                <span className="nav-text">Log Out</span>
                <span className="material-icons" nav-icon>
                  logout
                </span>
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};
