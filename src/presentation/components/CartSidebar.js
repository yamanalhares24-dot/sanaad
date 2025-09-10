import React from 'react';

function CartSidebar({ isOpen, onClose, cartItems, onRemoveFromCart, onUpdateQuantity, onClearCart, totalPrice }) {
  const updateQuantity = (productId, change) => {
    const item = cartItems.find(item => item.product.id === productId);
    if (item) {
      onUpdateQuantity(productId, item.quantity + change);
    }
  };

  const removeItem = (productId) => {
    onRemoveFromCart(productId);
  };

  const clearCart = () => {
    if (window.confirm("Are you sure you want to clear the entire cart?")) {
      onClearCart();
    }
  };

  return (
    <div id="cart-sidebar" className={isOpen ? 'open' : ''} style={{ right: isOpen ? '0' : '-350px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h2>My Cart</h2>
        <span onClick={onClose} style={{ cursor: 'pointer', fontSize: '20px' }}>&times;</span>
      </header>
      
      <div id="cart-items">
        {cartItems.map(({ product, quantity }) => (
          <div key={product.id} className="cart-item">
            <img src={product.img} alt={product.title} style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }} />
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
      
      <div id="cart-total">Total: ${totalPrice}</div>
      <button id="clear-cart" onClick={clearCart}>Clear Cart</button>
    </div>
  );
}

export default CartSidebar;