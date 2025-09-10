import { useState, useEffect } from 'react';

export const useCart = () => {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cartProducts')) || [];
    setCartProducts(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  }, [cartProducts]);

  const addToCart = (product) => {
    setCartProducts(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  return { cartProducts, setCartProducts, addToCart };
};