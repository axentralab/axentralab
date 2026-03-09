import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('ax_cart') || '[]'));

  useEffect(() => {
    localStorage.setItem('ax_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (service, plan) => {
    const existing = cart.find(i => i.serviceId === service._id && i.plan === plan.name);
    if (existing) return; // already in cart
    setCart(prev => [...prev, {
      serviceId:    service._id,
      serviceTitle: service.title,
      plan:         plan.name,
      price:        plan.price,
      billing:      plan.billing,
      quantity:     1,
    }]);
  };

  const removeFromCart = (serviceId, plan) => {
    setCart(prev => prev.filter(i => !(i.serviceId === serviceId && i.plan === plan)));
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = cart.length;

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
