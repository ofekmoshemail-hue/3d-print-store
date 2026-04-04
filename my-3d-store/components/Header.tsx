"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "./CartProvider";

export default function Header() {
  const [cartOpen, setCartOpen] = useState(false);
  const { cart, removeFromCart, cartTotal } = useCart();

  return (
    <nav style={{
      backgroundColor: "#1a1a2e",
      color: "white",
      padding: "18px 40px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>
      <Link href="/" style={{ textDecoration: "none", color: "white" }}>
        <h1 style={{ margin: 0, fontSize: "22px", fontWeight: 700 }}>3D Print Studio</h1>
      </Link>

      <ul style={{ listStyle: "none", display: "flex", gap: "30px", margin: 0, padding: 0, alignItems: "center" }}>
        <li><Link href="/products" style={linkStyle}>Products</Link></li>
        <li><Link href="/custom-order" style={linkStyle}>Custom Order</Link></li>
        <li><Link href="/#about" style={linkStyle}>About</Link></li>
        <li style={{ position: "relative" }}>
          <Link
            href="/cart"
            style={{ ...linkStyle, color: "#e94560", fontWeight: 600 }}
            onMouseEnter={() => setCartOpen(true)}
            onMouseLeave={() => setCartOpen(false)}
          >
            Cart ({cart.length}) - ${cartTotal.toFixed(2)}
          </Link>

          {/* Cart dropdown preview */}
          {cartOpen && (
            <div
              onMouseEnter={() => setCartOpen(true)}
              onMouseLeave={() => setCartOpen(false)}
              style={{
                position: "absolute",
                top: "40px",
                right: 0,
                backgroundColor: "white",
                color: "#1a1a2e",
                borderRadius: "12px",
                boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
                padding: "20px",
                width: "280px",
                zIndex: 200,
              }}
            >
              <h3 style={{ margin: "0 0 12px", fontSize: "16px", fontWeight: 700 }}>Your Cart</h3>

              {cart.length === 0 ? (
                <p style={{ color: "#999", fontSize: "14px", textAlign: "center" }}>Your cart is empty</p>
              ) : (
                cart.map((item, i) => (
                  <div key={i} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 0",
                    borderBottom: "1px solid #eee",
                    fontSize: "14px",
                  }}>
                    <span style={{ fontWeight: 500 }}>{item.name}</span>
                    <span style={{ color: "#888" }}>${item.price.toFixed(2)}</span>
                    <button
                      onClick={() => removeFromCart(item.name)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#e94560",
                        fontSize: "18px",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      &times;
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

const linkStyle = {
  color: "rgba(255,255,255,0.7)",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: 500,
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
};
