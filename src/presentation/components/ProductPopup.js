import React from 'react';

function ProductPopup({ product, onClose, onAddToCart }) {
  const handleAddToCart = () => {
    onAddToCart(product);
    onClose();
  };

  return (
    <div className="popup" style={{ display: 'flex' }} onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <span className="popup-close" onClick={onClose}>&times;</span>
        <div className="popup-body">
          <img src={product.img} alt={product.title} />
          <div className="popup-info">
            <h2>{product.title}</h2>
            <p>{product.shortDesc}</p>
            <p>Price: ${product.price}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPopup;