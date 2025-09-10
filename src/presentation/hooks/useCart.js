import { useState, useEffect } from 'react';
import { CartUseCases } from '../../core/usecases/CartUseCases';
import { CartRepository } from '../../infrastructure/repositories/CartRepository';
import { LocalStorageService } from '../../infrastructure/services/LocalStorageService';

const storageService = new LocalStorageService();
const cartRepository = new CartRepository(storageService);
const cartUseCases = new CartUseCases(cartRepository);

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(cartUseCases.getCartItems());
  }, []);

  const addToCart = (product) => {
    const updatedItems = cartUseCases.addToCart(product);
    setCartItems([...updatedItems]);
  };

  const removeFromCart = (productId) => {
    const updatedItems = cartUseCases.removeFromCart(productId);
    setCartItems([...updatedItems]);
  };

  const updateQuantity = (productId, quantity) => {
    const updatedItems = cartUseCases.updateQuantity(productId, quantity);
    setCartItems([...updatedItems]);
  };

  const clearCart = () => {
    const updatedItems = cartUseCases.clearCart();
    setCartItems([...updatedItems]);
  };

  const getTotalCount = () => cartUseCases.getTotalCount();
  const getTotalPrice = () => cartUseCases.getTotalPrice();

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalCount,
    getTotalPrice
  };
};