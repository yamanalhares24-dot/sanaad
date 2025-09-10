import { CartItem } from '../../core/entities/CartItem';

export class CartRepository {
  constructor(storageService) {
    this.storageService = storageService;
    this.CART_KEY = 'cartProducts';
  }

  getCartItems() {
    const data = this.storageService.getItem(this.CART_KEY);
    if (!data) return [];
    
    return data.map(item => new CartItem(item.product, item.quantity));
  }

  saveCartItems(cartItems) {
    const data = cartItems.map(item => ({
      product: item.product,
      quantity: item.quantity
    }));
    this.storageService.setItem(this.CART_KEY, data);
  }
}