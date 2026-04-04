"use client";

import { createContext, useContext, useState, useEffect } from "react";

// This is like a "shared box" that any component can reach into
type CartItem = { name: string; price: number };

type CartContextType = {
  cart: CartItem[];
  addToCart: (name: string, price: number) => void;
  removeFromCart: (name: string) => void;
  cartTotal: number;
};

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  cartTotal: 0,
});

// This wraps your whole app so every page can access the cart
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load cart from localStorage after page renders
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      setCart(JSON.parse(saved));
    }
    setLoaded(true);
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, loaded]);

  function addToCart(name: string, price: number) {
    setCart([...cart, { name, price }]);
  }

  function removeFromCart(name: string) {
    const index = cart.findIndex((item) => item.name === name);
    if (index !== -1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    }
  }

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

// Any component can call useCart() to access the cart
export function useCart() {
  return useContext(CartContext);
}
