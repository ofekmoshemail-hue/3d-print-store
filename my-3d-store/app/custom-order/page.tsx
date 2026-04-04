"use client";

import { useState } from "react";

export default function CustomOrderPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
    material: "PLA",
    color: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // For now, just show success (later you'd send this to a database)
    console.log("Custom order:", formData);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section style={{ maxWidth: "600px", margin: "60px auto", padding: "0 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "28px", color: "#27ae60", marginBottom: "16px" }}>Request Submitted!</h2>
        <p style={{ fontSize: "16px", color: "#555" }}>
          Thanks {formData.name}! We'll email you a quote at {formData.email} within 24 hours.
        </p>
      </section>
    );
  }

  return (
    <section style={{ maxWidth: "600px", margin: "60px auto", padding: "0 20px" }}>
      <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#1a1a2e", marginBottom: "10px" }}>
        Request a Custom Print
      </h2>
      <p style={{ fontSize: "16px", color: "#555", marginBottom: "30px" }}>
        Have an idea? Describe what you want and we'll give you a quote!
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <label style={labelStyle}>Your Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Describe your project</label>
          <textarea
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            style={{ ...inputStyle, resize: "vertical" }}
            placeholder="Tell us what you'd like printed..."
          />
        </div>

        <div>
          <label style={labelStyle}>Preferred Material</label>
          <select
            value={formData.material}
            onChange={(e) => setFormData({ ...formData, material: e.target.value })}
            style={inputStyle}
          >
            <option value="PLA">PLA (Standard)</option>
            <option value="PETG">PETG (Durable)</option>
            <option value="ABS">ABS (Heat Resistant)</option>
            <option value="TPU">TPU (Flexible)</option>
          </select>
        </div>

        <div>
          <label style={labelStyle}>Color Preference</label>
          <input
            type="text"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            style={inputStyle}
            placeholder="e.g., Black, White, Red..."
          />
        </div>

        <button type="submit" style={{
          backgroundColor: "#e94560",
          color: "white",
          border: "none",
          borderRadius: "50px",
          padding: "14px 32px",
          fontSize: "15px",
          fontWeight: 600,
          cursor: "pointer",
          marginTop: "10px",
        }}>
          Submit Request
        </button>
      </form>
    </section>
  );
}

const labelStyle = {
  display: "block",
  fontSize: "14px",
  fontWeight: 600,
  color: "#1a1a2e",
  marginBottom: "6px",
};

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  border: "2px solid #eee",
  borderRadius: "12px",
  fontSize: "15px",
  outline: "none",
  fontFamily: "inherit",
};
