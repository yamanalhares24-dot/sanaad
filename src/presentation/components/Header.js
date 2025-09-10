import React, { useState } from 'react';

function Header({ cartCount, onCartClick, isDarkMode, onToggleDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  return (
    <header>
      <div className="container">
        <div className="header-top">
          <div className="header-left">
            <div className="logo">
              <img src="assets/logo.png" alt="logo" />
            </div>
            <button className="burger-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
          
          <nav className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
            <ul>
              <li><a href="#" className="active">Home</a></li>
              <li><a href="#">Shop</a></li>
              <li><a href="#">Featured</a></li>
              <li><a href="#">Recommended</a></li>
            </ul>
          </nav>
          
          <div className="search-cart">
            <div className="search-box">
              <i className="fas fa-search search-icon"></i>
              <input 
                type="text" 
                placeholder="Search product..." 
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            
            <div className="cart-icon-container" onClick={onCartClick}>
              <i className="fas fa-shopping-cart"></i>
              <span id="cart-count">{cartCount}</span>
            </div>
            
            <div 
              id="toggle-mode" 
              onClick={onToggleDarkMode}
              style={{
                background: isDarkMode ? '#555' : '#ffc107',
                borderColor: isDarkMode ? '#777' : '#555'
              }}
            >
              <div 
                className="circle"
                style={{
                  transform: isDarkMode ? 'translateX(21px)' : 'translateX(0)',
                  background: isDarkMode ? '#e0e0e0' : '#fff'
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;