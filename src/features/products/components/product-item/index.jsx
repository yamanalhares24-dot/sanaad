import React from 'react';
import './style.css';

function ProductItem({ product, onAddToCart, onProductClick }) {
  return (
    <div className="card">
      <img 
        src={product.img} 
        alt={product.title}
        onClick={() => onProductClick(product)}
      />
      <div className="card-body">
        <h3>{product.title}</h3>
        <p>{product.shortDesc}</p>
        <p>Price: ${product.price}</p>
      </div>
      <button onClick={() => onAddToCart(product.id)}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductItem;