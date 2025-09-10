import React, { useState, useEffect } from "react";
import Navbar from "./shared/layout/navbar";
import Hero from "./shared/layout/hero";
import ProductsSection from "./features/products/components/products-section";
import Footer from "./shared/layout/footer";
import CartSidebar from "./features/cart/components/cart-sidebar";
import ProductPopup from "./features/products/components/product-popup";
import { products as initialProducts } from "./db/products";

function App() {
  const [displayProducts, setDisplayProducts] = useState(initialProducts);
  const [cartCount, setCartCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);

  const handleSearch = (query) => {
    console.log('Searching for:', query);
    if (!query) {
      setDisplayProducts(initialProducts);
    } else {
      const filtered = initialProducts.filter((p) =>
        (p.title + " " + p.shortDesc).toLowerCase().includes(query.toLowerCase())
      );
      console.log('Found products:', filtered.length);
      setDisplayProducts(filtered);
    }
  };

  const handleCartClick = () => {
    setIsCartOpen(prev => !prev);
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    // Load saved data from localStorage
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedCartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
    
    setIsDarkMode(savedDarkMode);
    setCartProducts(savedCartProducts);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const totalCount = cartProducts.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalCount);
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  }, [cartProducts]);

  const handleAddToCart = (productId) => {
    const product = initialProducts.find(p => p.id === productId);
    if (!product) return;

    setCartProducts(prev => {
      const existing = prev.find(item => item.product.id === productId);
      if (existing) {
        return prev.map(item =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    
    setCartCount(prev => prev + 1);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="App">
      <Navbar
        cartCount={cartCount}
        onCartClick={handleCartClick}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onSearch={handleSearch}
      />
      <Hero />
      <ProductsSection
        products={displayProducts}
        onAddToCart={handleAddToCart}
        onProductClick={handleProductClick}
      />
      <Footer />
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartProducts={cartProducts}
        setCartProducts={setCartProducts}
      />
      {selectedProduct && (
        <ProductPopup 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}

export default App;