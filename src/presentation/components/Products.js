import React from 'react';

function Products({ products, onAddToCart, onProductClick }) {
  return (
    <section className="recommended-section container">
      <h2>Recommended Featured</h2>
      <div id="products">
        {products.map(product => (
          <div key={product.id} className="card">
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
            <button onClick={() => onAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Products;