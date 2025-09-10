import React from 'react';
import './style.css';

function LayoutContainer({ children }) {
  return (
    <div className="layout-container">
      {children}
    </div>
  );
}

export default LayoutContainer;