"use client";

import { useState } from "react";
import ProductCard from "../../components/ProductCard";
import { products } from "../../data/products";

export default function ProductsPage() {
  const [searchText, setSearchText] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <section style={{ maxWidth: "960px", margin: "60px auto", padding: "0 20px" }}>
      <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#1a1a2e", marginBottom: "30px" }}>
        All Products
      </h2>

      <input
        type="text"
        placeholder="Search products..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "12px 20px",
          border: "2px solid #eee",
          borderRadius: "50px",
          fontSize: "15px",
          marginBottom: "30px",
          outline: "none",
        }}
      />

      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            description={product.description}
          />
        ))}
      </div>
    </section>
  );
}
