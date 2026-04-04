"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "./CartProvider";

export default function ProductCard({ id, name, price, description }: {
  id: string;
  name: string;
  price: number;
  description: string;
}) {
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault(); // Don't navigate when clicking the button
    addToCart(name, price);
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  }

  return (
    <Link href={`/products/${id}`} style={{ textDecoration: "none" }}>
      <div style={{
        backgroundColor: "white",
        borderRadius: "16px",
        padding: "24px",
        width: "270px",
        textAlign: "center",
        border: "1px solid #eee",
        transition: "all 0.3s",
        cursor: "pointer",
      }}>
        <div style={{
          background: "linear-gradient(135deg, #f0f0f0, #e8e8e8)",
          height: "180px",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#aaa",
          fontSize: "14px",
          marginBottom: "18px",
        }}>
          {name}
        </div>
        <h3 style={{ margin: "10px 0 4px", fontSize: "18px", fontWeight: 600, color: "#1a1a2e" }}>{name}</h3>
        <p style={{ fontSize: "13px", color: "#888", margin: "0 0 12px" }}>{description}</p>
        <p style={{ color: "#e94560", fontSize: "22px", fontWeight: 700, margin: "8px 0 16px" }}>
          ${price.toFixed(2)}
        </p>
        <button
          onClick={handleAddToCart}
          style={{
            backgroundColor: added ? "#27ae60" : "#e94560",
            color: "white",
            border: "none",
            borderRadius: "50px",
            padding: "10px 24px",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            width: "100%",
            transition: "background-color 0.3s",
          }}
        >
          {added ? "Added!" : "Add to Cart"}
        </button>
      </div>
    </Link>
  );
}
