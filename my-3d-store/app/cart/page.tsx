"use client";

import { useCart } from "../../components/CartProvider";

export default function CartPage() {
  const { cart, removeFromCart, cartTotal } = useCart();

  return (
    <section style={{ maxWidth: "960px", margin: "60px auto", padding: "0 20px" }}>
      <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#1a1a2e", marginBottom: "30px" }}>
        Your Cart
      </h2>

      {cart.length === 0 ? (
        <p style={{ fontSize: "16px", color: "#999" }}>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item, i) => (
            <div key={i} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px 20px",
              backgroundColor: "white",
              borderRadius: "12px",
              marginBottom: "12px",
              border: "1px solid #eee",
            }}>
              <span style={{ fontWeight: 600, fontSize: "16px" }}>{item.name}</span>
              <span style={{ color: "#888", fontSize: "16px" }}>${item.price.toFixed(2)}</span>
              <button
                onClick={() => removeFromCart(item.name)}
                style={{
                  backgroundColor: "#e94560",
                  color: "white",
                  border: "none",
                  borderRadius: "50px",
                  padding: "8px 20px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px",
            marginTop: "20px",
            borderTop: "2px solid #1a1a2e",
          }}>
            <span style={{ fontSize: "20px", fontWeight: 700 }}>Total:</span>
            <span style={{ fontSize: "20px", fontWeight: 700, color: "#e94560" }}>
              ${cartTotal.toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
