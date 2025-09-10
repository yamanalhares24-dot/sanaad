import React from 'react';
import './style.css';

function SearchInput({ value, onChange, placeholder }) {
  return (
    <div className="search-input">
      <i className="fas fa-search search-icon"></i>
      <input 
        type="text" 
        placeholder={placeholder || "Search product..."} 
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default SearchInput;