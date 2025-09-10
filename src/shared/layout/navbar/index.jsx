import React, { useState } from "react";
import "./style.css";

function Navbar({ cartCount, onCartClick, isDarkMode, onToggleDarkMode, onSearch }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  console.log('Navbar onSearch:', typeof onSearch);

  return (
    <header className="container">
      <div className="header-top">
        <div className="header-left">
          <div className="logo" style={{ color: isDarkMode ? "#fff" : "#333" }}>
            <span style={{ fontSize: "24px", fontWeight: "bold" }}>Salinaka</span>
          </div>
          <button className="burger-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <i className="fa-solid fa-bars"></i>
          </button>
          <nav className="nav-links-inline">
            <ul>
              <li><a href="#" className="active">Home</a></li>
              <li><a href="#">Shop</a></li>
              <li><a href="#">Featured</a></li>
              <li><a href="#">Recommended</a></li>
            </ul>
          </nav>
        </div>

        <div className="search-box">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Search product..."
            onChange={(e) => {
              console.log('Input changed:', e.target.value);
              if (onSearch) {
                onSearch(e.target.value);
              } else {
                console.log('onSearch is undefined!');
              }
            }}
          />
        </div>

        <div className="header-right">
          <div className="cart-icon-container" onClick={onCartClick}>
            <i
              className="fas fa-shopping-cart"
              style={{ color: isDarkMode ? "#fff" : "#333", fontSize: "20px" }}
            ></i>
            <span id="cart-count">{cartCount}</span>
          </div>
          <div id="toggle-mode" onClick={onToggleDarkMode}>
            <div className="circle"></div>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <nav className={`mobile-nav ${isMenuOpen ? "show" : ""}`}>
        <ul>
          <li><a href="#" className="active">Home</a></li>
          <li><a href="#">Shop</a></li>
          <li><a href="#">Featured</a></li>
          <li><a href="#">Recommended</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;