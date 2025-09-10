import React from "react";
import ProductItem from "../product-item";
import "./style.css";

function ProductsSection({ products, onAddToCart, onProductClick }) {
  console.log('ProductsSection received:', products.length, 'products');
  return (
    <section className="recommended-section container">
      <h2>Recommended Featured</h2>
      <div id="products">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onProductClick={onProductClick}
            />
          ))
        ) : (
          <div style={{ textAlign: "center", padding: "40px", fontSize: "18px", color: "#666" }}>
            No products found
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductsSection;