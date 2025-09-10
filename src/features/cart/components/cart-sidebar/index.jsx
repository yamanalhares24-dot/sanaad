import React from 'react';
import './style.css';

function CartSidebar({ isOpen, onClose, cartProducts, setCartProducts }) {
  const updateQuantity = (productId, change) => {
    setCartProducts(prev => 
      prev.map(item => {
        if (item.product.id === productId) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      }).filter(Boolean)
    );
  };

  const removeItem = (productId) => {
    setCartProducts(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    if (window.confirm("Are you sure you want to clear the entire cart?")) {
      setCartProducts([]);
    }
  };

  const total = cartProducts.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <div id="cart-sidebar" className={`cart-sidebar ${isOpen ? 'open' : ''}`} style={{ 
      position: 'fixed',
      top: '0',
      right: isOpen ? '0' : '-400px',
      width: '350px',
      height: '100vh',
      transition: 'right 0.3s ease',
      zIndex: 1000,
      padding: '0',
      overflowY: 'auto'
    }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', marginBottom: '20px', paddingBottom: '15px', borderBottom: '2px solid #f0f0f0' }}>
        <h2 style={{ color: '#000', margin: '0', fontSize: '1.4rem', fontWeight: '600' }}>My Cart</h2>
        <span onClick={onClose} style={{ cursor: 'pointer', fontSize: '28px', color: '#000', fontWeight: 'bold', lineHeight: '1' }}>&times;</span>
      </header>
      
      <div id="cart-items">
        {cartProducts.map(({ product, quantity }) => (
          <div key={product.id} className="cart-item">
            <img src={product.img} alt={product.title} />
            <div className="cart-item-info" style={{ display: 'inline-block', verticalAlign: 'top' }}>
              <h4>{product.title}</h4>
              <p>{product.shortDesc}</p>
              <p>Price: ${product.price}</p>
              <p>Subtotal: ${product.price * quantity}</p>
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(product.id, -1)}>-</button>
                <span className="quantity">{quantity}</span>
                <button onClick={() => updateQuantity(product.id, 1)}>+</button>
              </div>
              <button onClick={() => removeItem(product.id)} style={{ marginTop: '5px', padding: '4px 8px', background: '#555', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '3px' }}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div id="cart-total">Total: ${total}</div>
      <button id="clear-cart" onClick={clearCart}>Clear Cart</button>
    </div>
  );
}

export default CartSidebar;