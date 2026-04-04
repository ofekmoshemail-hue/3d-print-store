"use client";

import { useParams } from "next/navigation";
import { products } from "../../../data/products";
import { useCart } from "../../../components/CartProvider";
import { useState } from "react";
import Link from "next/link";

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  // If product not found, show error
  if (!product) {
    return (
      <section style={{ maxWidth: "960px", margin: "60px auto", padding: "0 20px", textAlign: "center" }}>
        <h2>Product not found</h2>
        <Link href="/products" style={{ color: "#e94560" }}>Back to products</Link>
      </section>
    );
  }

  function handleAddToCart() {
    addToCart(product.name, product.price);
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  }

  return (
    <section style={{ maxWidth: "960px", margin: "60px auto", padding: "0 20px" }}>
      <Link href="/products" style={{ color: "#e94560", textDecoration: "none", fontSize: "14px" }}>
        ← Back to products
      </Link>

      <div style={{ display: "flex", gap: "40px", marginTop: "30px", flexWrap: "wrap" }}>
        {/* Product image */}
        <div style={{
          background: "linear-gradient(135deg, #f0f0f0, #e8e8e8)",
          width: "400px",
          height: "400px",
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#aaa",
          fontSize: "18px",
        }}>
          {product.name}
        </div>

        {/* Product info */}
        <div style={{ flex: 1, minWidth: "250px" }}>
          <h1 style={{ fontSize: "32px", color: "#1a1a2e", marginBottom: "10px" }}>{product.name}</h1>
          <p style={{ color: "#e94560", fontSize: "28px", fontWeight: 700, margin: "10px 0 20px" }}>
            ${product.price.toFixed(2)}
          </p>
          <p style={{ fontSize: "16px", color: "#555", lineHeight: 1.8, marginBottom: "20px" }}>
            {product.details}
          </p>

          {/* Print specs */}
          <div style={{
            backgroundColor: "#f8f8f8",
            borderRadius: "12px",
            padding: "16px",
            marginBottom: "24px",
          }}>
            <h3 style={{ fontSize: "14px", color: "#1a1a2e", marginBottom: "8px" }}>Print Specs</h3>
            <p style={{ fontSize: "14px", color: "#666", margin: "4px 0" }}>Material: {product.material}</p>
            <p style={{ fontSize: "14px", color: "#666", margin: "4px 0" }}>Print Time: {product.printTime}</p>
          </div>

          <button
            onClick={handleAddToCart}
            style={{
              backgroundColor: added ? "#27ae60" : "#e94560",
              color: "white",
              border: "none",
              borderRadius: "50px",
              padding: "14px 32px",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
          >
            {added ? "Added to Cart!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </section>
  );
}
