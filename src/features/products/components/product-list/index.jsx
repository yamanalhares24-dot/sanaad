import React from 'react';
import ProductItem from '../product-item';
import './style.css';

function ProductList({ products, onAddToCart, onProductClick }) {
  return (
    <div className="product-list">
      {products.map(product => (
        <ProductItem
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onProductClick={onProductClick}
        />
      ))}
    </div>
  );
}

export default ProductList;