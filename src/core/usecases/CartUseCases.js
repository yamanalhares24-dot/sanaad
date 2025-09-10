import { CartItem } from '../entities/CartItem';

export class CartUseCases {
  constructor(cartRepository) {
    this.cartRepository = cartRepository;
  }

  addToCart(product) {
    const cartItems = this.cartRepository.getCartItems();
    const existingItem = cartItems.find(item => item.product.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push(new CartItem(product));
    }
    
    this.cartRepository.saveCartItems(cartItems);
    return cartItems;
  }

  removeFromCart(productId) {
    const cartItems = this.cartRepository.getCartItems();
    const updatedItems = cartItems.filter(item => item.product.id !== productId);
    this.cartRepository.saveCartItems(updatedItems);
    return updatedItems;
  }

  updateQuantity(productId, quantity) {
    const cartItems = this.cartRepository.getCartItems();
    const item = cartItems.find(item => item.product.id === productId);
    
    if (item) {
      if (quantity <= 0) {
        return this.removeFromCart(productId);
      }
      item.quantity = quantity;
      this.cartRepository.saveCartItems(cartItems);
    }
    
    return cartItems;
  }

  clearCart() {
    this.cartRepository.saveCartItems([]);
    return [];
  }

  getCartItems() {
    return this.cartRepository.getCartItems();
  }

  getTotalCount() {
    return this.cartRepository.getCartItems().reduce((sum, item) => sum + item.quantity, 0);
  }

  getTotalPrice() {
    return this.cartRepository.getCartItems().reduce((sum, item) => sum + item.getTotalPrice(), 0);
  }
}